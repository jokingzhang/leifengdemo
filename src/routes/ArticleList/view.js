'use strict';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchArticles} from './actions'

const mapStateToProps = (state) => {
  const articleListData = state.articleList;

  return {
    status: articleListData.status,
    data: articleListData.articles,
  };
}

const mapDispatchToProps = (dispath) => {
  return {
    search: () => {
      dispath(fetchArticles())
    }
  }
};

export class ArticleList extends Component {

    constructor(props) {
        super(props);
        this.state = { articles: props.data || [] };
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data &&
            nextProps.data.length &&
            nextProps.data !== this.props.data) {
            console.info('componentWillReceiveProps==>', nextProps.data);
            console.info('componentWillReceiveProps==>', nextProps.data);

            this.setState({
                articles: nextProps.data
            })
        }
    }

    loadData = () => {
        if (this.props.status === 'loading' || this.props.status === 'failure') {
            this.props.search && this.props.search();
        }
    }

    renderTable() {
        const { articles } = this.state;

        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                      <th>文章标题</th>
                      <th>作者名称</th>
                      <th>发布时间</th>
                    </tr>
                </thead>
                <tbody>
                {
                    articles.map(article => {
                        return (
                            <tr key={article._id}>
                                <td>{article.article_title}</td>
                                <td>{article.article_author}</td>
                                <td>{moment(article.create_time).format("YYYY-MM-DD HH:mm")}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        );
    }

    render() {
        const {status} = this.props;
        return (
            <div>
                <h1>ArticleList</h1>
                {status === 'loading' && '加载中...'}
                {status === 'failure' && '加载失败'}
                {status === 'done' && this.renderTable()}
            </div>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
