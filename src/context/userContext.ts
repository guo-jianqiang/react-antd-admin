/** @format */

import React from 'react'

interface userInterface {
  name: string
  auth: number
  token: string
}

export default React.createContext<userInterface | null>(null)
