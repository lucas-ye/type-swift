import { useState } from 'react'
import './App.css'
import Input from './components/input'
import Keyboard from './components/keyboard'
import Timer from './components/timer'

function App() {
  const [start, setStart] = useState(false)
  const [finish, setFinish] = useState(false)
  return (
    <main className="flex h-full items-center bg-slate-200 flex-col ">
      <Timer start={start} />
      <Input setStart={setStart} setFinish={setFinish} />
      <Keyboard />
      {finish && <div>finish</div>}
    </main>
  )
}

export default App
