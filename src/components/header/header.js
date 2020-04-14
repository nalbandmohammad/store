import React from 'react';

import {connect} from 'react-redux';

//import {Link} from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

import {auth} from '../../firebase/firebase.utils';

import {selectCurrentUser} from '../../redux/users/user.selectors';

import {selectCartHidden} from '../../redux/cart/cart.selectors'

import {ReactComponent as Logo} from '../../assets/crown.svg';

//import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import {HeaderContainer, LogoContainer, OptionsContainer, OptionsLink } from './header.styles'

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/"><Logo className="logo"/></LogoContainer>

        <OptionsContainer>
        <OptionsLink to="/shop">SHOP</OptionsLink>
        <OptionsLink to="/contactus">CONTACT US</OptionsLink>
        {
            currentUser ? 
            <OptionsLink as='div' onClick={() => auth.signOut()}>Sign Out</OptionsLink> :
            <OptionsLink to='/signin'>
             SignIn
            </OptionsLink>
        }
        <CartIcon/>
        </OptionsContainer>

        {hidden ? null : <CartDropdown/>}

    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});


export default connect(mapStateToProps)(Header);
