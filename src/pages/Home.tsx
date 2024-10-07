import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="text-center minecraft-panel mt-10 max-w-2xl mx-auto">
      <h1 className="text-5xl font-bold mb-4 text-minecraft-green">Welcome to Little Shock Game Center</h1>
      <p className="mb-8 text-xl">Here, you can experience various fun mini-games, create an account to save your game records, or play as a guest.</p>
      <Link to="/games" className="minecraft-btn bg-minecraft-blue text-white px-6 py-2 text-2xl hover:bg-blue-600 inline-block">
        Start Playing
      </Link>
    </div>
  )
}

export default Home