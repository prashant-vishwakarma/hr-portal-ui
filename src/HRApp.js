import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import './slider.css';
import {Form} from 'antd';
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import {ACCESS_TOKEN, USER_DATA} from "./globalConstants";

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(Login);

class HRApp extends React.Component {
    state = {
        collapsed: false,
        user: {}
    };

    isValidJSON = (str) => {
        if (/^\s*$/.test(str)) return false;
        str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
        str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        return (/^[\],:{}\s]*$/).test(str);
    }

    componentDidMount() {
        // localStorage.removeItem(ACCESS_TOKEN);
        if (localStorage.hasOwnProperty(ACCESS_TOKEN) && localStorage.hasOwnProperty(USER_DATA) && this.isValidJSON(localStorage.getItem(USER_DATA))) {
            const temp = JSON.parse(localStorage.getItem(USER_DATA));
            let user = temp.authentication.principal;
            user.roles = temp.roles;
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