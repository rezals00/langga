import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [isAuthed, setisAuthed] = useState(false)
  useEffect(() => {
    if(window.localStorage.getItem('token')) {
      setisAuthed(true)
    }
  }, [])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-indigo-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href='/' className="text-white text-2xl font-bold"><b>[AI]</b> LANGGA </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
   
              <a
                href="/tos"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Syarat dan Ketentuan
              </a>
              {(isAuthed ?  <a
                href="/chat"
                className="text-gray-300 border border-white hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Mulai Konsultasi
              </a> : <div><a
                href="/auth/login"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Masuk
              </a>
              <a
                href="/auth/register"
                className="text-gray-300 hover:text-white px-3 py-2 border border-white rounded-md text-sm font-medium"
              >
                Register
              </a></div>)}
              
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Features
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
