import { useEffect, useState } from 'react'
import Key from './key'
import { keysLower, specialKey, keysUpper } from '../config'

// 初始化key列表， 初始化后会返回一个对象，包含isPressed来区分是否有按住某个键
const init = (keys: string[]) => {
  const kDict: { [k: string]: { isPressed: boolean } } = {}
  for (const k of keys) {
    kDict[k] = { isPressed: false }
  }
  return kDict
}

const Keyboard = () => {
  // const [input, setInput] = useState('')
  const keysLowerDict = init(keysLower)
  const keysUpperDict = init(keysUpper)
  const [keyboard, setKeyboard] = useState(keysLowerDict)
  const [isUpper, setIsUpper] = useState(false)
  useEffect(() => {
    //处理按下的键
    const handleKeyDown = (props: KeyboardEvent) => {
      const { key, code } = props
      console.log(props)
      console.log(`${key} down`)
      //处理普通按键
      const keyList = isUpper ? keysUpper : keysLower
      if (keyList.includes(key) && !specialKey.includes(key)) {
        !keyboard[key].isPressed &&
          setKeyboard({
            ...keyboard,
            [key]: { isPressed: !keyboard[key].isPressed },
          })
        return
        // setInput((input) => input + key)
      }
      //处理特殊按键
      if (specialKey.includes(key)) {
        if (key !== 'Shift' && key !== 'CapsLock') {
          !keyboard[key].isPressed &&
            setKeyboard({
              ...keyboard,
              [key]: { isPressed: !keyboard[key].isPressed },
            })
        } else if (key === 'Shift') {
          // 当shift被按下时翻转键盘
          !keyboard[code].isPressed &&
            setKeyboard({
              ...keysUpperDict,
              ShiftRight: keyboard['ShiftRight'],
              ShiftLeft: keyboard['ShiftLeft'],
              CapsLock: keyboard['CapsLock'],
              [code]: { isPressed: !keyboard[code].isPressed },
            })
          setIsUpper(true)
        } else if (key === 'CapsLock') {
          setKeyboard({
            ...keysUpperDict,
            ShiftRight: keyboard['ShiftRight'],
            ShiftLeft: keyboard['ShiftLeft'],
            [key]: { isPressed: !keyboard[key].isPressed },
          })
          setIsUpper(true)
        }
      }
    }
    //处理松开的键
    const handleKeyUp = (props: KeyboardEvent) => {
      const { key, code } = props
      console.log(`${key} up`)
      const keyList = isUpper ? keysUpper : keysLower
      if (keyList.includes(key) && !specialKey.includes(key)) {
        keyboard[key].isPressed &&
          setKeyboard({
            ...keyboard,
            [key]: { isPressed: !keyboard[key].isPressed },
          })
        return
      }
      if (specialKey.includes(key)) {
        if (key !== 'Shift' && key !== 'CapsLock') {
          keyboard[key].isPressed &&
            setKeyboard({
              ...keyboard,
              [key]: { isPressed: !keyboard[key].isPressed },
            })
        } else if (key === 'Shift') {
          //当shift被松开时翻转键盘(只要两个shift都被松开且CapsLock没有按下时才会翻转)
          if (
            ((code === 'ShiftRight' && !keyboard['ShiftLeft'].isPressed) ||
              (code === 'ShiftLeft' && !keyboard['ShiftRight'].isPressed)) &&
            !keyboard['CapsLock'].isPressed
          ) {
            setKeyboard({
              ...keysLowerDict,
              CapsLock: keyboard['CapsLock'],
              [code]: { isPressed: !keyboard[code].isPressed },
            })
            setIsUpper(false)
          } else {
            setKeyboard({
              ...keyboard,
              [code]: { isPressed: !keyboard[code].isPressed },
            })
          }
        } else if (key === 'CapsLock') {
          // 如果shift被按住时松开CapsLock将不会翻转
          if (
            !keyboard['ShiftLeft'].isPressed &&
            !keyboard['ShiftRight'].isPressed
          ) {
            setKeyboard({
              ...keysLowerDict,
              [key]: { isPressed: !keyboard[key].isPressed },
            })
            setIsUpper(false)
          } else {
            setKeyboard({
              ...keysUpperDict,
              ShiftRight: keyboard['ShiftRight'],
              ShiftLeft: keyboard['ShiftLeft'],
              [key]: { isPressed: !keyboard[key].isPressed },
            })
          }
        }
      }
    }
    console.log('useEffect 执行')
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [keyboard, keysUpperDict, keysLowerDict, isUpper])
  console.log(keyboard)
  const keyList = isUpper ? keysUpper : keysLower
  return (
    <div className="w-[60rem] flex flex-col items-center gap-3">
      <div className="w-full flex justify-between h-14">
        {keyList.map((k, index) => {
          if (index <= 12) {
            return (
              <Key key={k} keyLetter={k} isPressed={keyboard[k].isPressed} />
            )
          }
        })}
        <Key
          keyLetter="delete"
          isPressed={keyboard['Backspace'].isPressed}
          className="w-24"
        />
      </div>
      <div className="w-full flex justify-between h-14">
        <Key keyLetter="tab" isPressed={false} className="w-16" />
        {keyList.map((k, index) => {
          if (12 < index && index <= 25) {
            return (
              <Key key={k} keyLetter={k} isPressed={keyboard[k].isPressed} />
            )
          }
        })}
      </div>
      <div className="w-full flex justify-between h-14">
        <Key
          keyLetter="caps lock"
          isPressed={keyboard['CapsLock'].isPressed}
          className="w-24"
        />
        {keyList.map((k, index) => {
          if (25 < index && index <= 36) {
            return (
              <Key key={k} keyLetter={k} isPressed={keyboard[k].isPressed} />
            )
          }
        })}
        <Key
          keyLetter="return"
          isPressed={keyboard['Enter'].isPressed}
          className="w-24"
        />
      </div>
      <div className="w-full flex justify-between h-14">
        <Key
          keyLetter="shift"
          isPressed={keyboard['ShiftLeft'].isPressed}
          className="w-32"
        />
        {keyList.map((k, index) => {
          if (36 < index && index <= 46) {
            return (
              <Key key={k} keyLetter={k} isPressed={keyboard[k].isPressed} />
            )
          }
        })}
        <Key
          keyLetter="shift"
          isPressed={keyboard['ShiftRight'].isPressed}
          className="w-32"
        />
      </div>
    </div>
  )
}
export default Keyboard
