import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DELETE_USER, UPDATE_USER } from '../gqloperation/mutation';
import { GET_MY_PROFILE } from '../gqloperation/queries';
import Posts from './Posts';

const Profile = () => {

    const { loading, error, data } = useQuery(GET_MY_PROFILE)
    const [updateBox, setupdateBox] = useState(false)
    const [formData, setFormData] = useState({})
    const [deleteuser] = useMutation(DELETE_USER)
    const [updateUser] = useMutation(UPDATE_USER)

    const navigate = useNavigate()
    if (!localStorage.getItem("token")) {
        navigate("/")
    }
    // console.log(data)

    const delUser = (id) => {
        console.log(id)
        deleteuser({
            variables: {
                userId: id
            }
        })
        toast.success("Delete user Successfully")
        navigate("/")
    }

    const delAlert = () => {
        toast.error("Please delete your all post")
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(e)
        console.log(formData)
        updateUser({
            variables : {
                Update : {
                    _id : data.myprofile._id,
                    ...formData
                }
            }
        })
        toast.success("Update profile Successfully")
        window.location.reload()
    }

    return (
        <div className='container mt-5'>
            <Row>
                {
                    loading ? <h4>Loading...</h4>
                        : error ? console.log(error)
                            : <>
                                <Col md={4} className="mx-auto mt-5">
                                    <Card>
                                        <Card.Img variant="top" src={`https://robohash.org/${data.myprofile.name}.png`} className='img-fluid w-25 mx-auto' />
                                        <Card.Body>
                                            <Card.Title>Name: {data.myprofile.name}</Card.Title>
                                            <Card.Text>
                                                <strong>Gmail:</strong> {data.myprofile.email}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Website:</strong> {data.myprofile.website}
                                            </Card.Text>
                                            {
                                                data.myprofile.posts.length === 0 ? <Button variant="outline-danger mt-5" onClick={() => delUser(data.myprofile._id)}>
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </Button> : <Button variant="outline-danger mt-5" onClick={delAlert}>
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </Button>
                                            }
                                        </Card.Body>
                                        {
                                            updateBox ?
                                                <Form onSubmit={(e) => handleSubmit(e)} className="px-2">
                                                    <Form.Group className="mb-3" controlId="formBasicName">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="name"
                                                            required
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            required
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            name="password"
                                                            required
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicWebsite">
                                                        <Form.Label>Website</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="website"
                                                            required
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </Form.Group>

                                                    <Button variant="outline-danger my-2" type="submit">
                                                        Update profile
                                                    </Button>
                                                </Form> : null
                                        }
                                        <Button variant="outline-danger" onClick={() => setupdateBox(!updateBox)}>
                                            {
                                                !updateBox ? <i className="fa-solid fa-pen-to-square"></i>
                                                    : <i className="fa-solid fa-xmark"></i>
                                            }
                                        </Button>
                                    </Card>
                                </Col>
                                <Col md={8}>
                                    <Row>
                                        <Posts />
                                    </Row>
                                </Col>
                            </>
                }
            </Row>
        </div>
    );
};

export default Profile;

//key={Math.random().toString(36)}