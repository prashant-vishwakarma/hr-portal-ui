import React, {useEffect, useState} from 'react';
import {Button, Col, Descriptions, Input, Row} from 'antd';
import {getAllExitInterviewQuestions, getAnswerById, openNotificationWithIcon, sendAnswer} from '../utils/APIUtils';

const Textarea = Input;

const FeedbackForm = (props) => {
    let loginUser = props.user;
    const [question, setQuestion] = useState(null);
    const [submittedAnswer, setSubmittedAnswer] = useState({});
    useEffect(() => {
        getAllExitInterviewQuestions().then(response => {
            setQuestion(response);
            console.log('Response', response);
        });
        getAnswerById(loginUser.id).then(response => {
            if (response.length > 0) {
                setSubmittedAnswer(response);
                openNotificationWithIcon("success", 'Already submitted the Form');
            }

        });
    }, []);
    const sendData = () => {
        let body = [];
        for (let i = 1; i <= Object.keys(question).length; i++) {
            let subBody = {};
            subBody.questionId = i;
            subBody.answer = document.getElementById('Answer' + i).value;
            body[(i - 1)] = subBody;

        }
        let request = {
            userId: loginUser.id,
            answerDTOS: body
        }
        sendAnswer(request).then(response => {
            if (response) {
                openNotificationWithIcon("success", "Sucussfully submitted the Answers", '');
                setSubmittedAnswer(response);
            }
        });
    }

    const queAnswerForm = (que) => {
        if (que === null) {
            return <div></div>;
        } else {
            return que.map((text, index) => (
                <div key={'div' + index}>
                    <label>{text.question}</label>
                    <Textarea key={'ans' + (index + 1)} id={'Answer' + (index + 1)}/>
                    <br/>
                    <br/>
                </div>
            ));
        }
    }

    return (
        <form action="" method="post">
            <div>
                <Row>
                    <Col span={12} offset={6} align="center">
                        <Descriptions theme="dark" title="Exit Form" layout="vertical" bordered>
                            <div> {queAnswerForm(question)}</div>
                        </Descriptions>
                        <br/><br/>
                        <Button disabled={submittedAnswer.length > 0} align="center" type="primary" onClick={sendData}>Submit Answer</Button>
                    </Col>
                </Row>
            </div>
        </form>
    )
}
export default FeedbackForm;