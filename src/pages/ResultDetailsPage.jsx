import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestion } from "../services/operations/questionAPI";
import Navbar from "../components/navbar";
import Spinner from "../components/Spinner";

const ResultDetailsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading]  = useState(true);

    const location = useLocation();
    const testId = location.state.testId;
    const userAnswers = location.state.userAnswer;

    const navigate = useNavigate();

    const getTestQuestions = async () => {
        try {
            const fetchQuestions = await getQuestion(testId);
            const response = await fetchQuestions();
            setQuestions(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            console.log("error to fetch questions");
            navigate("/error")
        }
    };

    useEffect(() => {
        getTestQuestions();
    }, []);

    const questionsWithAnswers = questions.map((question, index) => ({
        ...question,
        userAnswer: userAnswers[index] ? userAnswers[index].answer : "NoT answered"
    }));

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {
                loading ? (
                    <Spinner/>
                ) : (
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Test Details: {testId}</h2>

                        {questions.length > 0 ? (
                            questionsWithAnswers.map((data) => (
                                <div key={data._id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm">
                                    <h3 className="font-semibold text-lg text-gray-800">Question: {data.question}</h3>

                                    <div className="mt-4">
                                        <p className="font-semibold text-gray-700">Options:</p>
                                        <ul className="list-disc list-inside ml-4">
                                            {data.options.map((option, index) => (
                                                <li key={index} className="text-gray-600">{option}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-4">
                                        <p className="font-semibold text-green-600">Correct Answer: <span className="text-gray-800">{data.correctAnswer}</span></p>
                                        <p className="font-semibold text-red-600">Your Answer: <span className="text-gray-800">{data.userAnswer}</span></p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-xl text-gray-700">Loading...</p>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default ResultDetailsPage;
