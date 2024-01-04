import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UPDATE_POST } from '../gqloperation/mutation';
import { GET_POST_BY_ID } from '../gqloperation/queries';

const PostUpdatePage = () => {

    const params = useParams()
    const { id } = params
    const [UpdatePost] = useMutation(UPDATE_POST)
    const [updateBox, setupdateBox] = useState(true)
    const [post, setPost] = useState("")

    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: {
            postId: id
        },

    })

    console.log(data)

    const handleSubmit = (e) => {
        e.preventDefault(e)
        console.log(post)
        UpdatePost({
            variables: {
                Update: {
                    _id : id,
                    post
                }
            }
        })
        toast.success("Update Successfully")
        window.location.reload()
    }

    return (
        <div className='container'>
            <Row>
                <Col md={7} className="mt-3">
                    <Card>
                        {
                            loading ? <h4>Loading...</h4>
                                : error ? console.log(error)
                                    : <span className='mt-3 ms-3'>{data.postById.post}</span>
                        }
                        {
                            updateBox ? <Card.Body>
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
                                    <Button type='submit' variant="outline-danger mt-1 ms-2 ms-auto" >
                                        <i className="fa-solid fa-wrench"></i>
                                    </Button>
                                </Form>
                            </Card.Body> : null
                        }
                        <Button variant="outline-danger d-block ms-auto m-2" onClick={() => setupdateBox(!updateBox)}>
                            {
                                !updateBox ? <i className="fa-solid fa-angles-down"></i>
                                    : <i className="fa-solid fa-angles-up"></i>
                            }
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PostUpdatePage;