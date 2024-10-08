import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/auth'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('密码不匹配')
      return
    }

    try {
      console.log('尝试注册:', { username, password: '***' });
      const response = await register(username, password)
      console.log('注册响应:', response);
      navigate('/login')
    } catch (err) {
      console.error('注册错误:', err)
      setError(err instanceof Error ? err.message : '注册失败，请稍后重试')
    }
  }

  return (
    <div className="minecraft-panel mt-10 max-w-md mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-minecraft-green">Register</h2>
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
        <div>
          <label htmlFor="confirmPassword" className="block mb-1 text-xl">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border-2 border-gray-600 rounded text-white"
            required
          />
        </div>
        <button type="submit" className="minecraft-btn bg-minecraft-green text-white py-2 rounded hover:bg-green-600 w-full text-xl">
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-xl">
        Already have an account? <Link to="/login" className="text-minecraft-blue hover:underline">Login</Link>
      </p>
    </div>
  )
}

export default Register