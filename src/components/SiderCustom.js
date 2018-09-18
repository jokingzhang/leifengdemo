import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export class SiderCustom extends Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/">
                            <Icon type="home" theme="outlined" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/articles">
                            <Icon type="book" theme="outlined" />
                            <span>Articles</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span>User</span></span>}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="team" /><span>Team</span></span>}
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Link to="/cardpage">
                            <Icon type="file" />
                            <span>File</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);