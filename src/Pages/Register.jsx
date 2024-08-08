import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userRegister } from '../Services/allApis'

function Register() {

    const navigate = useNavigate()

    // to disable register button until the check box is clicked
    const [isChecked, setIsChecked] = useState(false)
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked)
    }

    // form validation
    const [isTouched1, setIsTouched1] = useState(false)
    const handleBlur1 = () => {
        setIsTouched1(true)
    }
    const [isTouched2, setIsTouched2] = useState(false)
    const handleBlur2 = () => {
        setIsTouched2(true)
    }

    // to check email validation
    const [isEmailValid, setIsEmailValid] = useState(false);
    const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;

    // to check password validation
    const [isPassValid, setIsPassValid] = useState(false);
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // to store user data
    const [data, setData] = useState({
        username: "", password: "", email: ""
    })

    const handleRegister = async () => {
        const { username, password, email } = data
        if (!username || !password || !email) {
            toast.warning("Provide complete data!!!")
        }
        else {
            const result = await userRegister(data)
            // console.log(result)
            if (result.status == 201) {
                toast.success("User Registration Successfull")
                setData({ username: "", password: "", email: "" })
                navigate('/login')
            }
            else {
                toast.error(result.response.data)
            }
        }
        // console.log(data)
    }

    return (
        <>
            <section class="register">
                <div class="container py-4">
                    <div class="row d-flex justify-content-center mt-2">
                        <Col md='5' >
                            <div class="card" style={{ borderRadius: '1rem' }}>
                                <div class="row g-0">
                                    <div class=" login-side">
                                        <div class="logo my-5 d-flex justify-content-center">
                                            <img src="https://cdn2.iconfinder.com/data/icons/project-management-181/64/assign-task-manager-company-1024.png"
                                                height="90px" alt="logo-registration" />
                                        </div>
                                        <div class="px-4">
                                            <form>
                                                <div class="form-floating mb-3">
                                                    <input type="text" class="form-control" required id="floatingInput1" placeholder="Full Name" onChange={(e) => { setData({ ...data, username: e.target.value }) }} />
                                                    <label for="floatingInput">Full Name</label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <input type="email" class="form-control" required id="floatingInput2" placeholder="name@example.com"
                                                        onChange={(e) => { setData({ ...data, email: e.target.value }), setIsEmailValid(emailRegex.test(e.target.value)) }}
                                                        onBlur={handleBlur1} style={{ borderColor: !isEmailValid && isTouched1 && 'red' }} />
                                                    <label for="floatingPassword">Email Adress</label>
                                                    {!isEmailValid && isTouched1 && (
                                                        <div style={{ color: 'red', marginTop: '5px' }}>
                                                            Please enter a valid email address.
                                                        </div>
                                                    )}
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <input type="password" class="form-control" required maxLength={8} id="floatingInput3" placeholder="Password"
                                                        onChange={(e) => { setData({ ...data, password: e.target.value }), setIsPassValid(passRegex.test(e.target.value)) }}
                                                        onBlur={handleBlur2} style={{ borderColor: !isPassValid && isTouched2 && 'red' }} />
                                                    <label for="floatingInput">Password</label>
                                                    {!isPassValid && isTouched2 && (
                                                        <div style={{ color: 'red', marginTop: '5px' }}>
                                                            Please enter a valid Password.
                                                        </div>
                                                    )}
                                                </div>
                                                <div class="form-check d-flex justify-content-center mb-4">
                                                    <input class="form-check-input me-2" type="checkbox" checked={isChecked}
                                                        onChange={handleCheckboxChange} id="form2Example3cg" />
                                                    <label class="form-check-label" for="form2Example3g">
                                                        I agree all statements in <span>
                                                            <a href="#" className='text-dark'>Terms of service</a>
                                                        </span>
                                                    </label>
                                                </div>

                                                <div class="d-flex justify-content-center">
                                                    <button type="button" disabled={!isChecked || !isEmailValid || !isPassValid} data-mdb-ripple-init class="btn btn-dark btn-lg" onClick={handleRegister}>Register</button>
                                                </div>

                                                <p class="text-center mt-2">Already have an account?
                                                    <Link to={'/login'} className='ms-1 text-dark'>Login here</Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register