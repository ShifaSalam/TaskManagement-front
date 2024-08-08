import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <footer className='mt-5 bg-light shadow'>
                <Container>
                    <Row>
                        <Col lg='5'>
                            <div>
                                <h2 className='mt-5 text-center'>Task Cloud</h2>
                                <p style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus culpa nihil
                                    animi repellat, eaque commodi nisi blanditiis.
                                </p>

                                <div className="d-flex align-items-center gap-4">
                                    <span>
                                        <a href='https://www.youtube.com/' target='_blank'>
                                            <i className="fa-brands fa-youtube" style={{ color: "#000000" }}></i>
                                        </a>
                                    </span>
                                    <span>
                                        <a href='https://github.com' target='_blank'>
                                            <i className="fa-brands fa-github" style={{ color: "#000000" }}></i>
                                        </a>
                                    </span>
                                    <span>
                                        <a href='https://www.facebook.com/' target='_blank'>
                                            <i className="fa-brands fa-square-facebook" style={{ color: "#000000" }}></i>
                                        </a>
                                    </span>
                                    <span>
                                        <a href='https://www.instagram.com/' target='_blank'>
                                            <i className="fa-brands fa-instagram" style={{ color: "#000000" }}></i>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </Col>

                        <Col lg='4' className='p-5'>
                            <h5>Discover</h5>
                            <ListGroup className=''>
                                <Link className='text-decoration-none text-dark py-3' to={'/'}>Home</Link>
                                <Link className='text-decoration-none text-dark'>About</Link>
                            </ListGroup>
                        </Col>

                        <Col lg='3' className='p-5'>
                            <h5>Quick Links</h5>
                            <ListGroup className=''>
                                <Link className='text-decoration-none text-dark py-3' to={'/'}>Tasks</Link>
                                <Link className='text-decoration-none text-dark' to={'/login'}>Login</Link>
                                <Link className='text-decoration-none text-dark pt-3' to={'/reg'}>Register</Link>
                            </ListGroup>
                        </Col>

                        <Col lg='12' className='text-center pt-5'>
                            <p className='copyright'>&copy; 2024, designed and developed by Fathima Shifa. </p>
                        </Col>

                    </Row>
                </Container>
            </footer>
        </>
    )
}

export default Footer