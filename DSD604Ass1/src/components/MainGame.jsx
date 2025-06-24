import { React, useState } from 'react';
import { maoriPlaceNamesData, sortedListAnswers } from '../assets/maoriPlaceNames';
import { Random } from '../utilities/Random';
import StoreAnswer from './StoreAnswer';
import HintButton from './HintButton';
import Swal from 'sweetalert2';

import Select from 'react-select';
import { selectCustomStyles } from '../utilities/SelectReactSetting';



export default function MainGame() {
    const allData = maoriPlaceNamesData;
    const getRandomIndex = Random(allData.length);
    const initialIndex = Math.floor(Math.random() * allData.length);
    const [gameData, setGameData] = useState({
        Placename: allData[initialIndex].Placename,
        Components: allData[initialIndex].Components,
        Meaning: allData[initialIndex].Meaning
    });
    const answerData = sortedListAnswers();
    const [answer, setAnswer] = useState("");
    //const [winlose, setWinLose] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

    let answerLet;
    let gameDataLet = { Placename: "Start", Components: "Start", Meaning: "Start" };

    const onClickHandlerNewGame = () => {
        setAnswer("");
        //setWinLose("");
        let rand = Random(allData.length);
        setGameData({
            Placename: allData[rand].Placename,
            Components: allData[rand].Components,
            Meaning: allData[rand].Meaning
        });
        gameDataLet = {
            Placename: allData[rand].Placename,
            Components: allData[rand].Components,
            Meaning: allData[rand].Meaning
        };
        setIsAnsweredCorrectly(false);
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

        //setWinLose(" - you " + winLoseCalc(answerLet));

        if (isCorrect) {
            Swal.fire({
                title: 'Correct!',
                text: `You guessed correctly! The place name is ${gameData.Placename}. Generate a new place name to play again.`,
                confirmButtonText: 'OK',
                theme: 'dark'
            });
            setIsAnsweredCorrectly(true);
        } else {
            Swal.fire({
                title: 'Incorrect!',
                text: `Sorry, try again!`,
                confirmButtonText: 'OK',
                theme: 'dark'
            });
        }
        console.log("answer = ", answerLet + " gameplay = ", gameData.Placename + " gameDataLet.Placename = ", gameDataLet.Placename);
    };

    // const winLoseCalc = (answerLet) => {
    //     if (answerLet !== undefined && answerLet !== null) {
    //         if (answerLet === gameData.Placename) {
    //             return "win! Click 'Generate a new place name' to play again.";
    //         } else {
    //             return "lose. Try again!";
    //         }
    //     }
    //     return "";
    // };

    return (
        <div className="main-game container-fluid py-5">
            <div className="row justify-content-center">
                <h1 className="text-center mb-4 display-3">Guess the Māori Place Name</h1>
                <div className="col-12 col-md-10 col-lg-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <button
                                className="btn btn-primary mb-4 w-100 display-4"
                                onClick={onClickHandlerNewGame}
                            >
                                Generate a new place name
                            </button>
                            <div className="mb-4 text-center">
                                <h2 className="display-4">{gameData.Meaning}</h2>
                            </div>
                            <div>
                                <Select
                                    styles={selectCustomStyles}
                                    options={answerData}
                                    className="selectDropDownStyle"
                                    theme={theme => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#007bff',
                                            neutral0: '#333',
                                            neutral20: '#555',
                                        }})}
                                    value={answerData.find((opt) => opt.value === answer) || null}
                                    onChange={handleAnswerChange}
                                    placeholder={answer !== "" ? answer : "Select an Answer"}
                                    controlShouldRenderValue={false}
                                    isDisabled={isAnsweredCorrectly}
                                />
                            </div>
                            <HintButton components={gameData.Components} placename={gameData.Placename} />
                        </div>
                    </div>
                </div>
            </div>
            <StoreAnswer answers={answers} />
        </div>

    );
};