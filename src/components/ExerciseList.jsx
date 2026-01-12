import SetForm from "./SetForm";

export default function ExerciseList({ exercises, onAddSet, onRemoveSet }) {
  return (
    <div>
      {exercises.map((exercise, index) => (
        <div key={index} className="exercise">
          <h3>{exercise.name}</h3>

          {exercise.sets?.length > 0 && (
            <table className="sets-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Répétitions</th>
                  <th>Poids (kg)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {exercise.sets.map((set, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{set.reps}</td>
                    <td>{set.weight}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => onRemoveSet(index, i)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <SetForm onAdd={(set) => onAddSet(index, set)} />
        </div>
      ))}
    </div>
  );
}
