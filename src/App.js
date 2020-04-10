import React, { Component } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';
import HomePage from './pages/Home/homePage';
import ShopPage from './pages/shop/shopPage';
import Checkout from './pages/checkout/checkout';
import Header from './components/header/header';
import SignInAndSignUp from './pages/SignInAndSignUp/sign-in-and-sign-up';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/users/user.action';

import {selectCurrentUser} from './redux/users/user.selectors';



class App extends Component{


  unsubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {

          setCurrentUser({
            id: snapShot.id,
              ...snapShot.data()
          });         
       });
      }
      setCurrentUser(userAuth);
    });   
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp/>)}/>
          <Route exact path='/checkout' component={Checkout}/>
        </Switch>
      </div>
    );
  }  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
