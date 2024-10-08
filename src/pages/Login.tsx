import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login, guestLogin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError('登录失败，请检查用户名和密码')
    }
  }

  const handleGuestLogin = async () => {
    try {
      await guestLogin()
      navigate('/')
    } catch (err) {
      setError('游客登录失败，请稍后重试')
    }
  }

  return (
    <div className="minecraft-panel mt-10 max-w-md mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-minecraft-green">Login</h2>
      {error && <p className="text-minecraft-red mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 text-xl">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-xl">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded text-white"
            required
          />
        </div>
        <button type="submit" className="minecraft-btn bg-minecraft-green text-white py-2 rounded hover:bg-green-600 w-full text-xl">
          Login
        </button>
      </form>
      <button onClick={handleGuestLogin} className="minecraft-btn bg-gray-600 text-white py-2 rounded hover:bg-gray-500 w-full mt-4 text-xl">
        Guest Login
      </button>
      <p className="mt-4 text-center text-xl">
        Don't have an account? <Link to="/register" className="text-minecraft-blue hover:underline">Register</Link>
      </p>
    </div>
  )
}

export default Login