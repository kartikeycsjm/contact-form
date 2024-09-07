'use client'
import axios from 'axios'
import React, { useState } from 'react'

const Page = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const sendLink = async () => {
    setLoading(true)
    try {
      const res = await axios.post('api/FormLink', { email })
      setMsg(res.data.message)
    } catch (error) {
      setMsg('Error generating link, try again.')
    }
    setLoading(false)
  }

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <header className='bg-blue-500 text-white text-center py-4 shadow-lg'>
        <h1 className='text-2xl font-bold'>Contact Form Link Generator</h1>
      </header>

      {/* Main content */}
      <main className='flex-grow flex justify-center items-center'>
        <div className='w-full max-w-md p-6 bg-white shadow-md rounded-lg'>
          <h2 className='text-xl font-semibold mb-4'>Generate Form Link</h2>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email" placeholder='Enter your email'
            className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
          {!loading ? (
            <button
              onClick={sendLink}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300 ease-in-out'>
              Get Form Sharing Link
            </button>
          ) : (
            <p className='text-center'>Sending...</p>
          )}
          {msg && <p className='mt-4 text-green-600 text-center'>{msg}</p>}
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-blue-500 text-white text-center py-4'>
        <p>&copy; {new Date().getFullYear()} Kartieky Mishra</p>
      </footer>
    </div>
  )
}

export default Page
