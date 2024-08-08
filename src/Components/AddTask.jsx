import React, { useContext } from 'react'
import { useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addTask } from '../Services/allApis';
import { toast } from 'react-toastify';
import { addTaskResponseContext } from '../Context Api/StatusUpdate';

function AddTask() {

    const { addTaskResponse, setAddTaskResponse } = useContext(addTaskResponseContext)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [taskData, setTaskData] = useState({
        taskTitle: "", description: "", date: "", important: false, isCompleted:false
    })
    const toggleImportance = () => {
        setTaskData(prevTask => ({
            ...prevTask,
            important: !prevTask.important,
        }));
    };

    const today = new Date().toISOString().split('T')[0];

    const addATask = async () => {
        const { taskTitle, description, date, important } = taskData
        if (!taskTitle || !description || !date) {
            toast.warning("Provide Complete Data!!")
            // console.log(packageName, state, description, rate, maxGroupSize, image)
        }
        else {
            try {
                const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
                const result = await addTask(taskData,header);
                console.log(result)
                if (result.status === 200) {
                    toast.success('Task Added');
                    setTaskData({
                        taskTitle: "", description: "", date: "", important: false
                    });
                    setAddTaskResponse(result)
                    handleClose()
                } else {
                    toast.error("Something went wrong!!!");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        }
    }
    // console.log(taskData)

    return (
        <>
            <div className='text-center'>
                <h2>Create Your Own Tasks..!</h2>
                <button className='btn btn-primary mb-4' onClick={handleShow}>Create New Task</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Task!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="email" placeholder="Task title" autoFocus onChange={(e) => { setTaskData({ ...taskData, taskTitle: e.target.value }) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder='Describe your task here..' onChange={(e) => { setTaskData({ ...taskData, description: e.target.value }) }} />
                        </Form.Group>
                        <FloatingLabel controlId="floatingInput" label="Due Date" className="mb-2 w-50">
                            <Form.Control type="date" required placeholder="" min={today} onChange={(e) => { setTaskData({ ...taskData, date: e.target.value }) }} />
                        </FloatingLabel>
                        <div className="border" style={{width:'253px'}}>
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
                    <Button variant="primary" onClick={addATask}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTask