import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './pages/Home/homePage';
import ShopPage from './pages/shop/shopPage';
import Header from './components/header/header';
import SignInAndSignUp from './pages/SignInAndSignUp/sign-in-and-sign-up';
import {auth} from './firebase/firebase.utils';


class App extends Component{

  constructor(){
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({
        currentUser: user
      });

      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUp}/>
        </Switch>
      </div>
    );
  }  
}

export default App;
