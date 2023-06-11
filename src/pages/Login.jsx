import React, { useState } from "react"
import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../styles/login.css'
import loginImg from '../assets/images/Plane.png'

const Login = () => {

    const [credentials, setCredentials] = useState({
        email:undefined,
        password:undefined
    });

    const handleChange = e => {
        setCredentials(prev => ({... prev, [e.target.id]:e.target.value}))
    }
    
    const handleClick = e => {
        e.preventDefault()
    }

    function myFunction() {
        alert("Login Successful!");
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
                                <Link to="/flight">
                                    <Button className="auth_btn btn secondary_btn" type="submit" onClick={myFunction} onChange={handleChange}>Login</Button>
                                </Link>
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