import {
    ACCESS_TOKEN,
    API_BASE_URL,
    API_EXIT_INTERVIEW_ANSWER_URL,
    API_EXIT_INTERVIEW_GET_ALL_QUESTIONS_URL,
    API_EXIT_INTERVIEW_SUBMIT_URL,
    API_GET_MANAGER_PENDING_BY_MANAGER_ID_URL,
    API_GET_RESIGNATION_BY_USER_ID_URL,
    API_GET_RESIGNATIONS_MANAGERCLEARANCE_URL,
    API_LOGIN_URI,
    API_RESIGN_STATUS_URL,
    API_RESIGN_URL,
    API_UPDATE_RESIGNATION_URL,
    API_URI_SEPARATOR,
    API_WITHDRAW_RESIGNATION_URL,
    USER_RESIGNATION_STATUS
} from '../globalConstants';
import {notification} from "antd";
import _ from 'lodash';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(loginRequest) {
    return request({
        url: API_LOGIN_URI,
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export const getResignationByUserId = (userId) => {
    return request({
        url: API_GET_RESIGNATION_BY_USER_ID_URL + API_URI_SEPARATOR + userId,
        method: 'GET'
    });
}


export const submitResignation = (resignationRequest) => {
    return request({
        url: API_RESIGN_URL,
        method: 'POST',
        body: JSON.stringify(resignationRequest)
    });
}

export const withdrawResignationByResignationId = (resignationId) => {
    return request({
        url: API_WITHDRAW_RESIGNATION_URL + API_URI_SEPARATOR + resignationId,
        method: 'PUT',
        body: JSON.stringify({status: 'WITHDRAW'})
    });
}

export const rejectResignationByResignationId = (resignationId) => {
    return request({
        url: API_UPDATE_RESIGNATION_URL + API_URI_SEPARATOR + resignationId,
        method: 'PUT',
        body: JSON.stringify({status: 'WITHDRAW'})
    });
}

export const getAllExitInterviewQuestions = () => {
    return request({
        url: API_EXIT_INTERVIEW_GET_ALL_QUESTIONS_URL,
        method: 'GET'
    });
}

export const initialApproveResignationByResignationId = (resignationId) => {
    return request({
        url: API_UPDATE_RESIGNATION_URL + API_URI_SEPARATOR + resignationId,
        method: 'PUT',
        body: JSON.stringify({managerApproved: true})
    });
}

export const getResignationsForManagerClearance = () => {
    return request({
        url: API_GET_RESIGNATIONS_MANAGERCLEARANCE_URL,
        method: 'GET'
    });
}

// export function signup(signupRequest) {
//     return request({
//         url: API_BASE_URL + "/auth/signup",
//         method: 'POST',
//         body: JSON.stringify(signupRequest)
//     });
// }

// export function checkUsernameAvailability(username) {
//     return request({
//         url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
//         method: 'GET'
//     });
// }


// export function checkEmailAvailability(email) {
//     return request({
//         url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
//         method: 'GET'
//     });
// }

// export function getCurrentUser() {
//     if (!localStorage.getItem(ACCESS_TOKEN)) {
//         return Promise.reject("No access token set.");
//     }
//
//     return request({
//         url: API_BASE_URL + "/user/me",
//         method: 'GET'
//     });
// }

export function checkPermission(user, permission) {
    let hasPermission = false;
    hasPermission = _.some(user.roles, function (userPermission) {
        return userPermission.authority === permission;
    })

    return hasPermission;

}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function checkResigned() {
    let resigned = false;
    if (JSON.parse(localStorage.getItem(USER_RESIGNATION_STATUS)).hasOwnProperty('resignationId')) {
        resigned = true;
    }
    return resigned;
}

export function getResignationForMgr(managerId) {
    return request({
        url: API_GET_MANAGER_PENDING_BY_MANAGER_ID_URL + API_URI_SEPARATOR + managerId,
        method: 'GET'
    });
}

export function getResignationForHr() {
    return request({
        url: API_RESIGN_STATUS_URL + "/getresignationforhr",
        method: 'GET'
    });
}

export function getResignationForAdmin() {
    return request({
        url: API_RESIGN_STATUS_URL + "/getResignationforadmin",
        method: 'GET'
    });
}

export function getResignationForFinance() {
    return request({
        url: API_RESIGN_STATUS_URL + "/getResignationforfinance",
        method: 'GET'
    });

}

export function getSubmittedResign(empId) {
    return request({
        url: API_RESIGN_URL + "/" + empId,
        method: 'GET'
    });
}

export function updateStatus(empId, resignId) {
    return request({
        url: API_RESIGN_URL + "/updatestatus?employeeId=" + empId + "&status=WITHDRAW&resignId=" + resignId,
        method: 'GET'
    });
}


export const openNotificationWithIcon = (type, message, description, duration) => {
    notification[type]({
        message: message,
        description: description,
        duration: duration ? duration : 3
    });
}

export function updateResignationStatus(udpateRequest) {
    return request({
        url: API_RESIGN_STATUS_URL + "/update",
        method: 'POST',
        body: JSON.stringify(udpateRequest)
    });
}

export function getResignationApprovedByMe(getRequest) {
    return request({
        url: API_RESIGN_STATUS_URL + "/getResignationApprovedByMe",
        method: 'POST',
        body: JSON.stringify(getRequest)
    });
}

// export function getQuestions() {
//     return request({
//         url: API_EXIT_INTERVIEW_QUE_URL,
//         method: 'GET'
//     });
//
// }

export function sendAnswer(answerRequest) {
    return request({
        url: API_EXIT_INTERVIEW_SUBMIT_URL,
        method: 'POST',
        body: JSON.stringify(answerRequest)
    });

}

export function getAnswerById(userId) {
    return request({
        url: API_EXIT_INTERVIEW_ANSWER_URL + "?userId=" + userId,
        method: 'GET'
    });

}