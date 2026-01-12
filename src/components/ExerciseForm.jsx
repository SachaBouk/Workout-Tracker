import { useState } from "react";

export default function ExerciseForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom de l'exercice"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "300px" }}
      />
      <button type="submit">Ajouter un nouvel exercice</button>
    </form>
  );
}
