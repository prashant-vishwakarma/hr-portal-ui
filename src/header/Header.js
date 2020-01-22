import React from 'react';
import globalConstants from '../globalConstants';
import './Header.css';

const Header = () =>
    <div className='header'>
        <div className='header-app-name'>{globalConstants.APP_NAME}</div>
    </div>

export default Header;