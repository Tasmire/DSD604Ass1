export default function StoreAnswer({ answers }) {
    const correctAnswers = answers.filter(a => a.isCorrect);
    const incorrectAnswers = answers.filter(a => !a.isCorrect);

    return (
        <div className="answer-lists-container">
            <div className="answer-list">
                <h2>Correct answers:</h2>
                <div>
                    {correctAnswers.length === 0 ? (
                        <div className="answer-box">No correct answers yet.</div>
                    ) : (
                        correctAnswers.map((answer, idx) => (
                            <div className="answer-box correct-box" key={idx}>
                                <a
                                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(answer.maoriName)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="answer-link"
                                ><b>{answer.maoriName}</b></a> means "{answer.englishName}"
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="answer-list">
                <h2>Incorrect answers:</h2>
                <div>
                    {incorrectAnswers.length === 0 ? (
                        <div className="answer-box">No incorrect answers yet.</div>
                    ) : (
                        incorrectAnswers.map((answer, idx) => (
                            <div className="answer-box incorrect-box" key={idx}>
                                <b>{answer.maoriName}</b> does not mean "{answer.englishName}"
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
  }