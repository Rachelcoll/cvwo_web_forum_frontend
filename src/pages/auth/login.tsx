import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "react-bootstrap";

interface input_props {
    handleSuccessfulAuth: Function,

}

export const WrapperLogin = (props: input_props) => {
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
                this.props.navigate('/dashboard', { replace: true })
                window.location.reload()

            })
            .catch(error => console.log("login error", error))

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
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </div>
                <Button type="submit">Login</Button>
            </Box>
        </div>
        )
    }
}

