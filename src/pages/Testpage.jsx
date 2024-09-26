// src/pages/Testpage.js
import React, { useState, useEffect } from "react";
import QuestionCards from "../components/QuestionCards";
import { getQuestion } from "../services/operations/questionAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startTest } from "../slices/testSlice";
import Spinner from "../components/Spinner";
import QuestionTimer from "../components/QuestionTimer";

const Testpage = () => {
  const [questions, setQuestions] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id, duration, subject } = location.state.data;
  const testId = id;

  const getTestQuestions = async () => {
    try {
      const fetchQuestions = await getQuestion(testId);
      const response = await fetchQuestions();
      setQuestions(response.data);
      //console.log("from test");
      //console.log(response);
      setLoading(false);

    } catch (error) {
      console.log(error);
      console.log("error to fetch questions");
      navigate("/error")
    }
  };

  useEffect(() => {
    getTestQuestions();
    window.onbeforeunload = () => { return "" };
    
    return () => { window.onbeforeunload = null };
  }, []);

  const handleSubmit = () => {
    // Handle your test submission logic here
    dispatch(startTest(0)); // Reset startTest to 0
  };

  return (
    <div className="">
    {
      loading ? (
        <Spinner/>
      ) : (
        <>
        <div className=" bg-blue-500 flex justify-around p-4 text-xl text-white">
          <p>Subjects : {subject}</p>
          <p>Duration : {duration} min</p>
        </div>
        <div className="flex">
          <div className="w-[100%] p-8">
            {questions ? (
              <QuestionCards data={questions} duration={duration} testId={testId} onSubmit={handleSubmit} />
            ) : (
              <p className="text-center text-xl text-gray-700">Loading...</p>
            )}
          </div>
        </div>
        </>
      )
    }
    </div>
  );
};

export default Testpage;
