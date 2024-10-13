import { useContext } from 'react'
import { AccountContext } from '../utils/AccountContext'

export const useAccount = () => useContext(AccountContext)
