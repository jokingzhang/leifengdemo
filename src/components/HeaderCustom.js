import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import routes from 'jscom/routes/config';

import './headercustom.less';

const { Header } = Layout;

export class HeaderCustom extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    render() {
        const { match, location, history } = this.props;

        // console.info('location==>', location.pathname, routes.titles);

        return (
            <Header className="c-header">
                <h3> {routes.titles[location.pathname] || 'Demo'} </h3>
            </Header>
        )
    }
}

export default withRouter(HeaderCustom);