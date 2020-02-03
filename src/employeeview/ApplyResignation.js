import React, {useEffect} from 'react';
import {Button, Descriptions, Input, Popconfirm, Spin, Typography} from 'antd';
import {getResignationByUserId, openNotificationWithIcon, submitResignation, withdrawResignationByResignationId} from "../utils/APIUtils";
import moment from "moment";

const {TextArea} = Input;
const {Paragraph} = Typography;

const ApplyResignation = (props) => {
    let loginUser = props.user;
    let manager = props.user.manager;
    const [loading, setLoading] = React.useState(false);
    const [resignComment, setResignComment] = React.useState('');
    const [submittedResign, setSubmittedResign] = React.useState('');
    useEffect(() => {
        getResignationByUserId(props.user.mail).then(response => {
            if (response.resignationId) {
                setSubmittedResign(response);
                setResignComment(response.reason);
                openNotificationWithIcon("info", 'Already Submitted Resignation', '');
            }
        }).catch(error => {
            openNotificationWithIcon("error", 'Error in fetching Resignation', '')
        });
    }, []);
    const submitResign = () => {
        setLoading(true);
        let date = moment();
        let dateNow = date.toISOString();
        let releaseDate = date.add(2, 'M').toISOString();
        const resignRequest = {
            userId: props.user.mail,
            reason: resignComment,
            applicationDate: dateNow,
            releaseDate: releaseDate,
            actualDate: releaseDate,
            country: 'India',
            isManagerApproved: false,
            status: 'SUBMITTED',
            userName: props.user.name,
            managerName: props.user.manager.name,
            userDepartment: props.user.department,
            correspondenceUserDetailsRequest: {
                userId: props.user.mail,
                name: props.user.name,
                address: 'Pune',
                city: 'Pune',
                state: 'Maharashtra',
                pin: '411032',
                email: props.user.mail,
                contactNo: '7350834452'
            }
        }
        submitResignation(resignRequest).then(response => {
            if (response) {
                setSubmittedResign(response);
                openNotificationWithIcon('success', 'Resignation Submitted Successfully', '');
            } else {
                window.location = '/';
            }
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            openNotificationWithIcon('error', 'Failed to Submit', '');

        });
        console.log(resignRequest);
        setLoading(false);
    };
    const withdrawResignation = () => {
        setLoading(true);

        withdrawResignationByResignationId(submittedResign.resignationId).then(response => {
            if (response) {
                window.location = '/';
                openNotificationWithIcon('success', 'Resignation WithDraw Successfully', '');
            } else {
                window.location = '/';
            }
            setLoading(false);
        }).catch(error => {
            openNotificationWithIcon('error', 'Failed to Withdraw Resignation', '');
            setLoading(false);
        });
    }
    return (
        <div>
            <Spin tip="In Progress..." spinning={loading}>
                <Descriptions bordered title="Employee Resignation Form" column={2}>
                    <Descriptions.Item label="Name">{loginUser.name}</Descriptions.Item>
                    <Descriptions.Item label="Employee ID">{loginUser.mail}</Descriptions.Item>
                    <Descriptions.Item label="Manager Id">{manager.mail}</Descriptions.Item>
                    <Descriptions.Item label="Manager Name">{manager.name}</Descriptions.Item>
                    <Descriptions.Item label="Resignation Reason: " span={2}>
                        <TextArea
                            placeholder="Please Add Comments Regarding Request"
                            autoSize={{minRows: 3, maxRows: 5}}
                            onChange={e => setResignComment(e.target.value)}
                            value={resignComment}
                            disabled={submittedResign}
                        />
                    </Descriptions.Item>

                </Descriptions>
                <br/>
                <br/>
                <Paragraph>
                    By Submitting resignation form I accept the Employee resignation and termination policies as per the
                    Mediaocean Employees resignation Policies
                </Paragraph>
                <br/>
                <br/>
                <div>
                    <Popconfirm placement="right" title='Are you sure to Submit Resignation?' onConfirm={submitResign}
                                okText="Yes"
                                cancelText="No">

                        <Button className='resignation-btn' disabled={submittedResign} type="danger">Submit</Button>
                    </Popconfirm>

                    <Popconfirm placement="right" title='This will stop resignation Process'
                                disabled={!submittedResign}
                                onConfirm={withdrawResignation} okText="I Confirm"
                                cancelText="Cancel">

                        <Button className='resignation-btn' disabled={!submittedResign}
                                type="primary">Withdraw</Button>
                    </Popconfirm>
                </div>
            </Spin>
        </div>
    );
}

export default ApplyResignation;