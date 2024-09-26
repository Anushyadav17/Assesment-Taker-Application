import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { GET_QUESTION } = endpoints;

export function getQuestion(testId) {
    return async () => {
        try {
            const response = await apiConnector("POST", GET_QUESTION,  {
                testId,
            } )

            // console.log(response);

            // console.log("After calling enrolled courses");

            if (!response.data.success) {
                console.log(response.data.message);
                throw new Error(response.data.message);
            }
            
             return response.data;


        } catch (error) {
            console.log(error);
        }
    }
}
