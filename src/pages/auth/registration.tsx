import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLoggedInStatus } from "../../store";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "react-bootstrap";

interface input_props {
    handleSuccessfulAuth: Function,

}

export const Wrapper = (props: input_props) => {
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
                this.props.navigate('/dashboard', { replace: true })

            })

            .catch(error => console.log("there is an error", error))

    }

    render(): React.ReactNode {
        return (<div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={this.handleSubmit}
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <TextField
                        required
                        id="outlined-password-input"
                        label="Password Confirmation"
                        type="password"
                        value={this.state.password_confirmation}
                        onChange={e => this.setState({ password_confirmation: e.target.value })}
                    />
                </div>
                <Button type="submit">Register</Button>
            </Box>
        </div>)
    }
}

