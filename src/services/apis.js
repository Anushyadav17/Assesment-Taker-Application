const BASE_URL = "http://localhost:4000/api/v1"

export const endpoints = {
    GET_QUESTION : BASE_URL + "/question/get-question"
}

export const dashBoardEndpoints = {
    GET_ALL_COUNT : BASE_URL + "/auth/get-all-counts"
}

export const authEndpoints = {
    LOGIN : BASE_URL + "/auth/login",
    SIGN_UP : BASE_URL + "/auth/signup"
}

export const testEndpoints = {
    GET_ALLTEST : BASE_URL + "/test/get-alltest",
}

export const resultEndPoints = {
    CREATE_RESULT :BASE_URL + "/result/create-result",
    GET_RESULT : BASE_URL + "/result/get-result"
}