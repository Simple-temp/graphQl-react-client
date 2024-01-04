import { useQuery } from '@apollo/client';
import React from 'react';
import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GET_ANOTHER_PROFILE } from '../gqloperation/queries';

const OtherUserProfile = () => {

    const params = useParams()
    const { userid } = params
    console.log(userid)
    const { loading, error, data } = useQuery(GET_ANOTHER_PROFILE, {
        variables: {
            userId: userid
        },

    },
        {
            fetchPolicy: "cache-and-network"
        }
    )

    console.log(data)

    return (
        <div className='container mt-5'>
            <Row>
                {
                    loading ? <h4>Loading...</h4>
                        : error ? console.log(error)
                            : <>
                                <Col md={4} className="mx-auto mt-5">
                                    <Card>
                                        <Card.Img variant="top" src={`https://robohash.org/${data.user.name}.png`} className='img-fluid w-25 mx-auto' />
                                        <Card.Body>
                                            <Card.Title>Name: {data.user.name}</Card.Title>
                                            <Card.Text>
                                                <strong>Gmail:</strong> {data.user.email}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Website:</strong> {data.user.website}
                                            </Card.Text>
                                            {/* <Button variant="outline-danger">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </Button> */}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={8}>
                                    <Row>
                                        <>
                                            {
                                                data.user.posts.length === 0 && <Alert variant="info">You don't have have any post</Alert>
                                            }
                                            <h5 className='text-center mt-4 text-capitalize'>
                                                {data.user._id === data.user.posts.by ? null : data.user.name} Posts ({data.user.posts.length})
                                            </h5>
                                            {loading ? <h4>Loading...</h4>
                                                : error ? console.log(error)
                                                    :
                                                    data.user.posts.map(userPost => {
                                                        return (
                                                            <Col md={6} lg={4} className="my-2" key={Math.random().toString(36)}>
                                                                <Card>
                                                                    <Card.Body>
                                                                        <span className='d-block'> Post : {userPost.post} </span>
                                                                        {/* {
                                                                            userid === userPost.by ? <Button variant="outline-danger mt-3">
                                                                                <i className="fa-solid fa-trash-can"></i>
                                                                            </Button> : null 
                                                                        } */}
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        )
                                                    })
                                            }
                                        </>
                                    </Row>
                                </Col>
                            </>
                }
            </Row>
        </div>
    );
};

export default OtherUserProfile;

//key={Math.random().toString(36)}