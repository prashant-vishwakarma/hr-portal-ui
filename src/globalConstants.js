const globalConstants = {
    APP_NAME: 'Employee Exit Portal'
}

export const API_BASE_URL = 'http://localhost:8080';
export const URI_SEPARATOR = '/';
export const SIGNUP_URI = 'auth/signup';
export const LOGIN_URI = 'api/auth/signin';

export const USERS_URI = 'api/user';
export const DUMMY_URI = 'http://dummy.restapiexample.com/api/v1/employees';

export const POLL_LIST_SIZE = 'listSize';
export const ACCESS_TOKEN = 'token';


//export const API_BASE_URL ='http://localhost:8080';
export const API_RESIGN_URL = 'http://localhost:8080/resign';
export const API_RESIGN_STATUS_URL = 'http://localhost:8080/resignstatus';
export const API_EXIT_INTERVIEW_QUE_URL = 'http://localhost:8080/question';
export const API_EXIT_INTERVIEW_SUBMIT_URL = 'http://localhost:8080/submitform';
export const API_EXIT_INTERVIEW_ANSWER_URL = 'http://localhost:8080/getAnswer';
//export const ACCESS_TOKEN = 'accessToken';
export const USER_DATA = 'userData';


export default globalConstants;