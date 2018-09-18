import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem = item => (    // item.route 菜单单独跳转的路由
    <Menu.Item
        key={item.key}
    >
        <Link to={item.route || item.key}>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = item => (
    <Menu.SubMenu
        key={item.key}
        title={
            <span>
                {item.icon && <Icon type={item.icon} />}
                <span className="nav-text">{item.title}</span>
            </span>
        }
    >
        {item.subs.map(subItem => renderMenuItem(subItem))}
    </Menu.SubMenu>
);

export default class HeaderCustom extends PureComponent {
    static propTypes = {
        menus: PropTypes.array.isRequired,
    }
    render() {
        return (
            <Menu {...this.props}>
                {this.props.menus && this.props.menus.map((item) =>
                    (item.subs ? renderSubMenu(item) : renderMenuItem(item))
                )}
            </Menu>
        )
    }
}