import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './pages/Home/homePage';
import ShopPage from './pages/shop/shopPage';



function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/hats' component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
