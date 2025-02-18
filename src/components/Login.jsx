import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { db } from '../config/firebase-config';

const Login = ({ username, setUsername }) => {

    const chatsCollectionRef = collection(db, 'chatDB');

    const chatLogin = async () => {
        // try {
        //     await addDoc(chatsCollectionRef, {
        //         username: 'Admin',
        //         text: `${username} has joined the chat!`,
        //         time: new Date(),
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
        window.location.href = `/chat/${username}`
    }

    return (
        <div className='h-screen w-full flex justify-center items-center text-center' style={{ background: 'url(/doodlebg.jpg)' }}>
            <div className='flex flex-col justify-center items-center gap-5 p-10 border-2 bg-white text-2xl rounded-md w-11/12 md:w-2/5 md:h-2/4 shadow-md'>
                <h1 className='font-semibold text-xl md:text-3xl'>🔥Notification Center😎</h1>
                <input
                    type="text"
                    className='border-4 p-4 rounded-lg w-full font-semibold'
                    placeholder='Enter your SRN/PRN...'
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }} />
                <button
                    className="px-4 py-3 bg-green-500 text-white rounded-lg font-semibold w-3/4 md:w-2/4"
                    onClick={chatLogin}>Let's Chat!</button>
            </div>
        </div>
    )
}

export default Login
