import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { getAlltest } from "../services/operations/testAPI";
import { TiMessages } from "react-icons/ti";
import { TbReportSearch } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import TestCompletionChart from "../components/charts/TestCompletionChart";
import { getCount } from "../services/operations/authAPI";
import Spinner from "../components/Spinner";

const Dashboard = () => {
    const { user } = useSelector((state) => state.profile);

    const [tests, setTests] = useState([]);
    const [testCount, setTestCount] = useState(0);
    const [questionCount, setQuestionCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [userTestCount, setUserTestCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getTest = async () => {
        try {
            const fetchTest = await getAlltest();
            const response = await fetchTest();
            setTests(response.data);
        } catch (error) {
            console.log("Error fetching tests:", error);
            navigate("/error")
        }
    };

    const getValues = async() => {
        try {
            const fetchData = await getCount(user._id);
            const response = await fetchData();
            //console.log(response.data);
            //console.log(response.data.testCount)
            setQuestionCount(response.data.questionCount);
            setTestCount(response.data.testCount);
            setUserCount(response.data.userCount);
            setUserTestCount(response.data.userTestCount);

            setLoading(false);

        } catch (error) {
            console.log("Error fetching values:", error);
            navigate("/error")
        }
    }

    useEffect(() => {
        getTest();
        getValues();
    }, []);

    const totalTests = 10; // Replace with the actual total tests
    const doneTests = 6; // Replace with the actual number of completed tests

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            {
                loading ? (
                    <Spinner/>
                ) : (
                    <div className="p-4 md:p-10 lg:px-32">
                        <div className="flex flex-wrap justify-between mb-5 gap-5 md:gap-0">
                            <StatCard value={testCount} label="Tests" icon={<TiMessages className="h-10 w-10 text-blue-500" />} />
                            <StatCard value={questionCount} label="Questions" icon={<TbReportSearch className="h-10 w-10 text-blue-500" />} />
                            <StatCard value={userCount} label="Users" icon={<FaUser className="h-8 w-8 text-blue-500" />} />
                            <StatCard value={userTestCount} label="User Tests" icon={<TiMessages className="h-10 w-10 text-blue-500" />} />
                        </div>

                        <div className="mt-5 flex flex-col lg:flex-row gap-5">
                            <div className="bg-white lg:w-[30%] flex flex-col justify-between py-4 pb-6 rounded-lg shadow-lg">
                                <div className="p-4">
                                    <p className="text-lg font-bold mb-5">Your Profile</p>
                                    <p className="text-lg font-semibold mb-2">{user?.firstName} {user?.lastName}</p>
                                    <p className="text-gray-600 mb-2">{user?.email}</p>
                                </div>
                            </div>
                            <div className="bg-white lg:w-[70%] p-6 rounded-lg shadow-lg flex flex-col">
                                <p className="text-lg font-bold mb-5">Your Progress</p>
                                <div className="flex-1">
                                    <TestCompletionChart totalTests={testCount} doneTests={userTestCount} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-bold mb-5">Available Tests</p>
                            <div className="grid grid-cols-1 gap-4">
                                {tests.map((data) => (
                                    <div key={data._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
                                        <div>
                                            <p className="text-lg font-bold">{data.testName}</p>
                                            <p className="text-gray-700">{data.title} - Duration: {data.duration}</p>
                                        </div>
                                        <Link
                                            to='test-home-page'
                                            state={{id: data._id, time: data.duration, subject : data.title}}
                                            className="mt-4 md:mt-0 md:ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                                        >
                                            Go to Test
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

const StatCard = ({ value, label, icon }) => (
    <div className="bg-white p-6 w-full md:w-[20%] py-2 flex justify-between items-center rounded-lg shadow-lg">
        <div>
            <p className="text-4xl font-bold">{value}</p>
            <p className="text-gray-600">{label}</p>
        </div>
        {icon}
    </div>
);

export default Dashboard;
