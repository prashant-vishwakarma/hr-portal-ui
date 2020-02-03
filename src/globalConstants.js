const globalConstants = {
    APP_NAME: 'Employee Exit Portal'
}

export const API_BASE_URL = 'http://localhost:8080';
export const SIGNUP_URI = 'auth/signup';
export const API_LOGIN_URI = 'http://localhost:8080/auth/login';

export const USERS_URI = 'api/user';
export const DUMMY_URI = 'http://dummy.restapiexample.com/api/v1/employees';

export const POLL_LIST_SIZE = 'listSize';
export const API_RESIGN_URL = 'http://localhost:8080/resign/submitResignation';


export const API_GET_RESIGNATION_BY_USER_ID_URL = 'http://localhost:8080/resign/resignationByUserId';
export const API_RESIGN_STATUS_URL = 'http://localhost:8080/resignstatus';
export const API_WITHDRAW_RESIGNATION_URL = 'http://localhost:8080/resign/withdrawResignation';

export const API_EXIT_INTERVIEW_GET_ALL_QUESTIONS_URL = 'http://localhost:8080/question/getAllQuestion';
export const API_EXIT_INTERVIEW_GET_QUESTION_BY_QUESTION_ID_URL = 'http://localhost:8080/question/getQuestionById';
export const API_EXIT_INTERVIEW_SUBMIT_URL = 'http://localhost:8080/submitform';
export const API_EXIT_INTERVIEW_ANSWER_URL = 'http://localhost:8080/getAnswer';
export const API_URI_SEPARATOR = '/';

export const USER_DATA = 'userData';
export const ACCESS_TOKEN = 'token';


export default globalConstants;
