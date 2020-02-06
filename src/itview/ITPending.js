import React from 'react';
import {Form, Input, Popconfirm, Table} from 'antd';
import {
    checkPermission,
    getResignationForAdmin,
    getResignationForFinance,
    getResignationForHr,
    getResignationForMgr,
    openNotificationWithIcon,
    updateResignationStatus
} from "../utils/APIUtils";

const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({editing}, () => {
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

class ITPending extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
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
                onClick: this.toggleEdit
            },
            {
                title: 'Reject',
                dataIndex: 'operationreject',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to reject?" onConfirm={() => this.handleReject(record.key, record)}>
                            <a>Reject</a>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: 'Approve',
                dataIndex: 'operationapprove',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to Approve?" onConfirm={() => this.handleApprove(record.key, record)}>
                            <a>Approve</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            dataSource: [],
            count: 2,
            user: this.props.user,
            pendingForManager: {}
        };

    }


    componentDidMount() {
        if (checkPermission(this.state.user, 'ROLE_MANAGER')) {
            getResignationForMgr().then(response => {
                this.setState({pendingForManager: response});
                this.setState({dataSource: response});
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_ADMIN')) {
            getResignationForAdmin().then(response => {
                this.setState({pendingForManager: response});
                this.setState({dataSource: response});
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_FINANCE')) {
            getResignationForFinance().then(response => {
                this.setState({pendingForManager: response});
                this.setState({dataSource: response});
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_HR')) {
            getResignationForHr().then(response => {
                this.setState({pendingForManager: response});
                this.setState({dataSource: response});
            }).catch(error => {

            });
        }

    }

    handleApprove = (key, row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        let request = {
            resignationId: key,
            status: 'APPROVE',
            approverId: this.state.user.id,
            comment: item.comment
        }
        //console.log(request);
        if (checkPermission(this.state.user, 'ROLE_MANAGER')) {
            request.dept = "MANAGER"
            updateResignationStatus(request).then(response => {
                openNotificationWithIcon("success", "APPROVED Sucessfully")
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_ADMIN')) {
            request.dept = "ADMIN"
            updateResignationStatus(request).then(response => {
                openNotificationWithIcon("success", "APPROVED Sucessfully")
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_FINANCE')) {
            request.dept = "FINANCE"
            updateResignationStatus(request).then(response => {
                openNotificationWithIcon("success", "APPROVED Sucessfully")
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_HR')) {
            request.dept = "HR"
            updateResignationStatus(request).then(response => {
                openNotificationWithIcon("success", "APPROVED Sucessfully")
            }).catch(error => {

            });
        }
        const dataSource = [...this.state.dataSource];
        this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    };

    handleReject = (key, row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        let request = {
            resignationId: key,
            status: 'REJECT',
            approverId: this.state.user.id,
            comment: item.comment
        }

        if (checkPermission(this.state.user, 'ROLE_MANAGER')) {
            request.dept = "MANAGER"
            updateResignationStatus(request).then(response => {
                openNotificationWithIcon("success", "Rejected Sucessfully")
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_ADMIN')) {
            request.dept = "ADMIN"
            updateResignationStatus(request).then(response => {
                openNotificationWithIcon("success", "Rejected Sucessfully")
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_FINANCE')) {
            request.dept = "FINANCE"
            updateResignationStatus(request).then(response => {
                openNotificationWithIcon("success", "Rejected Sucessfully")
            }).catch(error => {

            });
        }
        if (checkPermission(this.state.user, 'ROLE_HR')) {
            request.dept = "HR"
            updateResignationStatus(request).then(response => {
                openNotificationWithIcon("success", "Rejected Sucessfully")
            }).catch(error => {

            });
        }

        const dataSource = [...this.state.dataSource];
        this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
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
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

export default ITPending;