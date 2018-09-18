export default {
    menus: [ // 菜单相关路由
        {
            key: '/account',
            title: '管理账户',
            icon: 'credit-card',
            subs: [{
                key: '/account/view',
                title: '账户概览',
                component: 'AccountView'
            }, {
                key: '/account/setting',
                title: '账户设置',
                component: 'AccountSetting'
            }],
        }, {
            key: '/user',
            title: '管理用户',
            icon: 'user',
            subs: [{
                key: '/user/permission',
                title: '管理用户权限',
                component: 'UserPermission'
            }, {
                key: '/user/safe',
                title: '用户安全设置',
                component: 'UserSafe'
            }],
        }, {
            key: '/bill',
            title: '账单报告',
            icon: 'stock',
            subs: [{
                key: '/bill/activity',
                title: '活动报表',
                component: 'BillActivity'
            }],
        }, {
            key: '/cash',
            title: '头寸资金',
            icon: 'wallet',
            subs: [{
                key: '/cash/history',
                title: '转账历史',
                component: 'CashHistory'
            }, {
                key: '/cash/position',
                title: '头寸转账',
                component: 'CashPosition'
            }, {
                key: '/cash/funds',
                title: '资金转账',
                component: 'CashFunds'
            }],
        }
    ],
    titles: {
        '/account': '管理账户',
        '/account/view': '账户概览',
        '/account/setting': '账户设置',
        '/user': '管理用户',
        '/user/permission': '管理用户权限',
        '/user/safe': '用户安全设置',
        '/bill': '账单报告',
        '/bill/activity': '活动报表',
        '/cash': '头寸资金',
        '/cash/history': '转账历史',
        '/cash/position': '头寸转账',
        '/cash/funds': '资金转账',
    },
    others: [] // 非菜单相关路由
}
