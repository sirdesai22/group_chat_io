import React from 'react'

const Login = ({ username, setUsername }) => {

    const chatLogin = () => {
        window.location.href = `/chat/${username}`
    }

    return (
        <div className='h-screen w-full flex justify-center items-center text-center' style={{ background: 'url(/doodlebg.jpg)' }}>
            <div className='flex flex-col justify-center items-center gap-5 p-10 border-2 bg-white text-2xl rounded-md w-2/5 h-2/4 shadow-md'>
                <h1 className='font-semibold text-3xl'>🔥6A Lab Chat Group 😎</h1>
                <input
                    type="text"
                    className='border-4 p-4 rounded-lg w-full font-semibold'
                    placeholder='Enter your cool name...'
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }} />
                <button
                    className="px-4 py-3 bg-green-500 text-white rounded-lg font-semibold w-2/4"
                    onClick={chatLogin}>Let's Chat!</button>
            </div>
        </div>
    )
}

export default Login