import React, {useState} from 'react';
import './Login.css';
//import '../content/Content.css';
import logo from './logo.svg';

// const handleSubmit = () => {
//     login(loginRequest)
//         .then(response => {
//             localStorage.setItem(ACCESS_TOKEN, response.accessToken);
//         }).catch(error => {
//     });
// }

const Login = ({updateUsername, updateUserData, updateLoginState}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const bypassLogin = (username) => {
        updateUserData({user: {name: 'Prashant'}});
        updateUsername(username)
        updateLoginState(true);
    }

    const formSubmitHandler = () => {
        let body = {};
        body.usernameOrEmail = username;
        body.password = password;
        // login(body)
        //     .then(response => {
        //         localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        //         updateUsername(username);
        //         fetchFromUri(API_BASE_URL + URI_SEPARATOR + USERS_URI + URI_SEPARATOR + username).then(response => updateUserData(response));
        //         updateLoginState(true);
        //     }).catch(error => {
        //
        // });
        bypassLogin(username);
    }


    return (
        <div className={'app-content'}>
            <div className='login-container'>
                <div className='login-container-header'>
                    <img className='login-image' src={logo} alt='Login Logo'></img>
                </div>
                <div className='login-form'>
                    <form>
                        <div>
                            <input type='text' id='username' onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
                        </div>
                        <div>
                            <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                        </div>
                    </form>
                    <div>
                        <button onClick={formSubmitHandler} className='login-button'>Login</button>
                    </div>
                </div>
                <div className="login-container-footer">
                    <div>
                        <div className='login-app-name'>Employee Portal App</div>
                    </div>
                    <div className='login-footer-text'>
                        Welcome to Employee Portal, Mediaocean. This portal simplifies the Exit Process of an Employee from
                        our Organisation for the HR's Perspective.
                    </div>
                    <img src={logo} alt='Mediaocean Logo' className="mediaocean-logo"></img>
                </div>
            </div>
        </div>
    );
}
export default Login;