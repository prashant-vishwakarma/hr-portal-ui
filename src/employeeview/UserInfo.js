import React from 'react';
import {Badge, Descriptions} from 'antd';

const UserInfo = (props) => {
    let loginUser = props.user;
    let manager = props.user.manager;
    return (
        <Descriptions theme="dark" title="User Info" layout="vertical" bordered>
            <Descriptions.Item label="Name">{loginUser.name}</Descriptions.Item>
            <Descriptions.Item label="Email Address">{loginUser.mail}</Descriptions.Item>
            <Descriptions.Item label="Employee ID">{loginUser.sAMAccountName}</Descriptions.Item>
            {/*<Descriptions.Item label="Date Of Joining">{loginUser.dateOfJoining.substring(0, 10)}</Descriptions.Item>*/}
            <Descriptions.Item label="Designation"> {loginUser.title} </Descriptions.Item>
            <Descriptions.Item label="Department"> {loginUser.department} </Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text={loginUser.accountNonExpired && 'Active'}/>
            </Descriptions.Item>
            <Descriptions.Item label="Manager Id">{manager && manager.sAMAccountName}</Descriptions.Item>
            <Descriptions.Item label="Manager Name" span={2}>{manager && manager.name}</Descriptions.Item>
            <Descriptions.Item label="Location Info">
                Mediaocean Asia Pvt ltd
                <br/>
                2nd Floor Tower B,
                <br/>
                {loginUser.streetAddress}
                <br/>
                {loginUser.city}
                <br/>
                {loginUser.state}
                <br/>
                {loginUser.country}
                <br/>
            </Descriptions.Item>
        </Descriptions>

    );
}

export default UserInfo;