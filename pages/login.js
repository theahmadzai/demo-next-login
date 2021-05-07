import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth, GuestRoute } from '../contexts/auth'
import Layout from '../components/layout'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { user, error, login } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    await login(username, password)

    if (user) {
      router.push('/dashboard')
    }
  }

  return (
    <Layout>
      <form action="#" method="post" className="w-2/5 my-10 mx-auto">
        <div className="grid grid-cols-2 gap-8 p-8 shadow-md overflow-hidden sm:rounded-md">
          <div>{error ?? ''}</div>
          <div className="col-span-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              <span className="text-red-600">*</span> Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              placeholder="Username"
              required
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              <span className="text-red-600">*</span> Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export default GuestRoute(Login)
