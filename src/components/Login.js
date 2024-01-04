import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SIGN_IN_USER } from '../gqloperation/mutation';

const Login = () => {

    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const [signInuser, { loading, error, data }] = useMutation(SIGN_IN_USER,{
        onCompleted (data){
            localStorage.setItem("token", data.user.token)
            navigate("/profile")
            window.location.reload()
        }
    })


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(e)
        console.log(formData)
        signInuser({
            variables: {
                newUserSignIn: formData
            }
        })
    }

    return (
        <div className='container mt-5'>
            <div className="page-title mt-4">
                <h5 className='mx-auto my-5 text-center text-secondary'>Login</h5>
            </div>
            <Col md={6} className="mx-auto">
                {
                    loading && <h4>Loading...</h4>
                }
                {
                    error && <Alert variant="danger">{error.message}</Alert>
                }
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </Form.Group>
                    <p>Don't have any account? <Link to="/signup">Sign up</Link></p>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Col>
        </div>
    );
};

export default Login;