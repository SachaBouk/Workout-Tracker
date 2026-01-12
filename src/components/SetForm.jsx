import { useState } from "react";

export default function SetForm({ onAdd }) {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reps || !weight) return;
    onAdd({ reps: Number(reps), weight: Number(weight) });
    setReps("");
    setWeight("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        style={{ width: "50px" }}
      />
      <input
        type="number"
        placeholder="Poids"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={{ width: "50px" }}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
