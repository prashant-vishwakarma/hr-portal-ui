import React from 'react';
import {Button, Checkbox, Col, Form, Icon, Input, Row} from 'antd';
import './Login.css';
import {getResignationByUserId, login, openNotificationWithIcon} from '../utils/APIUtils';
import {ACCESS_TOKEN, USER_DATA} from '../globalConstants';
import logo from './mediaoceanLogo.svg';

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class Login extends React.Component {
    state = {
        collapsed: false,
    };
    handleSubmit = e => {
        e.preventDefault();
        const {callback} = this.props;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                let requestBody = {};
                requestBody.username = values.username;
                requestBody.password = values.password;
                login(requestBody)
                    .then(response => {
                        if (response) {
                            localStorage.setItem(ACCESS_TOKEN, response.token);
                            localStorage.setItem(USER_DATA, JSON.stringify(response));
                            openNotificationWithIcon('success', 'Login successful', '', 1.5);
                            let user = response.authentication.principal;
                            user.roles = response.roles;

                            if (!user.mail) {
                                user.mail = user.userPrincipalName;
                            }

                            getResignationByUserId(user.mail).then(response => {
                                if (response.hasOwnProperty('resignationId')) {
                                    localStorage.setItem('resignationForUser', JSON.stringify(response));
                                } else {
                                    openNotificationWithIcon('error', 'Could Not Fetch Status', 'Employee\'s Resignation Status Unknown');
                                }
                            });

                            callback(user);
                        }
                    }).catch(error => {
                    openNotificationWithIcon('error', 'Login Failed : ', error.message);
                });
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Row type='flex' style={{height: '100vh'}} align='middle'>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Form onSubmit={this.handleSubmit} className='login-form'
                              label='Mediaocean Employee Resignation Portal'>
                            <Row type='flex' justify='center' style={{marginBottom: '20px'}}>
                                <img src={logo} width='200px'/>
                            </Row>
                            <Row>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Please input your username!'}],
                                    })(
                                        <Input
                                            prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder='Username'
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input
                                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type='password'
                                            placeholder='Password'
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox>Remember me</Checkbox>)}
                                    <a className='login-form-forgot' href=''>
                                        Forgot password
                                    </a>
                                    <Button type='primary' htmlType='submit' className='login-form-button'>
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        );
    }
};


// import React, {useState} from 'react';
// import './Login.css';
// //import '../content/Content.css';
// import logo from './logo.svg';
//
// // const handleSubmit = () => {
// //     login(loginRequest)
// //         .then(response => {
// //             localStorage.setItem(ACCESS_TOKEN, response.accessToken);
// //         }).catch(error => {
// //     });
// // }
//
// const Login = ({updateUsername, updateUserData, updateLoginState}) => {
//
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//
//     const bypassLogin = (username) => {
//         updateUserData({user: {name: 'Prashant'}});
//         updateUsername(username)
//         updateLoginState(true);
//     }
//
//     const formSubmitHandler = () => {
//         let body = {};
//         body.usernameOrEmail = username;
//         body.password = password;
//         // login(body)
//         //     .then(response => {
//         //         localStorage.setItem(ACCESS_TOKEN, response.accessToken);
//         //         updateUsername(username);
//         //         fetchFromUri(API_BASE_URL + URI_SEPARATOR + USERS_URI + URI_SEPARATOR + username).then(response => updateUserData(response));
//         //         updateLoginState(true);
//         //     }).catch(error => {
//         //
//         // });
//         bypassLogin(username);
//     }
//
//
//     return (
//         <div className={'app-content'}>
//             <div className='login-container'>
//                 <div className='login-container-header'>
//                     <img className='login-image' src={logo} alt='Login Logo'></img>
//                 </div>
//                 <div className='login-form'>
//                     <form>
//                         <div>
//                             <input type='text' id='username' onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
//                         </div>
//                         <div>
//                             <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
//                         </div>
//                     </form>
//                     <div>
//                         <button onClick={formSubmitHandler} className='login-button'>Login</button>
//                     </div>
//                 </div>
//                 <div className='login-container-footer'>
//                     <div>
//                         <div className='login-app-name'>Employee Portal App</div>
//                     </div>
//                     <div className='login-footer-text'>
//                         Welcome to Employee Portal, Mediaocean. This portal simplifies the Exit Process of an Employee from
//                         our Organisation for the HR's Perspective.
//                     </div>
//                     <img src={logo} alt='Mediaocean Logo' className='mediaocean-logo'></img>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default Login;