import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { view as Home } from './Home';
import { view as ArticleList } from './ArticleList';
import { view as CardPage } from './CardPage';
import config from './config';
import { view as AccountView } from './AccountView';
import { view as AccountSetting } from './AccountSetting';
import { view as BillActivity } from './BillActivity';
import { view as CashHistory } from './CashHistory';
import { view as CashPosition } from './CashPosition';
import { view as CashFunds } from './CashFunds';
import { view as UserPermission } from './UserPermission';
import { view as UserSafe } from './UserSafe';

const NotFound = props => (
    <h1>not found</h1>
);

const AllComponent = {
    AccountView,
    AccountSetting,
    BillActivity,
    CashHistory,
    CashPosition,
    CashFunds,
    UserPermission,
    UserSafe,
}

export default class Routes extends Component {
    renderRoutes = () => {
        let result = [];
        if (config.menus && config.menus.length) {
            config.menus.forEach((menuItem) => {
                if (menuItem && menuItem.subs) {
                    menuItem.subs.forEach((subItem) => {
                        result.push(<Route key={subItem.key} path={subItem.key} title={subItem.title} component={AllComponent[subItem.component] || null} />);
                    })
                }
            })
            return result;
        } else {
            return null;
        }
    }
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/articles" component={ArticleList} />
                <Route path="/cardpage" component={CardPage} />

                { this.renderRoutes() }

                {/* when none of the above match, <NotFound> will be rendered */}
                <Route component={NotFound} />
            </Switch>
        )
    }
}