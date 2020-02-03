const globalConstants = {
    APP_NAME: 'Employee Exit Portal'
}

export const DATE_FORMAT = '1976-04-19T12:59-0500';

export const API_BASE_URL = 'http://localhost:8080';
export const SIGNUP_URI = 'auth/signup';
export const LOGIN_URI = 'api/auth/signin';

export const USERS_URI = 'api/user';
export const DUMMY_URI = 'http://dummy.restapiexample.com/api/v1/employees';

export const POLL_LIST_SIZE = 'listSize';
export const API_RESIGN_URL = 'http://localhost:8080/resign/submitResignation';


export const API_GET_RESIGNATION_BY_USER_ID_URL = 'http://localhost:8080/resign/resignationByUserId';
export const API_RESIGN_STATUS_URL = 'http://localhost:8080/resignstatus';
export const API_WITHDRAW_RESIGNATION_URL = 'http://localhost:8080/resign/withdrawResignation';

export const API_EXIT_INTERVIEW_QUE_URL = 'http://localhost:8080/question';
export const API_EXIT_INTERVIEW_SUBMIT_URL = 'http://localhost:8080/submitform';
export const API_EXIT_INTERVIEW_ANSWER_URL = 'http://localhost:8080/getAnswer';
export const API_URI_SEPARATOR = '/';

export const USER_DATA = 'userData';
export const ACCESS_TOKEN = 'token';


export default globalConstants;
