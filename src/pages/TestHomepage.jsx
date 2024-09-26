import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { startTest } from "../slices/testSlice";

const TestHomepage = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const id = location.state.id;
    const time = location.state.time;
    const subject = location.state.subject;

    const data = {
        id : id,
        duration : time,
        subject : subject,
    }

    const onclickhandler =  () => {
        console.log("Test started...")
        dispatch(startTest(1));
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-sm md:max-w-md w-full">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Test Instructions</h1>
                    <p className="mt-2 text-gray-600">Please read the instructions carefully before starting the test.</p>
                </div>

                <div className="mb-6">
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Ensure you have a stable internet connection.</li>
                        <li>Do not refresh the page during the test.</li>
                        <li>Each question has a time limit. Answer promptly.</li>
                        <li>Do not navigate away from the test window.</li>
                        <li>Contact support if you encounter any issues.</li>
                    </ul>
                </div>
                 
                <Link to='/testpage' state={{  data: data }}>
                    <button
                        onClick={onclickhandler}
                        className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                    >
                        Start Test
                    </button>
               </Link>
                
            </div>
        </div>
    );
};

export default TestHomepage;
