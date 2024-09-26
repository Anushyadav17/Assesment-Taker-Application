import { apiConnector } from "../apiconnector";
import { testEndpoints } from "../apis";

const {GET_ALLTEST} = testEndpoints;

export function getAlltest () {
    return async () => {
        try {
            const response = await apiConnector("GET", GET_ALLTEST)

            //console.log(response);

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