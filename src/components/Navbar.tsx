import React from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, User } from 'lucide-react'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 bg-opacity-80 text-white p-4 border-b-4 border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold flex items-center text-minecraft-green">
          <Gamepad2 className="mr-2" />
          Little Shock Game Center
        </Link>
        <div>
          <Link to="/login" className="minecraft-btn bg-minecraft-green hover:bg-green-600 flex items-center">
            <User className="mr-1" />
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar