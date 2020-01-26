import React, {useEffect} from 'react';
import {Button, Descriptions, Input, Popconfirm, Spin, Typography} from 'antd';
import {getSubmittedResign, openNotificationWithIcon, submitResignation, updateStatus} from "../utils/APIUtils";

const {TextArea} = Input;
const {Paragraph} = Typography;

const ApplyResignation = (props) => {
    let loginUser = props.user;
    let manager = props.user.manager;
    const [loading, setLoading] = React.useState(false);
    const [resignComment, setResignComment] = React.useState("");
    const [submittedResign, setSubmittedResign] = React.useState("");
    useEffect(() => {
        getSubmittedResign(props.user.mail).then(response => {
            if (response.resignation_id) {
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
        const resignRequest = {
            reason: resignComment,
            user_id: props.user.mail,
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
    };
    const withdrawResignation = () => {
        setLoading(true);
        const resignRequest = {
            user_id: props.user.mail,
            reason: resignComment,
            application_date: new Date(),
            status: "WITHDRAW"
        }
        updateStatus(props.user.mail, submittedResign.resignation_id).then(response => {
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
        console.log(resignRequest);
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
                            placeholder="Rejection Comments"
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

                    <Button className='resignation-btn'>Cancel</Button>
                    <Popconfirm placement="right" title='Are you sure to withdraw Resignation?'
                                onConfirm={withdrawResignation} okText="Yes"
                                cancelText="No">

                        <Button className='resignation-btn' disabled={!submittedResign}
                                type="primary">Withdraw</Button>
                    </Popconfirm>
                </div>
            </Spin>
        </div>
    );
}

export default ApplyResignation;