import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

interface Target {
  x: number
  y: number
}

const PixelShooter: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState(5)
  const [targets, setTargets] = useState<Target[]>([])
  const [bullets, setBullets] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const movePlayer = useCallback((direction: 'up' | 'down') => {
    if (gameOver) return

    setPlayerPosition((prev) => {
      if (direction === 'up') return Math.max(0, prev - 1)
      if (direction === 'down') return Math.min(9, prev + 1)
      return prev
    })
  }, [gameOver])

  const shoot = useCallback(() => {
    if (gameOver) return
    setBullets((prev) => [...prev, playerPosition])
  }, [playerPosition, gameOver])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          movePlayer('up')
          break
        case 'ArrowDown':
          movePlayer('down')
          break
        case ' ':
          shoot()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [movePlayer, shoot])

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameOver) return

      // Move bullets
      setBullets((prevBullets) => {
        const newBullets = prevBullets.map((bullet) => bullet + 1)
        return newBullets.filter((bullet) => bullet < 10)
      })

      // Move targets
      setTargets((prevTargets) => {
        const newTargets = prevTargets.map((target) => ({ ...target, x: target.x - 1 }))
        
        // Remove targets that are off-screen
        const filteredTargets = newTargets.filter((target) => target.x >= 0)

        // Add new targets
        if (Math.random() < 0.1) {
          filteredTargets.push({ x: 9, y: Math.floor(Math.random() * 10) })
        }

        return filteredTargets
      })

      // Check for collisions
      setTargets((prevTargets) => {
        const newTargets = prevTargets.filter((target) => {
          const hit = bullets.some((bullet) => bullet === target.x && playerPosition === target.y)
          if (hit) {
            setScore((prevScore) => prevScore + 1)
          }
          return !hit
        })
        return newTargets
      })

      // Check for game over
      if (targets.some((target) => target.x === 0)) {
        setGameOver(true)
      }
    }, 200)

    return () => clearInterval(gameLoop)
  }, [bullets, playerPosition, targets, gameOver])

  const resetGame = () => {
    setPlayerPosition(5)
    setTargets([])
    setBullets([])
    setScore(0)
    setGameOver(false)
  }

  return (
    <div className="minecraft-panel mt-10 max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6 text-minecraft-green">像素射击</h2>
      <div className="mb-4">得分: {score}</div>
      <div className="grid grid-cols-10 gap-1 mb-4">
        {Array.from({ length: 100 }).map((_, index) => {
          const x = index % 10
          const y = Math.floor(index / 10)
          const isPlayer = x === 0 && y === playerPosition
          const isBullet = bullets.includes(x) && y === playerPosition
          const isTarget = targets.some((target) => target.x === x && target.y === y)

          return (
            <div
              key={index}
              className={`w-8 h-8 border border-gray-700 ${
                isPlayer ? 'bg-minecraft-green' :
                isBullet ? 'bg-minecraft-blue' :
                isTarget ? 'bg-minecraft-red' :
                'bg-gray-800'
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

export default PixelShooter