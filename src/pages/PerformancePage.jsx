import React, { useEffect, useState } from "react";
import { getResult } from "../services/operations/resultAPI";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const PerformancePage = () => {
    const { user } = useSelector((state) => state.profile);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getAllResult = async () => {
        try {
           // console.log(user._id)
            const fetchResult = await getResult(user._id);
            const response = await fetchResult(); // Call the returned async function
            setResult(response.data.data); // Set the state to response.data which contains the questions array
            //console.log("from performance page");
            //console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            console.log("error to fetch result");
            toast.error("Error Occurs");
            navigate("/error");
        }
    };

    useEffect(() => {
        getAllResult();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {
                loading ? (
                    <Spinner/>
                ) : (
                    <div className="container mx-auto p-4">
                        <div className="mt-5 bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-bold mb-5">Your Performance</p>
                            {result.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {result.map((data) => (
                                        <div key={data.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
                                            <div>
                                                <p className="text-lg font-bold">Result ID: {data._id}</p>
                                                <div className="flex gap-24">
                                                    <p className="text-gray-700">TestId: {data.testId}</p>
                                                    <p className="text-gray-700">Your Score: {data.score}</p>
                                                    <p className="text-gray-700">Test Given At: {data.createdAt}</p>

                                                </div>
                                            </div>
                                            <Link to='/performance/result-details' state={{ testId: data.testId, userAnswer: data.userAnswer }} className="mt-4 md:mt-0 md:ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
                                                View Details
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-xl text-gray-700">No results found.</p>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default PerformancePage;
