import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'

const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕']

const FindStillEmoji: React.FC = () => {
  const [grid, setGrid] = useState<string[][]>([])
  const [stillEmojiPosition, setStillEmojiPosition] = useState<[number, number]>([0, 0])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [gridSize, setGridSize] = useState({ rows: 10, cols: 18 })
  const containerRef = useRef<HTMLDivElement>(null)
  const gameAreaRef = useRef<HTMLDivElement>(null)

  const createGrid = useCallback(() => {
    const newGrid: string[][] = []
    for (let i = 0; i < gridSize.rows; i++) {
      const row: string[] = []
      for (let j = 0; j < gridSize.cols; j++) {
        row.push(emojis[Math.floor(Math.random() * emojis.length)])
      }
      newGrid.push(row)
    }
    const stillX = Math.floor(Math.random() * gridSize.rows)
    const stillY = Math.floor(Math.random() * gridSize.cols)
    setStillEmojiPosition([stillX, stillY])
    return newGrid
  }, [gridSize])

  useEffect(() => {
    const updateGridSize = () => {
      if (containerRef.current && gameAreaRef.current) {
        const navbarHeight = 84 // 估计导航栏高度
        const footerHeight = 80 // 估计页脚高度
        const headerHeight = 20 // 游戏标题和分数区域的高度
        const availableHeight = window.innerHeight - navbarHeight - footerHeight - headerHeight
        const gameAreaWidth = gameAreaRef.current.clientWidth

        const cellSize = 40 // 每个 emoji 单元格的大小
        const cols = Math.floor(gameAreaWidth / cellSize)
        const rows = Math.floor(availableHeight / cellSize)

        setGridSize({ rows: Math.max(5, rows), cols: Math.max(10, cols) })
      }
    }

    updateGridSize()
    window.addEventListener('resize', updateGridSize)
    return () => window.removeEventListener('resize', updateGridSize)
  }, [])

  useEffect(() => {
    setGrid(createGrid())
  }, [createGrid])

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
  }, [timeLeft, gameOver])

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setGrid(prevGrid => prevGrid.map(row => [...row]))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [gameOver])

  const handleEmojiClick = (x: number, y: number) => {
    if (x === stillEmojiPosition[0] && y === stillEmojiPosition[1]) {
      setScore(prevScore => prevScore + level * 10)
      setLevel(prevLevel => prevLevel + 1)
      setGrid(createGrid())
      setTimeLeft(60)
    } else {
      setTimeLeft(prevTime => Math.max(0, prevTime - 5))
    }
  }

  const resetGame = () => {
    setScore(0)
    setLevel(1)
    setTimeLeft(60)
    setGameOver(false)
    setGrid(createGrid())
  }

  const getRandomOffset = () => {
    return Math.random() * 3 - 1.5 // Random value between -1.5 and 1.5
  }

  return (
    <div className="flex flex-col h-screen" ref={containerRef}>
      <div className="bg-gray-800 bg-opacity-90 p-2">
        <h2 className="text-2xl font-bold text-minecraft-green inline-block mr-4">Find the Still Emoji</h2>
        <span className="mr-4">Score: {score}</span>
        <span className="mr-4">Level: {level}</span>
        <span>Time: {timeLeft}s</span>
      </div>
      <div className="flex-grow overflow-hidden p-2 bg-gray-900" ref={gameAreaRef}>
        <div 
          className="grid gap-1 h-full"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`
          }}
        >
          {grid.map((row, x) =>
            row.map((emoji, y) => (
              <button
                key={`${x}-${y}`}
                className="w-full h-full text-2xl relative bg-gray-700 border border-gray-600 flex items-center justify-center"
                onClick={() => handleEmojiClick(x, y)}
                disabled={gameOver}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: x === stillEmojiPosition[0] && y === stillEmojiPosition[1]
                      ? 'none'
                      : `translate(${getRandomOffset()}px, ${getRandomOffset()}px)`,
                    transition: 'transform 0.1s'
                  }}
                >
                  {emoji}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-2xl text-minecraft-red mb-4">Game Over!</p>
            <button
              onClick={resetGame}
              className="minecraft-btn bg-minecraft-blue text-white px-4 py-2 hover:bg-blue-600 text-xl mb-2"
            >
              Play Again
            </button>
            <Link to="/games" className="minecraft-btn bg-gray-600 text-white px-4 py-2 hover:bg-gray-500 text-xl block">
              Back to Game List
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default FindStillEmoji