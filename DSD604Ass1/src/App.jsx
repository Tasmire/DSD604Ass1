import { React, useState } from 'react';
import './App.css';
import { maoriPlaceNamesData, sortedListAnswers } from './assets/maoriPlaceNames';
import { Random } from './utilities/Random';
import StoreAnswer from './components/StoreAnswer';

import Select from 'react-select';
import { selectCustomStyles } from './utilities/SelectReactSetting';

function App() {
  const allData = maoriPlaceNamesData;
  const getRandomIndex = Random(allData.length);
  const [gameData, setGameData] = useState({ Placename: "Start", Components: "Start", Meaning: "Start" });
  const answerData = sortedListAnswers();
  const [answer, setAnswer] = useState("");
  const [winlose, setWinLose] = useState("");
  const [answers, setAnswers] = useState([]);

  let answerLet;
  let gameDataLet = { Placename: "Start", Components: "Start", Meaning: "Start" };

  const onClickHandlerNewGame = () => {
    setAnswer("");
    setWinLose("");
    let rand = Random(allData.length);
    setGameData({ Placename: allData[rand].Placename, 
                  Components: allData[rand].Components, 
                  Meaning: allData[rand].Meaning
    });
    gameDataLet = { Placename: allData[rand].Placename,
                    Components: allData[rand].Components, 
                    Meaning: allData[rand].Meaning
    };
    console.log("rand", rand);
    console.log("gameDataLet Placename: ", gameDataLet.Placename + " Components: ", gameDataLet.Components + " Meaning: ", gameDataLet.Meaning);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.value);
    answerLet = e.value;
    const isCorrect = answerLet === gameData.Placename;
    setAnswers([
      ...answers,
      {
        englishName: gameData.Meaning,
        maoriName: e.value,
        isCorrect,
      }
    ]);
    setWinLose("- you " + winLoseCalc(answerLet));
    console.log("answer = ", answerLet + " gameplay = ", gameData.Placename + " gameDataLet.Placename = ", gameDataLet.Placename);
  };

  const winLoseCalc = (answerLet) => {
    if (answerLet !== undefined && answerLet !== null) {
      if (answerLet === gameData.Placename) {
        return "win";
      } else {
        return "lose";
      }
    }
    return "";
  };
  
  return (
    <div className="main-game container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-12">
          <div className="card shadow">
            <div className="card-body">
              <button
                className="btn btn-primary mb-4 w-100 display-4"
                onClick={onClickHandlerNewGame}
              >
                Generate a random place name
              </button>
              <div className="mb-4 text-center">
                <h2 className="display-4">{gameData.Meaning}</h2>
                <h4 className="fs-3 mt-3">
                  {answer ? "You selected " + answer + winlose : ""}
                </h4>
              </div>
              <div>
                <Select
                  styles={selectCustomStyles}
                  options={answerData}
                  className="selectDropDownStyle"
                  value={answerData.find((opt) => opt.value === answer) || null}
                  onChange={handleAnswerChange}
                  placeholder={answer !== "" ? answer : "Select an Answer"}
                  controlShouldRenderValue={false}
                />
              </div>
              <button className="btn btn-secondary mt-4 w-100">
                Need a hint?
              </button>
            </div>
          </div>
        </div>
      </div>
      <StoreAnswer answers={answers} />
    </div>

  );
};

export default App;
