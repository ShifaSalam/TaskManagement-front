import React, { useState, useContext } from 'react'
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addTask, editTask } from '../Services/allApis';
import { toast } from 'react-toastify';
import { editTaskResponseContext } from '../Context Api/StatusUpdate';

function EditTask({ task }) {
    const { editTaskResponse, setEditTaskResponse } = useContext(editTaskResponseContext)    //for component reloading immediately after edit

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // formatting date to get the date into the form field
    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const [taskData, setTaskData] = useState({
        id: task._id, taskTitle: task.taskTitle, description: task.description, date: formatDate(task.date), important: task.important
    })

    // to toggle importance button
    const toggleImportance = () => {
        setTaskData(prevTask => ({
            ...prevTask,
            important: !prevTask.important,
        }));
    };

    // to disable dates before current date
    const today = new Date().toISOString().split('T')[0];

    const updateTask = async () => {
        const { id, taskTitle, description, date, important } = taskData
        if (!taskTitle || !description || !date) {
            toast.warning("Provide Complete Data!!")
        }
        else {
            const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
            const result = await editTask(taskData.id, taskData, header)
            // console.log(result)
            if (result.status == 200) {
                toast.success(`Task Updated Successfully!`)
                setEditTaskResponse(result)
                handleClose()
            }
            else {
                toast.error(result.response.data)
            }
        }
    }

    return (
        <>
            <button className='btn btn-secondary' onClick={handleShow}>Edit
                <span className='text-light ms-2'><i class="fa-solid fa-pen fa-sm"></i></span>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="email" placeholder="Task title" value={taskData.taskTitle} onChange={(e) => { setTaskData({ ...taskData, taskTitle: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder='Describe your task here..' value={taskData.description} onChange={(e) => { setTaskData({ ...taskData, description: e.target.value }) }} />
                        </Form.Group>
                        <FloatingLabel controlId="floatingInput" label="Due Date" className="mb-2 w-50">
                            <Form.Control type="date" required placeholder="" min={today} value={taskData.date} onChange={(e) => { setTaskData({ ...taskData, date: e.target.value }) }} />
                        </FloatingLabel>
                        <div className="border" style={{ width: '253px' }}>
                            <button type="button" onClick={() => toggleImportance(true)} className={taskData.important ? 'btn btn-danger' : 'btn btn-outline-danger'}>
                                Important
                            </button>
                            <button type="button" onClick={() => toggleImportance(false)} className={!taskData.important ? 'btn btn-secondary' : 'btn btn-outline-secondary'}>
                                Not Important
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={updateTask}>
                        Update Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditTask