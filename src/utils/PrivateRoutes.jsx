import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAccount } from '../hooks/useAccount'

function PrivateRoutes() {
    const {isConnect, role} = useAccount()

    console.log("connection---->",isConnect , role)

    const auth ={ 'token': true}

    return (
    auth.token ? <Outlet/> : <Navigate to="/" />
  )
}

export default PrivateRoutes