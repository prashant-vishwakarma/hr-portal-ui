import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Header from "./header/Header";


function App() {

    const [username, setUsername] = useState('');

    const [loginState, setLoginState] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        chooseDisplayPage();
    }, [loginState]);

    const chooseDisplayPage = () => {
        if (!loginState) {
            return <Login updateUsername={setUsername} updateUserData={setUserData} updateLoginState={setLoginState}/>;
        } else {
            return <Dashboard userData={userData}/>;
        }
    }

    return (
        <div className="App">
            <Header/>
            {chooseDisplayPage()}
        </div>
    );
}

export default App;