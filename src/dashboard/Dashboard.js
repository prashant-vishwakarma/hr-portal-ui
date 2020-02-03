import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {Col, Dropdown, Icon, Layout, Menu, message, Row} from "antd";
import UserInfo from "../employeeview/UserInfo";
import ApplyResignation from "../employeeview/ApplyResignation";
import ResignationStatus from "../employeeview/ResignationStatus";
import ManagerPending from '../managerview/ManagerPending';
import ManagerApproved from "../managerview/ManagerApproved";
import ManagerRejected from "../managerview/ManagerRejected";
import PageNotFound from "../PageNotFound";
import FeedbackForm from '../employeeview/FeedbackForm';
import {ACCESS_TOKEN} from '../globalConstants';
import {checkPermission, checkResigned} from "../utils/APIUtils";
import logo from '../login/logo.svg';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            user: this.props.user,
        };
    }

    logout = (redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") => {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({user: {}});
        window.location = '/';
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1" onClick={this.logout}>
                <Icon type="poweroff"/>
                Logout
            </Menu.Item>
        </Menu>
    );

    handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    render() {
        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <Header>
                        <Row theme='dark' type="flex" justify="start">
                            <Col align='left' span={8}><img src={logo} height='100px'/></Col>
                            <Col span={4} offset={12}>
                                <div>
                                    <div id="components-dropdown-demo-dropdown-button">
                                        <Dropdown.Button
                                            overlay={this.menu}
                                            icon={<Icon type="user"/>}
                                            style={{marginLeft: 16, verticalAlign: 'middle'}}>
                                            <div onClick={() => window.open("http://localhost:3000", "_self")}>{this.state.user.name}</div>
                                        </Dropdown.Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} width={210}>
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className='option1'>
                                <SubMenu
                                    key="sub1"
                                    disabled={!checkPermission(this.state.user, 'IN_USER')}
                                    title={
                                        <span>
                                        <Icon type="user"/>
                                        <span>{this.state.user.name.split(' ')[0] + ' ' + this.state.user.name.split(' ')[1].charAt(0)}</span>
                                    </span>
                                    }
                                >
                                    <Menu.Item key="1"><Link to="/">My Details</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/applyResignation">Resignation</Link></Menu.Item>
                                    <Menu.Item key="3" disabled={!checkResigned()}><Link to="/resignationStatus">Resignation Status</Link></Menu.Item>
                                    <Menu.Item key="4" disabled={!checkResigned()}><Link to="/exitform">Exit Interview</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    disabled={!checkPermission(this.state.user, 'IN_MANAGER')}
                                    title={
                                        <span>
                                        <Icon type="team"/>
                                        <span>My Team</span>
                                    </span>
                                    }
                                >
                                    <Menu.Item key="5"><Link to="/awaitingMe">Pending Approval</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/approved">Approved Requests</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/rejected">Rejected Resignations</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    disabled={!(checkPermission(this.state.user, 'IN_HR') ||
                                        checkPermission(this.state.user, 'IN_ADMIN') ||
                                        checkPermission(this.state.user, 'IN_FINANCE') || checkPermission(this.state.user, 'IN_IT'))
                                    }
                                    title={
                                        <span>
                                        <Icon type="team"/>
                                        <span>Department Approval</span>
                                    </span>
                                    }
                                >
                                    <Menu.Item key="8"><Link to="/awaitingMe">Awaiting Approval</Link></Menu.Item>
                                    <Menu.Item key="9"><Link to="/approved">Approved Resignation</Link></Menu.Item>
                                    <Menu.Item key="10"><Link to="/rejected">Rejected Resignation</Link></Menu.Item>
                                </SubMenu>
                                <Menu.Item key="11">
                                    <Icon type="file"/>
                                    <span>File</span>
                                </Menu.Item>
                                <SubMenu
                                    key="sub4"
                                    disabled={!(checkPermission(this.state.user, 'IN_HR') ||
                                        checkPermission(this.state.user, 'IN_ADMIN') ||
                                        checkPermission(this.state.user, 'IN_FINANCE'))
                                    }
                                    title={
                                        <span>
                                        <Icon type="bar-chart"/>
                                        <span>REPORT</span>
                                    </span>
                                    }
                                >
                                    <Menu.Item key="12"><Link> Resignation Status</Link></Menu.Item>
                                    <Menu.Item key="13"><Link>Resignation Analysis</Link></Menu.Item>
                                    <Menu.Item key="14"><Link>Release Experience Letter</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content style={{margin: '0 16px'}}>
                                {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                                {/*    <Breadcrumb.Item>My View </Breadcrumb.Item>*/}
                                {/*    <Breadcrumb.Item>My Info</Breadcrumb.Item>*/}
                                {/*</Breadcrumb>*/}
                                <div style={{padding: 24, background: '#fff', height: '100%'}}>
                                    <Switch>
                                        <Route exact path="/" render={(props) => (
                                            <UserInfo user={this.state.user}/>
                                        )}/>
                                        <Route exact path="/userinfo" render={(props) => (
                                            <UserInfo user={this.state.user}/>
                                        )}/>
                                        <Route exact path="/applyResignation" render={(props) => (
                                            <ApplyResignation user={this.state.user}/>
                                        )}/>
                                        <Route exact path="/applyResignation" render={(props) => (
                                            <ResignationStatus user={this.state.user}/>
                                        )}/>
                                        <Route exact path="/resignationStatus" render={(props) => (
                                            <ResignationStatus user={this.state.user}/>
                                        )}/>
                                        <Route exact path="/awaitingMe" render={(props) => (
                                            <ManagerPending user={this.state.user}/>
                                        )}/>
                                        <Route exact path="/approved" render={(props) => (
                                            <ManagerApproved user={this.state.user}/>
                                        )}/>
                                        <Route exact path="/rejected" render={(props) => (
                                            <ManagerRejected user={this.state.user}/>
                                        )}/>
                                        <Route exact path="/exitform" render={(props) => (
                                            <FeedbackForm user={this.state.user}/>
                                        )}/>
                                        <Route component={PageNotFound}/>
                                    </Switch>
                                </div>
                            </Content>
                            <Footer style={{textAlign: 'center'}}>Mediaocean Employee Resignation Portal ©2019 Created by Terminator</Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}