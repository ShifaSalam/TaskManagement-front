import React, { createContext, useState } from 'react'


export const addTaskResponseContext = createContext()
export const editTaskResponseContext = createContext()
export const completeTaskResponseContext = createContext()

function StatusUpdate({ children }) {
    const [addTaskResponse, setAddTaskResponse] = useState("")
    const [editTaskResponse, setEditTaskResponse] = useState("")
    const [completeTaskResponse, setCompleteTaskResponse] = useState("")
    return (
        <>
            <addTaskResponseContext.Provider value={{ addTaskResponse, setAddTaskResponse }}>
                <editTaskResponseContext.Provider value={{ editTaskResponse, setEditTaskResponse }}>
                    <completeTaskResponseContext.Provider value={{ completeTaskResponse, setCompleteTaskResponse }}>
                        {children}
                    </completeTaskResponseContext.Provider>
                </editTaskResponseContext.Provider>
            </addTaskResponseContext.Provider>

        </>
    )
}

export default StatusUpdate