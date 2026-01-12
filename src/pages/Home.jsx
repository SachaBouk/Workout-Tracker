import { useState, useEffect } from "react";
import ExerciseForm from "../components/ExerciseForm";
import ExerciseList from "../components/ExerciseList";
import History from "../components/History";
import "../App.css";

export default function Home() {
  // ---------------- STATE ----------------
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState({
    date: new Date().toISOString().split("T")[0],
    exercises: []
  });

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const isTauri = typeof window !== "undefined" && window.__TAURI__;

  // ---------------- DARK MODE ----------------
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // ---------------- LOAD WORKOUTS ----------------
  useEffect(() => {
    const loadWorkouts = async () => {
      let stored = [];

      if (isTauri) {
        try {
          const { invoke } = await import("@tauri-apps/api");
          const data = await invoke("load_workout");
          if (data) stored = JSON.parse(data);
        } catch (err) {
          console.error("Tauri load error:", err);
        }
      } else {
        const data = localStorage.getItem("workouts");
        if (data) stored = JSON.parse(data);
      }

      setWorkouts(stored);

      const today = new Date().toISOString().split("T")[0];
      const todayWorkout =
        stored.find(w => w.date === today) || {
          date: today,
          exercises: []
        };

      setWorkout(todayWorkout);
    };

    loadWorkouts();
  }, []);

  // ---------------- SAVE WORKOUT ----------------
  useEffect(() => {
    if (!workout) return;

    setWorkouts(prev => {
      const updated = prev.some(w => w.date === workout.date)
        ? prev.map(w => (w.date === workout.date ? workout : w))
        : [...prev, workout];

      if (isTauri) {
        import("@tauri-apps/api").then(({ invoke }) => {
          invoke("save_workout", { data: JSON.stringify(updated) }).catch(console.error);
        });
      } else {
        localStorage.setItem("workouts", JSON.stringify(updated));
      }

      return updated;
    });
  }, [workout]);

  // ---------------- ACTIONS ----------------
  const addExercise = (name) => {
    if (!name.trim()) return;

    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name, sets: [] }]
    }));
  };

  const addSet = (exerciseIndex, newSet) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === exerciseIndex
          ? { ...exercise, sets: [...exercise.sets, newSet] }
          : exercise
      )
    }));
  };

  const removeSet = (exerciseIndex, setIndex) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.filter((_, idx) => idx !== setIndex)
            }
          : exercise
      )
    }));
  };

  const selectWorkout = (date) => {
    const selected = workouts.find(w => w.date === date);
    if (!selected) return;

    // copie profonde
    setWorkout({
      date: selected.date,
      exercises: selected.exercises.map(ex => ({
        name: ex.name,
        sets: [...ex.sets]
      }))
    });
  };

  const newWorkout = () => {
    const today = new Date().toISOString().split("T")[0];
    setWorkout({ date: today, exercises: [] });
  };

  // ---------------- RENDER ----------------
  return (
    <div className="container">
      <h1>Workout Tracker</h1>

      <button
        className="secondary"
        onClick={() => setDarkMode(!darkMode)}
        style={{ marginBottom: "10px" }}
      >
        {darkMode ? "☀️ Mode clair" : "🌙 Mode sombre"}
      </button>

      <History workouts={workouts} onSelect={selectWorkout} />

      <button className="new-workout secondary" onClick={newWorkout}>
        Nouvelle séance
      </button>

      <ExerciseForm onAdd={addExercise} />

      <ExerciseList
        exercises={workout.exercises}
        onAddSet={addSet}
        onRemoveSet={removeSet}
      />
    </div>
  );
}
