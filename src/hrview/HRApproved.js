import React, {useEffect} from 'react';
import {Table} from 'antd';
import {checkPermission, getResignationApprovedByMe} from "../utils/APIUtils";

const columns = [
    {
        title: 'Employee Name',
        dataIndex: 'empName',

    },
    {
        title: 'Employee Id',
        dataIndex: 'empId',
    },
    {
        title: 'Resignation Id',
        dataIndex: 'resignationId',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
        editable: true,
        width: '20%',
    },
];


const HRApproved = (props) => {
    let loginUser = props.user;
    // let manager = props.user.manager;
    // const [loading, setLoading] = React.useState(false);
    const [approvedResign, setApprovedResign] = React.useState([]);
    console.log("use effect ")
    useEffect(() => {
        let requestObj = {
            userId: loginUser.id,
            status: 'APPROVE',
        }
        if (checkPermission(loginUser, 'ROLE_MANAGER')) {
            requestObj.dept = "MANAGER";
            console.log("use effect manager")
            getResignationApprovedByMe(requestObj).then(response => {
                setApprovedResign(response);
            }).catch(error => {

            });
        }
        if (checkPermission(loginUser, 'ROLE_ADMIN')) {
            requestObj.dept = "ADMIN";
            getResignationApprovedByMe(requestObj).then(response => {
                setApprovedResign(response);
            }).catch(error => {

            });
        }
        if (checkPermission(loginUser, 'ROLE_FINANCE')) {
            requestObj.dept = "FINANCE";
            getResignationApprovedByMe(requestObj).then(response => {
                setApprovedResign(response);
            }).catch(error => {

            });
        }
        if (checkPermission(loginUser, 'ROLE_HR')) {
            requestObj.dept = "HR";
            getResignationApprovedByMe(requestObj).then(response => {
                setApprovedResign(response);
            }).catch(error => {

            });
        }
    }, []);

    return (
        <Table
            columns={columns}
            dataSource={approvedResign}
            bordered
            title={() => 'Approved By ME'}
        />
    );
}

export default HRApproved;