'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Divider, Tag, Button } from 'antd';
import moment from 'moment';
import { fetchAccounts } from './actions'

const mapStateToProps = (state) => {
  const accountListData = state.accountList;

  return {
    status: accountListData.status,
    data: accountListData.accounts,
  };
}

const mapDispatchToProps = (dispath) => {
  return {
    search: () => {
      dispath(fetchAccounts())
    }
  }
};

const columns = [{
    title: '账户号',
    dataIndex: 'accountNumber',
    key: 'accountNumber',
}, {
    title: '账户名',
    dataIndex: 'accountName',
    key: 'accountName',
}, {
    title: '账户别名',
    dataIndex: 'accountAlias',
    key: 'accountAlias',
}, {
    title: '账户类型',
    dataIndex: 'accountType',
    key: 'accountType',
}, {
    title: '从属账户',
    dataIndex: 'slaveAccount',
    key: 'slaveAccount',
    render: slaveAccount => (
        <span>
            {slaveAccount || '--'}
        </span>
    ),
}, {
    title: '开户状态',
    dataIndex: 'accountStatus',
    key: 'accountStatus',
    render: accountStatus => (
        <span>
            {accountStatus ? '已开户' : '未开户'}
        </span>
    ),
}, {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    render: option => (
        <span>
            <Button> 查看详情 </Button>
        </span>
    ),
}];

export class AccountList extends Component {

    static propTypes = {
        status: PropTypes.string.isRequired,
        data: PropTypes.array,
        search: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = { accountList: props.data || [] };
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data &&
            nextProps.data.length &&
            nextProps.data !== this.props.data) {

            this.setState({
                accountList: nextProps.data
            })
        }
    }

    loadData = () => {
        if (this.props.status === 'loading' || this.props.status === 'failure') {
            this.props.search && this.props.search();
        }
    }

    renderTable() {
        const { accountList } = this.state;

        return (
            <Table
                columns={columns}
                dataSource={accountList}
                pagination={false}
            />
        );
    }

    render() {
        const { status } = this.props;
        return (
            <div>
                {status === 'loading' && '加载中...'}
                {status === 'failure' && '加载失败'}
                {status === 'done' && this.renderTable()}
            </div>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
