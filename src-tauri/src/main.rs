#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;
use std::path::PathBuf;
use dirs::data_dir; // pour remplacer app_data_dir

#[tauri::command]
fn save_workout(data: String) -> Result<(), String> {
  let mut path: PathBuf = data_dir().ok_or("Impossible de trouver le dossier app data")?;
  path.push("workout_tracker.json");
  fs::write(path, data).map_err(|e| e.to_string())
}

#[tauri::command]
fn load_workout() -> Result<String, String> {
  let mut path: PathBuf = data_dir().ok_or("Impossible de trouver le dossier app data")?;
  path.push("workout_tracker.json");
  if path.exists() {
      fs::read_to_string(path).map_err(|e| e.to_string())
  } else {
      Ok("".into())
  }
}

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![save_workout, load_workout])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
