import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-4">
      <div className='container mx-auto text-center'>
      <p>&copy; {new Date().getFullYear()} LightPost. All rights reserved.</p>
      <p>Made with ❤️ by Atul</p>
    </div>
    </footer>
  )
}

export default Footer
