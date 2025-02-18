import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase-config';

const Chat = () => {
    const { username } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const chatsCollectionRef = collection(db, 'chatDB');

    useEffect(() => {
        const unsubscribe = onSnapshot(chatsCollectionRef, (snapshot) => {
            const filterData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            const finalData = filterData.sort((a, b) => a.time - b.time);
            setMessages(finalData);
        });
        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
        };
    }, []);

    const sendMessage = async () => {
        if (input.length > 0) {
            try {
                await addDoc(chatsCollectionRef, {
                    username: username,
                    text: input,
                    time: new Date(),
                });
                setInput('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteDB = async () => {
        try {
            const querySnapshot = await getDocs(chatsCollectionRef);
            const deletePromises = querySnapshot.docs.map((document) =>
                deleteDoc(doc(db, 'chatDB', document.id))
            );
            await Promise.all(deletePromises);
        } catch (error) {
            console.log(error);
        }
        console.log('Database deleted!');
    };

    return (
        <div className=''>
            {(username === 'admin-sirdesai')?<button className='absolute px-2 m-2 text-white hover:bg-green-600 py-2 text-base font-semibold rounded-md bg-green-500' onClick={deleteDB}>Delete DB</button>:<></>}
            <h1 className='font-semibold text-2xl px-2 py-2 bg-blue-500 text-stone-800 text-center font-mono'>
                Hello, welcome to PESU notification center ✌️
            </h1>
            {/* <h1 className='font-semibold text-base bg-blue-500 text-white text-center font-mono'>
                Made by Sirdesai
            </h1> */}
            <ul className='mb-20'>
               {messages.map((msg, index) => (
    <li key={index} className={`text-xl px-2 ${(username === msg.username) ? 'bg-green-100' : 'bg-red-100'}`}>
      <span className="font-semibold">{msg.username}: </span>{msg.text}
    </li>
  ))}

            </ul>

                    <div className='fixed bg-blue-500 p-3 gap-5 bottom-0 w-full flex justify-between items-center'>
                <input
                    type="text"
                    className='w-full p-3 text-2xl font-semibold rounded-md'
                    placeholder='Enter your text...'
                    value={input}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } }}
                    onChange={(e) => setInput(e.target.value)} />
                <button className='px-5 md:px-10 text-white hover:bg-green-600 py-3 text-2xl font-semibold rounded-md bg-green-500' onClick={sendMessage}>
                    Send
                </button>
            </div>
            
        </div>
    );
};

export default Chat;
