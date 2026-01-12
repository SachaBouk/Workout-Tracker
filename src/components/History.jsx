export default function History({ workouts, onSelect }) {
    return (
        <div className="history-container">
            <span className="history-label">Historique :</span>
            <div className="history">
                {workouts.map((w, i) => (
                    <button key={i} onClick={() => onSelect(w.date)}>
                        {w.date}
                    </button>
                ))}
            </div>
        </div>
    );
}
