import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 bg-opacity-80 text-white py-4 mt-8 border-t-4 border-gray-700">
      <div className="container mx-auto text-center">
        <p className="text-minecraft-green">
          &copy; {currentYear} Little Shock Game Center. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer