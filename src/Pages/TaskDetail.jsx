import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { singleTask } from '../Services/allApis'
import Badge from 'react-bootstrap/Badge';


function TaskDetail() {

    // to store task data
    const [task, setTask] = useState([])

    // Task id from path parameter
    const { tid } = useParams()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await singleTask(tid, header)
        if (result.status == 200) {
            setTask(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }

    // console.log(task)

    return (
        <>
            <Header />
            <Container>
                <Row className='d-flex justify-content-around'>
                    <Col className='me-5'>
                        <img src="https://vignette.wikia.nocookie.net/bindingofisaac/images/b/b6/Todo.png/revision/latest?cb=20130325190035&path-prefix=de" height={'300px'} alt="details-img" />
                    </Col>
                    <Col className='m-5 shadow p-5 border d-flex justify-content-between'>
                        <div>
                            <h3>{task.taskTitle}</h3>
                            <h6>{task.description}</h6>
                            <h6 className='mt-5'>Due On : {new Date(task.date).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}</h6>
                        </div>
                        {
                            task.important &&
                            <div>
                                <Badge bg="danger" className='py-2'>Important!</Badge>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TaskDetail