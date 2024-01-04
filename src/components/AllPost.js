import { useQuery } from '@apollo/client';
import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GET_ALL_POST } from '../gqloperation/queries';

const AllPost = ({ pName }) => {

    const { loading, error, data } = useQuery(GET_ALL_POST,
        {
            fetchPolicy : "cache-and-network"
        }
    )

    return (
        <>
            {loading ? <h4>Loading...</h4>
                : error ? console.log(error)
                    :
                    data.posts.map(userPost => {
                        return (
                            <Col md={6} lg={4} className="my-2" key={Math.random().toString(36)}>
                                <Card>
                                    <Card.Body>
                                        <Link to={`/profile/${userPost.by._id}`}>

                                            {
                                                userPost.by.name === pName ? "You"
                                                    : `Name : ${userPost.by.name}`
                                            }

                                        </Link>

                                        <Card.Text>
                                            Post : {userPost.post}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
            }
        </>
    );
};

export default AllPost;