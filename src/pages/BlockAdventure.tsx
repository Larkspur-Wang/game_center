import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const BlockAdventure: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 })
  const [blocks, setBlocks] = useState<{ x: number; y: number }[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const movePlayer = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return

    setPlayerPosition((prev) => {
      let newX = prev.x
      let newY = prev.y

      switch (direction) {
        case 'up':
          newY = Math.max(0, prev.y - 1)
          break
        case 'down':
          newY = Math.min(9, prev.y + 1)
          break
        case 'left':
          newX = Math.max(0, prev.x - 1)
          break
        case 'right':
          newX = Math.min(9, prev.x + 1)
          break
      }

      return { x: newX, y: newY }
    })
  }, [gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          movePlayer('up')
          break
        case 'ArrowDown':
          movePlayer('down')
          break
        case 'ArrowLeft':
          movePlayer('left')
          break
        case 'ArrowRight':
          movePlayer('right')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [movePlayer])

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameOver) return

      // Move blocks
      setBlocks((prevBlocks) => {
        const newBlocks = prevBlocks.map((block) => ({ ...block, x: block.x - 1 }))
        
        // Remove blocks that are off-screen
        const filteredBlocks = newBlocks.filter((block) => block.x >= 0)

        // Add new blocks
        if (Math.random() < 0.1) {
          filteredBlocks.push({ x: 9, y: Math.floor(Math.random() * 10) })
        }

        return filteredBlocks
      })

      // Check for collisions
      const collision = blocks.some(
        (block) => block.x === playerPosition.x && block.y === playerPosition.y
      )

      if (collision) {
        setGameOver(true)
      } else {
        setScore((prevScore) => prevScore + 1)
      }
    }, 200)

    return () => clearInterval(gameLoop)
  }, [blocks, playerPosition, gameOver])

  const resetGame = () => {
    setPlayerPosition({ x: 0, y: 0 })
    setBlocks([])
    setScore(0)
    setGameOver(false)
  }

  return (
    <div className="minecraft-panel mt-10 max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6 text-minecraft-green">方块冒险</h2>
      <div className="mb-4">得分: {score}</div>
      <div className="grid grid-cols-10 gap-1 mb-4">
        {Array.from({ length: 100 }).map((_, index) => {
          const x = index % 10
          const y = Math.floor(index / 10)
          const isPlayer = x === playerPosition.x && y === playerPosition.y
          const isBlock = blocks.some((block) => block.x === x && block.y === y)

          return (
            <div
              key={index}
              className={`w-8 h-8 border border-gray-700 ${
                isPlayer ? 'bg-minecraft-green' : isBlock ? 'bg-minecraft-red' : 'bg-gray-800'
              }`}
            />
          )
        })}
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

export default BlockAdventure