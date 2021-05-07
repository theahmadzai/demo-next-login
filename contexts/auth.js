import React, { useState, useEffect, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import api from '../utils/api'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem('token')
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`
        const { data: user } = await api.get('whoami')
        if (user) setUser(user)
      }
      setLoading(false)
    })()
  }, [])

  const login = async (username, password) => {
    try {
      const { data: token } = await api.post('login', { username, password })
      if (token) {
        localStorage.setItem('token', token.token)
        api.defaults.headers.Authorization = `Bearer ${token.token}`
        const { data: user } = await api.get('whoami')
        setUser(user)
      }
    } catch (err) {
      setError('Invalid login credentials')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.Authorization
    setUser(null)
    window.location.pathname = '/login'
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, error, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const GuestRoute = Component => () => {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()

  if (loading) return <div>Loading...{loading}</div>
  if (isLoggedIn) router.push('/dashboard')

  return <Component />
}

export const UserRoute = Component => () => {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()

  if (loading) return <div>Loading...</div>
  if (!isLoggedIn) router.push('/login')

  return <Component />
}
