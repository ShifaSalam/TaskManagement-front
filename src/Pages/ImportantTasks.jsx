import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteTask, importantTask } from '../Services/allApis'
import { toast } from 'react-toastify'
import { updateCompletion } from '../Services/allApis'

function ImportantTasks() {

    const [deleteStatus, setDeleteStatus] = useState({})  //for immediate updation when a task is deleted
    const [addStatus, setAddStatus] = useState({})   // for immediate update when a task completion updated

    const [logStatus, setLogStatus] = useState(false)
    const [tasks, setTasks] = useState([])

    const [taskData, setTaskData] = useState({
        taskTitle: "", description: "", date: "", important: false, isCompleted: false
    })

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getData()
        }
    }, [deleteStatus, addStatus])

    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await importantTask(header)
        console.log(result)
        if (result.status == 200) {
            setTasks(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }

    // to toggle completion button
    const toggleComplete = async (id, currentStatus) => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const newStatus = !currentStatus;
        const result = await updateCompletion(id, { isCompleted: newStatus }, header)
        if (result.status === 200) {
            setTaskData({
                ...taskData, isCompleted: newStatus
            })
            setAddStatus(result)
        }
        else {
            console.log(result)
            toast.error(result.response.data)
        }
    }

    const RemoveTask = async (id) => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await deleteTask(id, header)
        if (result.status == 200) {
            toast.error("One Task has been deleted!!")
            setDeleteStatus(result)
        }
        else {
            // console.log(result)
            toast.error(result.response.data)
        }
    }
    return (
        <>
            <Header />
            <div className='m-4'>
                <h2 className='text-center border-bottom pb-2 mb-4'><i>Important Tasks</i></h2>
                <Row className='m-0'>
                    {
                        tasks.length > 0 ?
                            tasks.map((item) => (
                                <Col sm='5' md='4' lg='4'>
                                    <div className='m-3 shadow p-3 h-100' >
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
                                            {`${item.description.slice(0, 100)}...`}
                                        </h6>
                                        <div className='d-flex flex-sm-wrap justify-content-around'>
                                            {
                                                !item.isCompleted ?
                                                    <button onClick={() => toggleComplete(item._id, item.isCompleted)} className='btn btn-outline-success'>Complete</button>
                                                    :
                                                    <button onClick={() => toggleComplete(item._id, item.isCompleted)} className='btn btn-success mb-3'>
                                                        Completed
                                                        <span className='ms-2'><i class="fa-regular fa-square-check" style={{ color: '#ffffff' }}></i></span>
                                                    </button>
                                            }
                                            <button className='btn btn-secondary mb-3' onClick={() => { RemoveTask(item?._id) }}>Delete
                                                <span className="text-light ms-2"><i class="fa-regular fa-trash-can"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                </Col>

                            ))
                            :
                            <h3 className='text-warning'>There is No Important Tasks yet!</h3>
                    }
                </Row>
            </div>
        </>
    )
}

export default ImportantTasks