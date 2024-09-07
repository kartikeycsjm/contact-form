'use client'
import axios from 'axios';
import React, { useState } from 'react'

const Form = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [outmessage, setOutmessage] = useState('');
    const [loading,setLoading]=useState(false)
    const submitForm = async () => {
        if(name&&email&&phone&&message){
            setLoading(true)
            const res = await axios.post('api', {
                name, phone, email, message
            })
            const msg = res.data;
            console.log(msg);
            setOutmessage(res.data)
            setLoading(false)
            setEmail('')
            setMessage('')
            setName('')
            setPhone('')
        }
        else{
            alert('please fill all the details')
        }
    }
    return (
        <div className='mt-5 mx-8 flex flex-col'>
            <input type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                className='border h-[50px] border-black p-2 w-[100%] my-4'
            />
            <input type="text"
                value={phone}
                placeholder='Phone'
                onChange={e => setPhone(e.target.value)}
                className='border h-[50px] border-black p-2 w-[100%] my-4
                md:w-[400px]'/>
            <input type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
                className='border h-[50px] border-black p-2 w-[100%] my-4
                md:w-[400px]'/>
            <textarea value={message}
                placeholder='Message'
                onChange={e => setMessage(e.target.value)}
                className='border h-[150px] border-black p-2 w-[100%] my-4
                resize-none
                md:w-[400px]'>
            </textarea>
            <button
                onClick={submitForm}
                className={`text-blue-200 rounded-full border 
                w-[100px] h-[100px] 
                p-2 my-4 mb-10 
              bg-green-600
              ${outmessage==='Submitted'&&'bg-[#0080006f]'}
                `}>
                    {loading?'Submitting':`${outmessage==='Submitted'?'Submitted':'Submit'}`}
            </button>
        </div>
    )
}

export default Form