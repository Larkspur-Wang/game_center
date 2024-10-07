import React from 'react'

const GameList: React.FC = () => {
  // 这里将来会从后端获取游戏列表
  const games = [
    { id: 1, name: '方块冒险' },
    { id: 2, name: '像素射击' },
    { id: 3, name: '矿工大作战' },
  ]

  return (
    <div className="minecraft-panel mt-10 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-minecraft-green">游戏列表</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <li key={game.id} className="bg-gray-700 p-4 rounded border-2 border-gray-600">
            <h3 className="text-2xl font-semibold mb-2">{game.name}</h3>
            <button className="minecraft-btn bg-minecraft-blue text-white px-4 py-2 hover:bg-blue-600 w-full text-xl">
              开始游戏
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameList