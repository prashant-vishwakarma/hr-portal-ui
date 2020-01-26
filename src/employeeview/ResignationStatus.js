import React, {useEffect} from 'react';
import { Table } from 'antd';
import {getSubmittedResign, openNotificationWithIcon} from "../utils/APIUtils";

const columns = [
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Action By', dataIndex: 'actionBy', key: 'actionBy' },
    {
        title: 'Send Reminder',
        dataIndex: '',
        key: 'x',
        render: () => <a>Remind</a>,
    },
];

const data = [
    {
        key: 1,
        department: 'Manager',
        status: 'Approve',
        actionBy: 'Manager Name',
        description: 'Discussion is done, Approving the resignation',
    },
    {
        key: 2,
        department: 'Finance',
        status: 'Approve',
        actionBy: 'Finance Name',
        description: 'Finance section is clear, Approving the resignation',
    },
    {
        key: 3,
        department: 'Admin',
        status: 'Pending',
        actionBy: '-',
        description: '',
    },
];

const ResignationStatus = (props) => {
    let loginUser = props.user.user;
    let manager = props.user.manager;
    const [loading, setLoading] = React.useState(false);
    const [resignStatus, setResignStatus] = React.useState({});
    const [submittedResign, setSubmittedResign] = React.useState("");
    const data = [
        {
            key: 1,
            department: 'Manager',
            status: resignStatus.managerStatus,
            actionBy: manager.name,
            description: 'Comment Implementation is pending',
        },
        {
            key: 2,
            department: 'Finance',
            status: resignStatus.financeStatus,
            actionBy: 'Finance Department',
            description: 'Finance section is clear, Approving the resignation',
        },
        {
            key: 3,
            department: 'Admin',
            status: resignStatus.adminStatus,
            actionBy: 'Admin Department',
            description: '',
        },
        {
            key: 4,
            department: 'HR',
            status: resignStatus.hrstatus,
            actionBy: 'HR Department',
            description: '',
        },
    ];
    useEffect(() => {
        if(loginUser.status === 'FILED_RESIGNATION') {
            getSubmittedResign(props.user.id).then(response => {
                setSubmittedResign(response);
                setResignStatus(response.resignationStatus);
            }).catch(error => {
                openNotificationWithIcon("error", 'Error in fetching Resignation', '')
            });

        }
    }, []);

    return (
        <Table
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={data}
        />
    );
}

export default ResignationStatus;