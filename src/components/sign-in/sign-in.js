import React, { Component } from 'react';

import {signInWithGoogle} from '../../firebase/firebase.utils'

import FormInput from '../../components/form-input/form-input';

import CustomButton from '../../components/custom-button/custom-button';

import './sign-in.styles.scss';



class SignIn extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }


    handleSubmit = event => {
       event.preventDefault();

       this.setState({email: '', password: ''})
    }

    handleChange = event => {
        event.preventDefault();

        const {value, name} = event.target;
 
        this.setState({[name] : value})
     }

    render() {
        return (
            <div className="sign-in">
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" label="Email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                    
                    <FormInput type="password" label="Password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                    
                    <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>SignIn with Google</CustomButton>
                    </div>
                    
                </form>
                
            </div>
        )
    }
}

export default SignIn;
