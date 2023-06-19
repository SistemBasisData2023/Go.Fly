import React, { useState } from "react"
import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/login.css'
import loginImg from '../assets/images/Plane.png'
import axios from "axios";

const Login = () => {

    const [credentials, setCredentials] = useState({
        email:undefined,
        password:undefined
    });

    const navigate = useNavigate();
    const handleChange = e => {
        setCredentials(prev => ({... prev, [e.target.id]:e.target.value}))
    }
    
    const handleClick = e => {
        e.preventDefault()
    }

    async function handleLogin() {
        try {
            console.log(credentials);
            const body = {
                email: credentials.email,
                password: credentials.password
            }

            const {data} = await axios.post(
                "http://localhost:3000/account/login",
                body
            );
            console.log(data);
            console.log("Login successful!");
            alert("Login Successful!");
            // Extract user and store it in localStorage
            localStorage.setItem("user", JSON.stringify(data));
            // Extract user_id and store it in localStorage
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("isadmin", data.isadmin);
            localStorage.setItem("surname", data.surname);
            
            if (data.isadmin) {
                navigate("/admin");
            } else {
                navigate("/flight");
                
            }
        } catch (error) {
            console.log(error);
            // Handle login failure
            alert("Check your username or email!");
            console.error("Login failed:", error.message);
        }
      }

    return <section>
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <div className="login_container d-flex align-items-center justify-content-between">
                        <div className="login_img">
                            <img src={loginImg} alt=""/>
                        </div>
                        <div className="login_form">
                            <h2>Sign in for GoFly!</h2>
                            <h1>Sign in using your email address and password below to get started.</h1>
                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input type="email" placeholder="Email" required id="email" onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <input type="password" placeholder="Password" required id="password" onChange={handleChange}/>
                                </FormGroup>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>I agree to the terms and conditions</span>
                                </label>
                                    <Button className="auth_btn btn secondary_btn" type="submit" onClick={handleLogin}>Login</Button>
                            </Form>
                            <p>Don’t Have an Account? <Link to='/register'>Sign Up!</Link></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default Login;