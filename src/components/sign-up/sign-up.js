import React, { Component } from 'react';

import FormInput from '../../components/form-input/form-input';

import CustomButton from '../../components/custom-button/custom-button';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';


class SignUp extends Component {

    constructor(){
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();    

        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("password dont match");
            return;
        }

        try{
          const {user} = await auth.createUserWithEmailAndPassword(email, password);
          await createUserProfileDocument(user, {displayName})

          this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });

        }catch(error){
          console.log(error);
        }

    }

    handleChange = event => {
        event.preventDefault();

        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    render() {

        const { displayName,email,password,confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h1>I do not have an account</h1>
                <span>SignUp with your email and password</span>

                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                  <FormInput type="text" name="displayName" value={displayName} label="Display Name" onChange={this.handleChange} required/>
                  <FormInput type="email" name="email" value={email} label="Email" onChange={this.handleChange} required/>
                  <FormInput type="password" name="password" value={password} label="Password" onChange={this.handleChange} required/>
                  <FormInput type="password" name="confirmPassword" value={confirmPassword} label="Confirm Password" onChange={this.handleChange} required/>

                  <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;
