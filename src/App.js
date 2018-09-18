import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Routes from './routes';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class App extends Component {
    state = {
        collapsed: false,
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SiderCustom />
                <Layout>
                    <HeaderCustom />
                    <Content className="c-layout__content">
                        <Routes />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Power by Tiger Trade
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}