'use client'
// The entry of the app

import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function App() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      redirect('/vehicle')
    } else {
      redirect('/login')
    }
  }, [])
}
