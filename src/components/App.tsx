import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import Employee from './employee';
// import Setting from './setting';
// import './App.css'

const {Header, Content, Footer} = Layout;


const App = ( { match }: any) => {
    const defaultKey = match.url.replace('/', '') || 'employee';
    return <ConfigProvider locale={ zh_CN }>
        <Layout>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={ [defaultKey] }
                    className="menu"
                >
                    <Menu.Item key="employee"><Link to="employee">员工管理</Link></Menu.Item>
                    <Menu.Item key="setting"><Link to="setting">系统设置</Link></Menu.Item>
                </Menu>
            </Header>
            <Content>
                <div className="content">
                    <Route path="/" exact component={ Employee }></Route>
                    <Route path="/employee" exact component={ Employee }></Route>
                    {/* <Route path="/Setting" exact component={ Setting }></Route> */} 
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    </ConfigProvider>
}

export default App;