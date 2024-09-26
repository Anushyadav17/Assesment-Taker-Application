import { startTest } from "../../slices/testSlice";
import { apiConnector } from "../apiconnector";
import { resultEndPoints } from "../apis";
import toast from "react-hot-toast";

const {CREATE_RESULT, GET_RESULT} = resultEndPoints;


export function createResultDetails(userId, testId, score, userAnswer, navigate) {
    return async (dispatch) => {
        try {
            navigate("/result");
            const response = await apiConnector("POST", CREATE_RESULT, {
                userId, testId, score, userAnswer
            });

            if (!response.data.success) {
                console.log(response.data.message);
                throw new Error(response.data.message);
            }

            console.log("result created succesfully...")
            dispatch(startTest(0));
            navigate("/performance")

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
}

export function getResult(userId) {
    
    return async () => {
        try {
            const response = await apiConnector("POST", GET_RESULT, {
                userId
            });


            if (!response.data.success) {
                console.log(response.data.message);
                throw new Error(response.data.message);
            }
            
            return response;

        } catch (error) {
            console.log(error);
        }
    }
}