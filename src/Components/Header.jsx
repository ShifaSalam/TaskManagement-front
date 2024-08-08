import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {

    const [token, setToken] = useState("")

    useEffect(() => {
        setToken(sessionStorage.getItem('token'))
    }, [])

    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('userDetails')
        navigate('/')
        window.location.reload();
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <a class="navbar-brand d-flex" href="#">
                        <img src="https://cdn2.iconfinder.com/data/icons/project-management-181/64/assign-task-manager-company-1024.png" alt="Health Care Clinic Logo" width="50" />
                        <div class="header ms-2">
                            <span className=''>TASK</span>
                            <div className='ms-5'>CLOUD</div>
                        </div>
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse ms-5 ps-5" id="navbarNav">
                        <ul class="navbar-nav mx-5 px-5">
                            <li class="nav-item me-4">
                                <Link className="nav-link" to={'/'}>Home</Link>
                            </li>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Tasks"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#task">All Tasks</NavDropdown.Item>
                                <NavDropdown.Item><Link to={'/completed'} className='text-decoration-none text-light'>Completed Tasks</Link></NavDropdown.Item>
                            </NavDropdown>
                        </ul>

                        <div className='ms-auto'>
                            {
                                token ?
                                    <button className='btn btn-outline-danger' onClick={handleLogout}>
                                        <i className="fa-solid fa-right-from-bracket" />
                                        Logout
                                    </button>
                                    :

                                    <div>
                                        <Link className='btn btn-outline btn-log me-3' to={'/login'}>Log In</Link>
                                        <Link className='btn btn-outline btn-reg' to={'/reg'}>Sign Up</Link>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header