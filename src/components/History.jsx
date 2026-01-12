export default function History({ workouts, onSelect }) {
    return (
      <div className="history">
        {workouts.map((w, i) => (
          <button key={i} onClick={() => onSelect(w.date)}>
            {w.date}
          </button>
        ))}
      </div>
    );
  }
  