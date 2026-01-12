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
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
      <input
        type="number"
        placeholder="Répétitions"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        style={{ width: "130px" }}
      />
      <input
        type="number"
        placeholder="Poids"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={{ width: "110px" }}
      />
      <button type="submit">Ajouter un set</button>
    </form>
  );
}
