import './App.css'
import Input from './components/input'
import Keyboard from './components/keyboard'
// import Timer from './components/timer'

function App() {
  return (
    <main className="flex h-full items-center bg-slate-200 flex-col ">
      <Input />
      {/* <Timer /> */}
      <Keyboard />
    </main>
  )
}

export default App
