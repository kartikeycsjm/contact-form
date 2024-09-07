'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const Form = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [remail, setRemail] = useState('');
    const [message, setMessage] = useState('');
    const [outmessage, setOutmessage] = useState('');
    const [loading, setLoading] = useState(false);

    const params = useParams();


    const getEmail = async () => {
        try {
            const res = await axios.get(`/api/FormFill?id=${params.id}`);
            const e = res.data.data.email;
            setRemail(e)
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };

    useEffect(() => {
        if (params?.id) {
            getEmail();
        }
    }, [params?.id]);

    const submitForm = async () => {
        if (remail) {
            if (name && email && phone && message) {
                setLoading(true);
                try {
                    const res = await axios.post('/api/FormFill', {
                        name, phone, email, message, remail
                    });
                    setOutmessage(res.data);
                    setLoading(false);
                    // Reset form fields
                    setEmail('');
                    setMessage('');
                    setName('');
                    setPhone('');
                } catch (error) {
                    console.error('Error submitting form:', error);
                    setLoading(false);
                }
            }
            else {
                alert('Please fill all the details');
            }
        }
        else{
            alert('This form is not valid')
        }
        
    };

    return (
        <div className='mt-5 mx-8 flex flex-col'>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                className='border h-[50px] border-black p-2 w-[100%] my-4'
            />
            <input
                type="text"
                value={phone}
                placeholder='Phone'
                onChange={e => setPhone(e.target.value)}
                className='border h-[50px] border-black p-2 w-[100%] my-4 md:w-[400px]'
            />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Email'
                className='border h-[50px] border-black p-2 w-[100%] my-4 md:w-[400px]'
            />
            <textarea
                value={message}
                placeholder='Message'
                onChange={e => setMessage(e.target.value)}
                className='border h-[150px] border-black p-2 w-[100%] my-4 resize-none md:w-[400px]'
            />
            <button
                onClick={submitForm}
                className={`text-blue-200 rounded-full border w-[100px] h-[100px] p-2 my-4 mb-10 bg-green-600 ${outmessage === 'Submitted' && 'bg-[#0080006f]'}`}
            >
                {loading ? 'Submitting' : `${outmessage === 'Submitted' ? 'Submitted' : 'Submit'}`}
            </button>
        </div>
    );
};

export default Form;
