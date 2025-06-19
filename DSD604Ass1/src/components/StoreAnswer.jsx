export default function StoreAnswer({ answers }) {
    const correctAnswers = answers.filter(a => a.isCorrect);
    const incorrectAnswers = answers.filter(a => !a.isCorrect);

    return (
        <div>
            <h2>Correct answers:</h2>
            <div>
                {correctAnswers.map((answer, idx) => (
                    <div className="answer-box" key={idx}>
                        <a
                            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(answer.maoriName)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            // Opens the wikipedia page for the place if it exists
                        ><b>{answer.maoriName}</b></a> means "{answer.englishName}"
                    </div>
                ))}
            </div>
            <h2>Incorrect answers:</h2>
            <div>
                {incorrectAnswers.map((answer, idx) => (
                    <div className="answer-box" key={idx}>
                        <b>{answer.maoriName}</b> does not mean "{answer.englishName}"
                    </div>
                ))}
            </div>
        </div>
    );
  }