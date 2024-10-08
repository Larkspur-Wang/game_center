import React from 'react'
import { Link } from 'react-router-dom'

const GameList: React.FC = () => {
  const games = [
    { id: 1, name: 'Find the Still Emoji', path: '/find-still-emoji' },
  ]

  return (
    <div className="minecraft-panel mt-10 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-minecraft-green">Game List</h2>
      <ul className="grid grid-cols-1 gap-6">
        {games.map((game) => (
          <li key={game.id} className="bg-gray-700 p-4 rounded border-2 border-gray-600">
            <h3 className="text-2xl font-semibold mb-2">{game.name}</h3>
            <Link
              to={game.path}
              className="minecraft-btn bg-minecraft-blue text-white px-4 py-2 hover:bg-blue-600 w-full text-xl inline-block text-center"
            >
              Start Game
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameList