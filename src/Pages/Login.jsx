import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../Services/allApis'
import { toast } from 'react-toastify'
import { TokenAuthContext } from '../Context Api/AuthContext'

function Login() {

    const { authStatus, setAuthStatus } = useContext(TokenAuthContext)

    const navigate = useNavigate()

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

    // to store login data
    const [data, setData] = useState({
        password: "", email: ""
    })

    const handleLogin = async () => {
        const { email, password } = data
        if (!email || !password) {
            toast.warning("Provide complete Data!")
        }
        else {
            const result = await userLogin({ email, password })
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.existingUser.username)
                sessionStorage.setItem("userDetails", JSON.stringify(result.data.existingUser))
                toast.success("Welcome to Task Cloud")
                setAuthStatus(true)
                navigate('/')
            }
            else {
                toast.error(result.response.data)
            }
        }
        console.log(data)
    }

    return (
        <>
            <div class="login p-5 d-flex justify-content-center">
                <div class=" d-flex m-5 p-5 justify-content-center align-items-center">
                    <div class="card" style={{ borderRadius: '1rem' }}>
                        <div class="card-body">
                            <div class="logo mb-3 d-flex justify-content-center">
                                <img src="https://cdn2.iconfinder.com/data/icons/project-management-181/64/assign-task-manager-company-1024.png"
                                    height="90px" alt="" />
                            </div>
                            <form>
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

                                <div class="d-flex justify-content-center my-4">
                                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block"
                                        type="button" disabled={!isEmailValid || !isPassValid} onClick={handleLogin}>Login</button>
                                </div>
                                <p class="mb-5 ">Don't have an account? <Link to={'/reg'} className='text-secondary'><b>Register here</b></Link>
                                </p>
                                <a href="#!" class="small text-muted">Terms of use.</a>
                                <a href="#!" class="small text-muted">Privacy policy</a>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login