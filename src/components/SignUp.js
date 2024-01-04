import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SIGN_UP_USER } from '../gqloperation/mutation';

const SignUp = () => {

    const [formData, setFormData] = useState({})
    const [signupUser,{loading, error, data}] = useMutation(SIGN_UP_USER)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(e)
        console.log(formData)
        signupUser({
            variables : {
                newUser : formData
            }
        })
    }

    return (
        <div className='container mt-5'>
            <div className="page-title mt-4">
                <h5 className='mx-auto my-5 text-center text-secondary'>Sign up</h5>
            </div>
            <Col md={6} className="mx-auto">
                {
                    loading && <h4>Loading...</h4>
                }
                {
                    error && <Alert variant="danger">This user already exits</Alert>
                }
                {
                    data && data.user && <Alert variant="success">Welcome {data.user.name}..please login your account</Alert>
                }
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </Form.Group>

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

                    <Form.Group className="mb-3" controlId="formBasicWebsite">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Website Link"
                            name="website"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </Form.Group>

                    <p>Already have an account? <Link to="/">Login</Link></p>

                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>
                </Form>
            </Col>
        </div>
    );
};

export default SignUp;