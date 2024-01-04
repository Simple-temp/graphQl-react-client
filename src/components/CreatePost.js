import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { CREATE_POST } from '../gqloperation/mutation';

const CreatePost = () => {

    const [post, setPost] = useState("")
    const [createPost, { loading, error, data }] = useMutation(CREATE_POST)

    const handleSubmit = (e) => {
        createPost({
            variables: {
                post: post
            }
        })
        e.preventDefault(e)
        console.log(post)
        window.location.reload()
    }

    if(data){
        console.log(data.userpost)
    }

    return (
        <div className='container mt-5'>
            <div className="page-title mt-4">
                <h5 className='mx-auto my-5 text-center text-secondary'>Create Post</h5>
            </div>
            <Col md={6} className="mx-auto">
                {
                    loading && <h4>Loading...</h4>
                }
                {
                    error && <Alert variant="danger">{error.message}</Alert>
                }
                {
                    data && <Alert variant="success">{data.userpost}</Alert>
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter your text</Form.Label>
                        <Form.Control
                            type="text"
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="outline-dark" type="submit">
                        Create post
                    </Button>
                </Form>
            </Col>
        </div>
    );
};

export default CreatePost;