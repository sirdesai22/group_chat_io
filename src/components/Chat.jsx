import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:3000');

const Chat = () => {
    const { username } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('chat message', ({ sender, message }) => {
            setMessages(prevMessages => [...prevMessages, { sender, message }]);
          });

        return () => {
            socket.off('chat message');
        };
    }, [username]); // Empty dependency array ensures this effect runs only once

    const sendMessage = () => {
        socket.emit('chat message', { sender: username, message: input });
        setInput('');
    };

    return (
        <div className=''>
            <ul className='mx-2'>
                {messages.map((msg, index) => (
                    <li key={index} className='text-xl'>
                        <strong>{msg.sender}: </strong>{msg.message}
                    </li>
                ))}
            </ul>

            <form className='fixed bg-blue-500 p-3 gap-5 bottom-0 w-full flex justify-between items-center'>
                <input
                    type="text"
                    className='w-full p-3 text-2xl font-semibold rounded-md'
                    placeholder='Enter your text...'
                    value={input}
                    onChange={e => setInput(e.target.value)} />
                <button type='button' className='px-10 text-white hover:bg-green-600 py-3 text-2xl font-semibold rounded-md bg-green-500' onClick={sendMessage}>Send</button>
            </form>
        </div>
    );
}

export default Chat;