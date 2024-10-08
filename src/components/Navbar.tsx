import React from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 bg-opacity-80 text-white p-4 border-b-4 border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold flex items-center text-minecraft-green">
          <Gamepad2 className="mr-2" />
          Little Shock Game Center
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <span className="mr-4 text-xl">{user.username}</span>
              <button
                onClick={logout}
                className="minecraft-btn bg-minecraft-red hover:bg-red-600 flex items-center"
              >
                <LogOut className="mr-1" />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="minecraft-btn bg-minecraft-green hover:bg-green-600 flex items-center">
              <User className="mr-1" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar