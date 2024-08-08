import React, { useState, createContext, useEffect } from 'react'


export const TokenAuthContext = createContext()

function AuthContext({ children }) {

    const [authStatus, setAuthStatus] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setAuthStatus(true)
        }
        else {
            setAuthStatus(false)
        }
    }, [])

    return (
        <>
            <TokenAuthContext.Provider value={{ authStatus, setAuthStatus }}>
                {children}
            </TokenAuthContext.Provider>
        </>
    )
}

export default AuthContext