import React, { useState, useEffect, useContext } from 'react'
import Header from '../Components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { allTasks, completedTask, deleteTask, updateCompletion } from '../Services/allApis'
import AddTask from '../Components/AddTask'
import EditTask from '../Components/EditTask'
import { toast } from 'react-toastify'
import { addTaskResponseContext, editTaskResponseContext } from '../Context Api/StatusUpdate'

function CompletedTasks() {
    const [deleteStatus, setDeleteStatus] = useState({})
    const [logStatus, setLogStatus] = useState(false)
    const [tasks, setTasks] = useState([])


    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getData()
            setLogStatus(true)
        }
        else {
            setLogStatus(false)
        }
    }, [deleteStatus])
    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await completedTask(header)
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

    return (
        <>
        <Header/>
            <div className='m-4'>
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
                                                        <button onClick={() => toggleComplete(item._id, item.isCompleted)} className='btn btn-success'>
                                                            Completed
                                                            <span className='ms-2'><i class="fa-regular fa-square-check" style={{color:'#ffffff'}}></i></span>
                                                        </button>
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
            </div>
        </>
    )
}

export default CompletedTasks