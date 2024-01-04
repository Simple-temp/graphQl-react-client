import { useQuery } from '@apollo/client';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { GET_MY_PROFILE } from '../gqloperation/queries';


const Navbar = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const { loading, error, data } = useQuery(GET_MY_PROFILE)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/profile">
                    GraphQl-App
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            token
                                ? <>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/feed" className="nav-link">Post Feed</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/createpost" className="nav-link">Create New Post</Link>
                                    </li>
                                    <Button
                                        variant='outline-danger'
                                        onClick={() => {
                                            localStorage.removeItem("token")
                                            navigate("/")
                                        }}
                                    >
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </Button>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/signup" className="nav-link">Sign up</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;