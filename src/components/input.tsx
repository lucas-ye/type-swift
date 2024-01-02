import { ChangeEvent, useEffect, useState } from 'react'
import Letter from './letter'

type Sentence = {
  [index: number]: {
    isMatch: boolean
    keyLetter: string
  }
}
const Input = () => {
  const [inputValue, setInputValue] = useState('')
  const [sentence, setSentence] = useState<Sentence>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const finalSentence = 'hello my friend'
  const finalSentenceLength = finalSentence.length
  useEffect(() => {
    console.log('useEffect click')
    document.addEventListener('click', () => {
      document.querySelector('input')?.focus()
    })
    const sentenceDict: Sentence = {}
    for (let i = 0; i < finalSentence.length; i += 1) {
      sentenceDict[i] = {
        isMatch: false,
        keyLetter: finalSentence[i],
      }
    }
    setSentence(sentenceDict)
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const inputLength = value.length
    setCurrentIndex(inputLength)
    if (inputLength && inputLength < finalSentenceLength) {
      console.log('set')
      setSentence({
        ...sentence,
        [inputLength - 1]: {
          ...sentence?.[inputLength - 1],
          isMatch:
            value.charAt(inputLength - 1) ===
            sentence?.[inputLength - 1].keyLetter,
        },
      })
    }
    setInputValue(value)
  }

  return (
    <div>
      <input
        type="text"
        autoFocus
        onChange={handleChange}
        value={inputValue}
        className=" absolute -top-[100px] -left-[100px]"
      />
      <div className="flex m-20">
        {sentence &&
          Object.entries(sentence).map(([key, value], index) => {
            return (
              <Letter
                key={key}
                {...value}
                currentIndex={currentIndex}
                index={index}
              />
            )
          })}
      </div>
    </div>
  )
}
export default Input
