import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import SiderMenu from './SiderMenu';
import routes from 'jscom/routes/config';
import './sidercustom.less';

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
                {
                    !this.state.collapsed ?
                        <div className="c-sider__logo" /> :
                        <div className="c-sider__logo c-sider__logo--small" />
                }
                <SiderMenu
                    menus={routes.menus}
                    theme="dark"
                    mode="inline"
                    inlineCollapsed={this.state.collapsed}
                />
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);