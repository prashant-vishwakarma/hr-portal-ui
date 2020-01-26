import React from 'react';
import globalConstants from '../globalConstants';
import './Header.css';

const Header = () =>
    <header className={'header'}>
        <div className={'ant-row'}>
            <div className='header-app-name'>{globalConstants.APP_NAME}</div>
        </div>
    </header>

export default Header;