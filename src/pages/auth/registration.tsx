import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLoggedInStatus } from "../../store";

interface input_props {
    handleSuccessfulAuth: Function,

}

export const Wrapper = (props:input_props) => {
    const navigate = useNavigate();
    // const dispatch = useDispatch()
    return <Registration handleSuccessfulAuth={props.handleSuccessfulAuth} navigate={navigate} />
}

interface input_props2 {
    handleSuccessfulAuth: Function,
    navigate: Function

}

interface reg_props {
    email: string,
    password: string,
    password_confirmation: string,
    RegistrationErrors: string,
}

class Registration extends Component<input_props2, reg_props> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            RegistrationErrors: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.handleSuccessAuth = this.handleSuccessAuth.bind(this)
        

    }

    // handleSuccessAuth = (data: object) => {
    //     this.props.dispatch(setUser({user: data}))
    //     this.props.dispatch(setLoggedInStatus({loggedInStatusValue: "user logged in" }))
    // }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post("http://localhost:3001/registrations", {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password
            }
        }, { withCredentials: true })
        .then(res => {
            this.props.handleSuccessfulAuth(res.data)
            this.props.navigate('/dashboard', {replace: true})
            
        })
        
        .catch(error => console.log("there is an error", error))

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
                <input type="password" name="password_confirmation" onChange={this.handleChange} value={this.state.password_confirmation} placeholder="Confirm Password" required />
                <button type="submit">Register</button>
            </form>
        </div>)
    }
}

