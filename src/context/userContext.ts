/** @format */

import React from 'react'
import {UserInterface} from '../lib/userData'

interface UserContextInterface<T> {
  userData: T | null
  setUserData: (data: T) => void
}

const userContext = React.createContext<UserContextInterface<UserInterface> | null>(null)

export default userContext
