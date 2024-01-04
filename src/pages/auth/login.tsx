import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface input_props {
    handleSuccessfulAuth: Function,

}

export const WrapperLogin = (props:input_props) => {
    const navigate = useNavigate();
    return <Login handleSuccessfulAuth={props.handleSuccessfulAuth} navigate={navigate} />
}

interface input_props2 {
    handleSuccessfulAuth: Function,
    navigate: Function

}

interface reg_props {
    email: string,
    password: string,
    RegistrationErrors: string,
}

class Login extends Component<input_props2, reg_props> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            RegistrationErrors: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        

    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post("http://localhost:3001/sessions", {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }, { withCredentials: true })
        .then(res => {
            // console.log('login res', res)
            this.props.handleSuccessfulAuth(res.data)
            this.props.navigate('/dashboard', {replace: true})
            window.location.reload()
            
        })
        .catch(error => console.log("login error", error))

    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        this.setState({
            ...this.state, [event.target.name]: event.target.value
        })
    }
    render(): React.ReactNode {
        return (<div>
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" required />
                <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>)
    }
}

