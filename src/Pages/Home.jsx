import React, { useState, useEffect, useContext } from 'react'
import Header from '../Components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { allTasks, deleteTask, updateCompletion } from '../Services/allApis'
import AddTask from '../Components/AddTask'
import EditTask from '../Components/EditTask'
import { toast } from 'react-toastify'
import { addTaskResponseContext, editTaskResponseContext } from '../Context Api/StatusUpdate'


function Home() {
    const { addTaskResponse, setAddTaskResponse } = useContext(addTaskResponseContext)
    const { editTaskResponse, setEditTaskResponse } = useContext(editTaskResponseContext)
    const [addStatus, setAddStatus] = useState({})
    const [deleteStatus, setDeleteStatus] = useState({})

    const user = sessionStorage.getItem("username")

    const [logStatus, setLogStatus] = useState(false)
    const [tasks, setTasks] = useState([])

    const [taskData, setTaskData] = useState({
        taskTitle: "", description: "", date: "", important: false, isCompleted: false
    })
    const toggleComplete = async (id, currentStatus) => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const newStatus = !currentStatus;
        const result = await updateCompletion(id, { isCompleted: newStatus }, header)
        if (result.status === 200) {
            setTaskData({
                ...taskData, isCompleted: newStatus
            });
            setAddStatus(result)
        }
        else {
            console.log(result)
            toast.error(result.response.data)
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getData()
            setLogStatus(true)
        }
        else {
            setLogStatus(false)
        }
    }, [addTaskResponse, editTaskResponse, addStatus, deleteStatus])
    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await allTasks(header)
        console.log(result)
        if (result.status == 200) {
            setTasks(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }
    const RemoveTask = async (id) => {

        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await deleteTask(id, header)
        if (result.status == 200) {
            toast.error("One package has been deleted!!")
            setDeleteStatus(result)
        }
        else {
            console.log(result)
            toast.error(result.response.data)
        }
    }
    console.log(taskData)
    return (
        <>
            <Header />

            {/* FIRST SECTION */}

            <Container className=''>
                <div className='m-5 d-flex justify-content-center'>
                    <div style={{ textAlign: 'center' }}>
                        <h1><b>Simplify Your Tasks, <br />
                            <span className=''>Achieve More.</span></b></h1>
                        <h5 className='text-secondary'>Effortlessly manage your work and personal goals in one place.</h5>
                    </div>
                </div>
                <div class="row d-flex flex-wrap justify-content-between mx-5 px-5" style={{ textAlign: 'center' }}>
                    <div class="col-md-2 shadow pt-4 my-5">
                        <p class=""><i>"Focus. Organize. Succeed"</i></p>
                    </div>
                    <div class="col-md-2 shadow pt-4 my-5">
                        <p class="quote"><i>"Effortless Task Mastery."</i></p>
                    </div>
                    <div class="col-md-2 shadow pt-4 my-5">
                        <p class="quote"><i>"Your Day, Perfectly Planned"</i></p>
                    </div>
                    <div class="col-md-2 shadow pt-4 my-5">
                        <p class="quote"><i>"From List to Done"</i></p>
                    </div>
                </div>
                
            </Container>

            {/* SECOND SECTION */}

            {
                !logStatus ?
                <div className='text-center mb-5'>
                    <Link to={'/reg'} className='btn btn-secondary start'>Get Started</Link>
                </div>
                :
                <section>
                    <h1 className='m-5'>Welcome to Task Cloud , <span><b><i>{user}</i></b></span></h1>
                    <AddTask />
                    <Row className='m-0' id='task'>
                        {
                            tasks.length > 0 ?
                                tasks.map((item) => (
                                    <Col sm='5' md='4' lg='4'>
                                        <div className='m-3 shadow p-3'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <h3>{item.taskTitle}</h3>
                                                    {
                                                        item.important && (
                                                            <span className='m-2'><i class="fa-solid fa-thumbtack fa-lg" style={{ color: '#730c21' }}></i></span>
                                                        )}
                                                </div>
                                                <Link to={`/detail/${item._id}`} className='btn mb-2'><i class="fa-solid fa-eye fa-lg" style={{ color: 'rgb(171 180 197)' }}></i></Link>
                                            </div>
                                            <h6 style={{ textAlign: 'justify' }} className='p-3'>
                                                {item.description}
                                            </h6>
                                            <div className='d-flex justify-content-around'>
                                                {
                                                    !item.isCompleted ?
                                                        <button onClick={() => toggleComplete(item._id, item.isCompleted)} className='btn btn-outline-success'>Complete</button>
                                                        :
                                                        <button onClick={() => toggleComplete(item._id, item.isCompleted)} className='btn btn-success'>
                                                            Completed
                                                            <span className='ms-2'><i class="fa-regular fa-square-check" style={{color:'#ffffff'}}></i></span>
                                                        </button>
                                                }
                                                <EditTask task={item} />
                                                <button className='btn btn-danger' onClick={() => { RemoveTask(item?._id) }}>Delete
                                                    <span className="text-light ms-2"><i class="fa-regular fa-trash-can"></i></span>
                                                </button>
                                            </div>
                                        </div>
                                    </Col>

                                ))
                                :
                                <h3>No aded tasks</h3>
                        }
                    </Row>
                </section>
            }
        </>
    )
}

export default Home