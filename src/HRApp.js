import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import './slider.css';
import {Form} from 'antd';
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import {USER_DATA} from "./globalConstants";

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(Login);

class HRApp extends React.Component {
    state = {
        collapsed: false,
        user: {}
    };

    componentDidMount() {
        // localStorage.removeItem(ACCESS_TOKEN);
        if (localStorage.hasOwnProperty(USER_DATA) && localStorage.getItem(USER_DATA).accessToken) {
            let user = localStorage.getItem(USER_DATA).authentication.principal;
            user.roles = localStorage.getItem(USER_DATA).roles;
            this.setState({user: user});
        } else {
            this.setState({user: {}});
        }
    }

    callback(userPrincipal) {
        this.setState({user: userPrincipal});
    }

    render() {
        return (
            <div>
                {this.state.user && this.state.user.mail ? <Dashboard user={this.state.user}/> :
                    <WrappedNormalLoginForm callback={this.callback.bind(this)}/>}
            </div>
        );
    }
}

export default HRApp;