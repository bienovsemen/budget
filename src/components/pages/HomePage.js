import React from 'react';
import { Layout } from 'antd';
import BudgetHeader from '../BudgetHeader';
import CategoriesList from '../CategoriesList';
import CreateItem from '../CreateItem';
import Charts from '../Charts';
import CategoriesInfoTable from '../CategoriesInfoTable';

const { Content, Sider, Header } = Layout;

const HomePage = () => {
  return (
    <div>
      <Header className="header">
        <div className="container">
          <BudgetHeader />
        </div>
      </Header>
      <Layout>
        <Sider width={360}>
          <CategoriesList />
        </Sider>
        <Layout style={{ padding: '0 0 0 24px' }}>
          <Content>
            <CreateItem />
            <CategoriesInfoTable />
            <Charts />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomePage;
