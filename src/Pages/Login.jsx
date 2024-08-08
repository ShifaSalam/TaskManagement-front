import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../Services/allApis'
import { toast } from 'react-toastify'

function Login() {

    const navigate = useNavigate()
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
            console.log(result)
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.existingUser.username)
                sessionStorage.setItem("userDetails", JSON.stringify(result.data.existingUser))
                toast.success("Welcome to Task Cloud")
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
                                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                    <label for="floatingPassword">Password</label>
                                </div>

                                <div class="d-flex justify-content-center my-4">
                                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block"
                                        type="button" onClick={handleLogin}>Login</button>
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