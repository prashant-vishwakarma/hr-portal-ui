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
export const API_GET_MANAGER_PENDING_BY_MANAGER_ID_URL = 'http://localhost:8080/resign/resignationForManagerApproval';
export const API_RESIGN_STATUS_URL = 'http://localhost:8080/resignstatus';
export const API_WITHDRAW_RESIGNATION_URL = 'http://localhost:8080/resign/withdrawResignation';

export const API_EXIT_INTERVIEW_GET_ALL_QUESTIONS_URL = 'http://localhost:8080/question/getAllQuestion';
export const API_EXIT_INTERVIEW_GET_QUESTION_BY_QUESTION_ID_URL = 'http://localhost:8080/question/getQuestionById';
export const API_EXIT_INTERVIEW_SUBMIT_URL = 'http://localhost:8080/submitform';
export const API_EXIT_INTERVIEW_ANSWER_URL = 'http://localhost:8080/getAnswer';
export const API_URI_SEPARATOR = '/';

export const USER_DATA = 'userData';
export const ACCESS_TOKEN = 'token';
export const USER_RESIGNATION_STATUS = 'resignationForUser';
export const RESIGNATION_ID = 'resignationId'

export const ROLE_USER_IN = 'IN_USER';
export const ROLE_MANAGER_IN = 'IN_MANAGER';
export const ROLE_ADMIN_IN = 'IN_ADMIN';
export const ROLE_FINANCE_IN = 'IN_FINANCE';
export const ROLE_IT_IN = 'IN_IT';
export const ROLE_HR_IN = 'IN_HR';


export const defaultNoManagerPayload =
    {
        "dn": null,
        "password": null,
        "username": null,
        "authorities": [],
        "accountNonExpired": false,
        "accountNonLocked": false,
        "credentialsNonExpired": false,
        "enabled": false,
        "timeBeforeExpiration": 0,
        "graceLoginsRemaining": 0,
        "mail": "nomanager@mediaocean.com",
        "manager": null,
        "name": "No Manager",
        "department": "Global Platforms",
        "country": "India",
        "countryCode": "356",
        "postalCode": null,
        "description": null,
        "title": "No Manager",
        "company": "Product",
        "sirName": null,
        "userPrincipalName": "nomanager@mediaocean.com",
        "state": null,
        "sAMAccountName": "nomanager",
        "cn": "No Manager",
        "streetAddress": null,
        "city": null,
        "directReports": []
    }


export default globalConstants;
