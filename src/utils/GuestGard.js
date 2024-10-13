// ** React Imports
import { useAccount } from '../hooks/useAccount'
import Login from '../pages/Login'


const GuestGuard = props => {
  const { children, fallback  } = props
  const account = useAccount()
  if (account.loading ) {
    return fallback
  }

  
  if (!account.isConnect) {
    return <Login/>
  }

  return <>{children}</>
}

export default GuestGuard
