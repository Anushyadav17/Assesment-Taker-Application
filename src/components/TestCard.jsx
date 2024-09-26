import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = (props) => {
    let data = props.data;

    const testData = {
        id: data._id,
        time: data.duration,
        subject: data.title,
    }

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 m-4 p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="px-6 py-4">
                <p className="text-blue-600 dark:text-blue-300 font-bold text-xl mb-2">Test Name: {data.testName}</p>
                <p className="text-gray-700 dark:text-gray-300 text-base mb-2">Subject: {data.title}</p>
                <p className="text-gray-700 dark:text-gray-300 text-base mb-4">Duration: {data.duration} mins</p>

                <Link to='/dashboard/test-home-page' state={{ testData: testData }}>
                    <button
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white 
                        transition-colors duration-300 mt-4"
                    >
                        Go to Test
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default TestCard;
