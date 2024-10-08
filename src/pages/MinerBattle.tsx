import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Block {
  type: 'stone' | 'iron' | 'gold' | 'diamond'
  health: number
}

const MinerBattle: React.FC = () => {
  const [grid, setGrid] = useState<Block[][]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
  }, [timeLeft, gameOver])

  const resetGame = () => {
    const newGrid: Block[][] = []
    for (let i = 0; i < 10; i++) {
      const row: Block[] = []
      for (let j = 0; j < 10; j++) {
        const random = Math.random()
        if (random < 0.6) {
          row.push({ type: 'stone', health: 1 })
        } else if (random < 0.8) {
          row.push({ type: 'iron', health: 2 })
        } else if (random < 0.95) {
          row.push({ type: 'gold', health: 3 })
        } else {
          row.push({ type: 'diamond', health: 4 })
        }
      }
      newGrid.push(row)
    }
    setGrid(newGrid)
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
  }

  const mineBlock = (rowIndex: number, colIndex: number) => {
    if (gameOver) return

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid]
      const block = newGrid[rowIndex][colIndex]
      
      if (block.health > 0) {
        block.health -= 1
        if (block.health === 0) {
          switch (block.type) {
            case 'stone':
              setScore((prevScore) => prevScore + 1)
              break
            case 'iron':
              setScore((prevScore) => prevScore + 5)
              break
            case 'gold':
              setScore((prevScore) => prevScore + 10)
              break
            case 'diamond':
              setScore((prevScore) => prevScore + 50)
              break
          }
        }
      }

      return newGrid
    })
  }

  return (
    <div className="minecraft-panel mt-10 max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6 text-minecraft-green">矿工大作战</h2>
      <div className="mb-4">
        <span className="mr-4">得分: {score}</span>
        <span>时间: {timeLeft}秒</span>
      </div>
      <div className="grid grid-cols-10 gap-1 mb-4">
        {grid.map((row, rowIndex) =>
          row.map((block, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 border border-gray-700 ${
                block.health === 0 ? 'bg-gray-800' :
                block.type === 'stone' ? 'bg-gray-500' :
                block.type === 'iron' ? 'bg-gray-400' :
                block.type === 'gold' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}
              onClick={() => mineBlock(rowIndex, colIndex)}
              disabled={gameOver}
            />
          ))
        )}
      </div>
      {gameOver && (
        <div className="mb-4">
          <p className="text-2xl text-minecraft-red mb-2">游戏结束!</p>
          <button
            onClick={resetGame}
            className="minecraft-btn bg-minecraft-blue text-white px-4 py-2 hover:bg-blue-600 text-xl"
          >
            重新开始
          </button>
        </div>
      )}
      <Link to="/games" className="minecraft-btn bg-gray-600 text-white px-4 py-2 hover:bg-gray-500 text-xl inline-block mt-4">
        返回游戏列表
      </Link>
    </div>
  )
}

export default MinerBattle