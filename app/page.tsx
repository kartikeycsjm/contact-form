'use client'
import axios from 'axios'
import React, { useState } from 'react'

const page = () => {
  const [email, setEmail] = useState('');
  const [msg,setMsg]=useState('')
  const [loading,setLoading]=useState(false)
  const sendLink = async () => {
    setLoading(true)
    const res = await axios.post('api/FormLink', {
      email
    })
    console.log(res.data);
    setMsg(res.data.message)
    setLoading(false)
  }
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="text" placeholder='email'
        className='p-2 w-[270px] rounded text-black' />
      {!loading?<button onClick={sendLink} className='m-2 bg-red-400 p-2 rounded text-black'>{msg?'Link Generated Check email':'Get Form Sharing Link'}</button>:'Sending'}
    </div>
  )
}

export default page