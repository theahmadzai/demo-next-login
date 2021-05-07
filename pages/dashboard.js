import React from 'react'
import Layout from '../components/layout'
import { UserRoute, useAuth } from '../contexts/auth'

function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <Layout>
      <div className="w-2/5 my-10 mx-auto shadow-sm p-10">
        <p className="mb-10">
          <strong>User:</strong> {user.username}
        </p>
        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Layout>
  )
}

export default UserRoute(Dashboard)
