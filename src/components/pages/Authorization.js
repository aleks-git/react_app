import React, { Component } from 'react';
import bindAllMethods from "react-bind-all-methods";


class Auth extends Component {

    constructor(props){
        super(props);
        this.state = {login: '', password: '', error: ''};
        bindAllMethods(MapContainer)(this);
    }

    handleChange(event){
        let value = event.target.value;
        let name = event.target.name;
        this.setState({[name]: value});
    }


    handleSubmit(event){
        event.preventDefault();

        let error = '';
        if(this._isNameValid(this.state.login) && this._isPasswordValid(this.state.password)){
            this.setState({error: ''});
            console.log('Success authtorization!');
        }
        else {
            this.setState({error: 'You should fill correctly all fields.'});
            return false;
        }

    }

    _isNameValid(name){
        if(name === '') return false;
        return true;
    }

    _isPasswordValid(password){
        if(password === '') return false;
        return true;
    }

    render() {
        return (
            <div>
                <form className="authForm" action="" method="post" onSubmit={this.handleSubmit}>
                    <div className="fieldBlock">
                        <div>Логин</div>
                        <input type="text" name="login" onChange={this.handleChange} error="поле не может быть пучтым" value={this.state.login} />
                    </div>
                    <div className="fieldBlock">
                        <div>Пароль</div>
                        <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    </div>
                    <div className="errorMessage">{this.state.error}</div>
                    <button>Sign In</button>
                </form>
            </div>
        )
    }

}

export default Auth;