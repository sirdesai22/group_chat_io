import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import { useState } from 'react';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

function App() {
  const [username, setUsername] = useState('');
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login username={username} setUsername={setUsername} />} />
          <Route path='/chat/:username' element={<Chat />} username={username}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
