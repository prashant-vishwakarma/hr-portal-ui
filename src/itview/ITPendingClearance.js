import React from 'react';
import {Badge, Dropdown, Form, Icon, Input, Menu, Popconfirm, Table} from 'antd';
import {
    checkPermission,
    getResignationsForITClearance,
    initialApproveResignationByResignationId,
    openNotificationWithIcon,
    rejectResignationByResignationId
} from "../utils/APIUtils";
import {ROLE_IT_IN, ROLE_MANAGER_IN} from "../globalConstants";

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


class ITPendingClearance extends React.Component {

    expandedRowRender = (childData) => {
        const columns = [
            {title: 'Action', dataIndex: 'action', key: 'action'},
            {title: 'Description', dataIndex: 'desc', key: 'desc'},
            {
                title: 'Status',
                key: 'state',
                render: () => (
                    <span>
            <Badge status="error"/>
            Pending
          </span>
                ),
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <span className="table-operation">
            <a>Approve</a>
            <Dropdown overlay={menu}>
              <a style={{marginLeft: '20px'}}>
                More <Icon type="down"/>
              </a>
            </Dropdown>
          </span>
                ),
            },
        ];

        //const data = [];
        // for (let i = 0; i < 3; ++i) {
        //     data.push({
        //         key: i,
        //         date: '2014-12-24 23:12:00',
        //         name: 'This is production name',
        //         upgradeNum: 'Upgraded: 56',
        //     });
        // }

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
                editable: true,
                width: '20%',
                onClick: this.toggleEdit
            },
            {
                title: 'Reject',
                dataIndex: 'operationreject',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to reject?" onConfirm={() => this.handleReject(record)}>
                            <a>Reject</a>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: 'Approve',
                dataIndex: 'operationapprove',
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
            pendingForManager: {}
        };

    }

    //TODO: handlerApprove and handleReject should take account of error response if any
    handleReject = (row) => {
        if (checkPermission(this.state.user, ROLE_MANAGER_IN)) {
            rejectResignationByResignationId(row.resignationId).then(() => {
                this.setState(prevState => {
                        return ({
                            dataSource: prevState.dataSource.filter(r => r !== row)
                        });
                    }, () => openNotificationWithIcon("success", "Rejected Sucessfully", '', 0.4)
                );
            }).catch(error => {
                openNotificationWithIcon("error", "Failed to Reject", "Call to the Server Failed", 1);
            });
        }
    };

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
        if (checkPermission(this.state.user, ROLE_IT_IN)) {
            getResignationsForITClearance().then(response => {
                let data = [];
                let childData = [];
                //let index = 0;
                response.forEach(row => {
                    let body = row.resignationId;
                    body.clearanceId = row.clearanceId;
                    data.push(body);
                    childData.push({
                        key: row.clearanceId,
                        action: 'JIRA',
                        desc: 'Revoke JIRA Access'
                    });
                    childData.push({
                        key: row.clearanceId,
                        action: 'Accessories',
                        desc: 'Recovery of Items'
                    });
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
                        let d = childTableData.filter(r => r.key === record.clearanceId);
                        return this.expandedRowRender(d);
                    }}
                    scroll={{y: 600}}
                />
            </div>
        );
    }
}

export default ITPendingClearance;