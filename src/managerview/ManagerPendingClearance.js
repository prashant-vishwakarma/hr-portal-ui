import React from 'react';
import {Form, Input, Menu, Popconfirm, Table} from 'antd';
import {
    checkPermission,
    getResignationsForManagerClearance,
    initialApproveResignationByResignationId,
    openNotificationWithIcon,
    updateResignationForManagerClearance
} from "../utils/APIUtils";
import {ROLE_MANAGER_IN} from "../globalConstants";
import TextArea from "antd/es/input/TextArea";

const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({editing: editing}, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const {record, handleSave} = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({...record, ...values});
        });
    };

    renderCell = form => {
        this.form = form;
        const {children, dataIndex, record, title} = this.props;
        const {editing} = this.state;
        return editing ? (
            <Form.Item style={{margin: 0}}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}/>)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{paddingRight: 24}}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

const menu = (
    <Menu>
        <Menu.Item>Mark Pending</Menu.Item>
    </Menu>
);


class ManagerPendingClearance extends React.Component {

    expandedRowRender = (childData) => {
        const columns = [
            {title: 'Clearance', dataIndex: 'action', key: 'action'},
            {
                title: 'Comment',
                key: 'comment',
                width: '60%',
                dataIndex: 'comment',
                render: (text, record, index) => {
                    return (
                        <TextArea placeholder='Clearance Details' defaultValue={text} onChange={
                            (e) => {
                                let value = e.target.value;

                                if (index === 0) {
                                    record.handOverComment = value;
                                } else if (index === 1) {
                                    record.licenceRevokeComment = value;
                                } else if (index === 2) {
                                    record.noticePeriodPayoutRecoveryComment = value;
                                }
                            }
                        }>
                        </TextArea>);
                },
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => (
                    <span className="table-operation">
                        <a onClick={() => this.handleCommentUpdate(record)}>Update</a>
                    </span>
                ),
            },
        ];

        return <Table columns={columns} dataSource={childData} pagination={false}/>;
    };

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Employee Name',
                dataIndex: 'userName',

            },
            {
                title: 'Employee Id',
                dataIndex: 'userId',
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
                title: 'Reason',
                dataIndex: 'reason',
            },
            {
                title: 'Status',
                dataIndex: 'clearanceStatus',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to Approve?" onConfirm={() => this.handleApprove(record)}>
                            <a>Approve</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [],
            childTableData: [],
            count: 2,
            user: this.props.user,
            pendingForManager: {},
        };

    }

    //TODO: handlerApprove and handleReject should take account of error response if any
    handleCommentUpdate = (record) => {
        console.log('Handle Called for ', record);
        let body = record;
        let clearanceId = body.key;
        delete body.key;
        delete body.comment;
        delete body.action;
        updateResignationForManagerClearance(clearanceId, body).then(response => console.log('response'));
    }


    handleApprove = (row) => {
        if (checkPermission(this.state.user, ROLE_MANAGER_IN)) {
            initialApproveResignationByResignationId(row.resignationId).then(() => {
                this.setState(prevState => {
                        return ({
                            dataSource: prevState.dataSource.filter(r => r !== row)
                        });
                    }, () => openNotificationWithIcon("success", "Approved Sucessfully", '', 0.4)
                );
            }).catch(error => {

            });
        }

        const dataSource = [...this.state.dataSource];
        this.setState({dataSource: dataSource.filter(item => item.resignationId !== row.resignationId)});
    };

    componentDidMount() {
        if (checkPermission(this.state.user, ROLE_MANAGER_IN)) {
            getResignationsForManagerClearance().then(response => {
                let data = [];
                let childData = [];
                //let index = 0;
                response.forEach(row => {
                    let body = row.resignationId;
                    body.managerClearanceId = row.managerClearanceId;
                    data.push(body);
                    childData.push({
                        key: row.managerClearanceId,
                        action: 'Handover',
                        comment: row['handOverComment']
                    });
                    childData.push({
                        key: row.managerClearanceId,
                        action: 'License Revoke',
                        comment: row['licenceRevokeComment']
                    })
                    childData.push({
                        key: row.managerClearanceId,
                        action: 'Notice Period Payout Recovery',
                        comment: row['noticePeriodPayoutRecoveryComment']
                    })
                    //index = index + 1;
                });
                this.setState({
                    pendingForManager: data,
                    dataSource: data,
                    childTableData: childData
                });
                //this.setState({dataSource: data});

            }).catch(error => {
                openNotificationWithIcon('error', 'Error', 'Could Not Fetch Team', 2);
            });
        }

    }

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.userId === item.userId);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({dataSource: newData});
    };

    render() {
        const {dataSource} = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                    className='components-table-demo-nested'
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    expandedRowRender={(record) => {
                        const {childTableData} = this.state;
                        console.log(record);
                        let d = childTableData.filter(r => r.key === record.managerClearanceId);
                        return this.expandedRowRender(d);
                    }}
                    scroll={{y: 500}}
                    expandRowByClick={true}
                />
            </div>
        );
    }
}

export default ManagerPendingClearance;