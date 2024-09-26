import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { createResultDetails } from "../services/operations/resultAPI";
import { useNavigate } from "react-router-dom";
import QuestionTimer from "../components/QuestionTimer";

const QuestionCards = ({ data, duration, testId, onSubmit }) => {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(data.length).fill({ id: "", answer: "" }));
    const [questionNumber, setQuestionNumber] = useState(1);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const { user } = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const n = data.length;

    const handleAnswerChange = (id, answer, idx) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[idx] = { id, answer };
            return updatedAnswers;
        });
    };

    const backbtn = () => {
        if (index === 0) {
            setIndex(0);
            setQuestionNumber(1);
        } else {
            setIndex(index - 1);
            setQuestionNumber(questionNumber - 1);
        }
    };

    const forbtn = () => {
        if (index === n - 1) {
            setIndex(n - 1);
            setQuestionNumber(n);
        } else {
            setIndex(index + 1);
            setQuestionNumber(questionNumber + 1);
        }
    };

    const calAnswer = (userAnswers, questions) => {
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
            if (userAnswers[i].answer === questions[i].correctAnswer) {
                score++;
            }
        }
        onSubmit();
        dispatch(createResultDetails(user._id, testId, score, answers, navigate));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        calAnswer(answers, data);
    };

    return (
        <div className="md:flex">
            <div className="p-4 md:w-[70%] md:pl-10 pt-2">
                <form onSubmit={submitHandler} className="mb-4">
                    <div className="text-xl mb-2 font-bold flex flex-wrap">
                        <QuestionTimer duration={duration} onTimeUp={() => setIsTimeUp(true)} /> min
                    </div>
                    <div className="bg-white">
                        <p className="font-semibold text-xl">Question {questionNumber}:</p>
                        <div className="w-4/4 bg-gray-300 h-[1px] m-6 ml-0 mt-2"></div>
                        <div className="mb-4 w-[100%]">
                            <p className="text-lg text-gray-800">{data[index].question}</p>
                        </div>
                        <div className="mb-2 text-lg">
                            {data[index].options.map((option, idx) => (
                                <div key={idx} className="flex items-center mb-2">
                                    <label className="flex items-center text-gray-700 mt-2">
                                        <input
                                            type="radio"
                                            name={`question_${data[index]._id}`}
                                            value={option}
                                            checked={answers[index] && answers[index].answer === option}
                                            onChange={(e) => handleAnswerChange(data[index]._id, e.target.value, index)}
                                            className="mr-2"
                                            disabled={isTimeUp}
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => handleAnswerChange(data[index]._id, "", index)}
                            className="px-4 py-1 border mt-5 border-black text-black rounded"
                            disabled={isTimeUp}
                        >
                            CLEAR RESPONSE
                        </button>
                    </div>

                    <div
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 absolute top-24 right-4"
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are you Sure?",
                                text2: "Your test will finally be submitted and you cannot change your answer",
                                btn1Text: "Submit",
                                btn2Text: "Cancel",
                                btn1Handler: () => {
                                    submitHandler();
                                    setConfirmationModal(null);
                                },
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                    >
                        Submit
                    </div>
                    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
                    {isTimeUp && (
                        <div className="px-4 py-2 bg-red-600 text-white rounded mt-4">
                            Time's up! Please submit your answers by the above submit buttom.
                        </div>
                    )}
                </form>
                <div className="flex justify-between mt-8 relative">
                    <button
                        onClick={backbtn}
                        className={`px-4 py-2 ${isTimeUp ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"} text-white rounded`}
                        disabled={isTimeUp}
                    >
                        Back
                    </button>
                    <button
                        onClick={forbtn}
                        className={`px-4 py-2 ${isTimeUp ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"} text-white rounded`}
                        disabled={isTimeUp}
                    >
                        Forward
                    </button>
                </div>
            </div>
            <div className="md:w-[30%] h-full text-wrap">
                <div className="flex md:flex-col gap-2 m-10 md:ml-16">
                    <div className="flex gap-2">
                        <button className="border border-black p-2 bg-green-500 py-0.5">0</button>
                        <p>Answered</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="border border-black p-2 bg-gray-300 py-0.5">1</button>
                        <p>Not Answered Or Not Visited</p>
                    </div>
                </div>
                <div className="flex w-[70%] flex-wrap m-10 gap-2 md:ml-16">
                    {data.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setIndex(idx); setQuestionNumber(idx+1); }}
                            className={`border border-gray-500 p-2 py-0.5 ${answers[idx] && answers[idx].answer ? "bg-green-500" : "bg-gray-300"}`}
                            disabled={isTimeUp}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionCards;
