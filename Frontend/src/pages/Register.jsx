import React, { useState } from "react"
import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../styles/register.css'
import registerImg from '../assets/images/Plane.png'

const Register = () => {

    const [credentials, setCredentials] = useState({
        name: undefined,
        email: undefined,
        password: undefined,
        surname: undefined,
        gender: undefined,
        birthdate: undefined,
        phone_number: undefined,
        country: undefined,
        province: undefined
    });

    const handleChange = e => {
        setCredentials(prev => ({... prev, [e.target.id]:e.target.value}))
    }
    
    const handleClick = e => {
        e.preventDefault()
    }

    return <section>
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <div className="register_container d-flex align-items-center justify-content-between">

                        <div className="register_form">
                            <h2>Sign up for GoFly!</h2>
                            <h1>Sign up using your email address and password below to get started.</h1>
                            <Form onSubmit={handleClick}>
                            <FormGroup>
                                    <input 
                                    type="text" 
                                    placeholder="Name" 
                                    required id="name" 
                                    onChange={handleChange}/>
                                    <input 
                                    type="text" 
                                    placeholder="Surname" 
                                    required id="surname" 
                                    onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                    type="email" 
                                    placeholder="Email" 
                                    required id="email" 
                                    onChange={handleChange}/>
                                    <input 
                                    type="password" 
                                    placeholder="Password" 
                                    required id="password" 
                                    onChange={handleChange}/>   
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                    type="text" 
                                    placeholder="Gender" 
                                    required id="gender" 
                                    onChange={handleChange}/>
                                    <input 
                                    type="text" 
                                    placeholder="Birthdate" 
                                    required id="birthdate" 
                                    onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                    type="text" 
                                    placeholder="Country"
                                    required id="country"
                                    onChange={handleChange}/>
                                    <input 
                                    type="text" 
                                    placeholder="Province" 
                                    required id="province" 
                                    onChange={handleChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <input 
                                    type="number" 
                                    placeholder="Phone Number" 
                                    required id="phone_number"
                                    onChange={handleChange}/>
                                </FormGroup>
                                <label class="checkbox">
                                    <input type="checkbox" />
                                    <span>I agree to the terms and conditions</span>
                                </label>
                                <Button className="auth_btn btn secondary_btn" type="submit">Sign Up</Button>
                            </Form>
                            <p>Already Have an Account? <Link to='/login'>Sign In!</Link></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default Register;