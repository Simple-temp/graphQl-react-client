import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Alert, Button, Card, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DELETE_POST } from '../gqloperation/mutation';
import { GET_MY_PROFILE } from '../gqloperation/queries';

const Posts = () => {

    const { loading, error, data } = useQuery(GET_MY_PROFILE)
    const [delPost] = useMutation(DELETE_POST)

    const deletePost = (id) => {
        console.log(id)
        delPost({
            variables: {
                userId: id
            }
        })
        toast.success("Delete Successfully")
        window.location.reload()
    }

    return (
        <>
            {
                data.myprofile.posts.length === 0 ? <Alert variant="info">You don't have any post</Alert> : null
            }
            <h5 className='text-center mt-4'>Your Posts ({data.myprofile.posts.length})</h5>
            {loading ? <h4>Loading...</h4>
                : error ? console.log(error)
                    :
                    data.myprofile.posts.map(userPost => {
                        return (
                            <Col md={6} lg={4} className="my-2" key={Math.random().toString(36)}>
                                <Card>
                                    <Card.Body>
                                        <span className='d-block'> Post : {userPost.post} </span>
                                        <Button variant="outline-danger mt-3" onClick={() => deletePost(userPost._id)} >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </Button>
                                        <Link to={`/postupdate/${userPost._id}`}>
                                            <Button variant="outline-danger mt-3 ms-2">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
            }
        </>
    );
};

export default Posts;