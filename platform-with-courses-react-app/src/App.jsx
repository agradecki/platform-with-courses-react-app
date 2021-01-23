import React from "react";

import { HashRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";
import AsideMenu from "./components/AsideMenu/AsideMenu";

import StoreProvider from "./store/StoreProvider";

import "./App.scss";

const App = () => (
  <StoreProvider>
    <Header />
    <Router>
      <div className="contentWrapper"></div>
      <AsideMenu />
    </Router>
  </StoreProvider>
);

export default App;
