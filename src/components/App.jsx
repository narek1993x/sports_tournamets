import React from 'react';
import { Layout } from 'antd';
import TournamentSelector from './TournamentSelector';
import Basket from './Basket';

const { Footer } = Layout;

const App = () => (
  <Layout className="App">
    <TournamentSelector />
    <Basket />
    <Footer style={{ textAlign: 'center' }}>Sports Tournaments ©2019 Created by Narek Khachatryan</Footer>
  </Layout>
);

export default App;
