import { ChangeEvent, useEffect, useState } from 'react'
import Letter from './letter'

type Word = {
  isMatch: boolean
  keyLetter: string
}
type Sentence = {
  words: {
    [index: number]: Word
  }
  hover: boolean
}
type sentenceArray = Sentence[]

const Input = ({
  setStart,
  setFinish,
}: {
  setStart: (start: boolean) => void
  setFinish: (start: boolean) => void
}) => {
  const [inputValue, setInputValue] = useState('')
  const [sentence, setSentence] = useState<sentenceArray>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const finalSentence = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  const tempArray = finalSentence.split(' ')
  const wordsArray: string[] = []

  tempArray.forEach((word, index) => {
    wordsArray.push(word)
    if (index < tempArray.length - 1) {
      wordsArray.push(' ')
    }
  })

  const finalSentenceLength = finalSentence.length
  useEffect(() => {
    console.log('useEffect click')
    document.addEventListener('click', () => {
      document.querySelector('input')?.focus()
    })
    const sentenceArray: sentenceArray = []
    let counter = 0
    for (let i = 0; i < wordsArray.length; i += 1) {
      for (let j = 0; j < wordsArray[i].length; j++) {
        const letter = wordsArray[i][j]
        if (sentenceArray[i]?.words) {
          sentenceArray[i].words[counter] = {
            isMatch: false,
            keyLetter: letter,
          }
        } else {
          sentenceArray[i] = {
            words: {
              [counter]: {
                isMatch: false,
                keyLetter: letter,
              },
            },
            hover: false,
          }
        }
        counter += 1
      }
    }
    sentenceArray[0].hover = true
    setSentence(sentenceArray)
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStart(true)
    const value = event.target.value
    const inputLength = value.length
    setCurrentIndex(inputLength)

    if (inputLength && inputLength < finalSentenceLength) {
      const updatedSentence = [...sentence]
      let hoverNext = false
      let hoverIndex = 0
      for (const wordIndex in updatedSentence) {
        if (updatedSentence[wordIndex].words[inputLength - 1]) {
          updatedSentence[wordIndex].words[inputLength - 1] = {
            ...updatedSentence[wordIndex].words[inputLength - 1],
            isMatch:
              value.charAt(inputLength - 1) ===
              sentence[wordIndex].words[inputLength - 1].keyLetter,
          }
          if (!updatedSentence[wordIndex].words[inputLength]) {
            hoverNext = true
            hoverIndex = Number(wordIndex)
          }
          break
        }
      }
      if (hoverNext) {
        updatedSentence[hoverIndex + 1].hover = true
      }
      setSentence(updatedSentence)
    }
    if (inputLength === finalSentenceLength) {
      const updatedSentence = {
        ...sentence,
      }
      const indexArray = Object.keys(updatedSentence)
      const lastIndex = indexArray[indexArray.length - 1]
      updatedSentence[Number(lastIndex)].words[inputLength - 1] = {
        ...updatedSentence[Number(lastIndex)].words[inputLength - 1],
        isMatch:
          value.charAt(inputLength - 1) ===
          sentence[Number(lastIndex)].words[inputLength - 1].keyLetter,
      }
      setSentence(updatedSentence)
      setStart(false)
      setFinish(true)
    }
    setInputValue(value)
  }

  return (
    <div className="w-[960px]">
      <input
        type="text"
        autoFocus
        onChange={handleChange}
        value={inputValue}
        className=" absolute -top-[100px] -left-[100px]"
      />
      <div className="flex my-20 flex-wrap h-40 overflow-scroll">
        {Object.entries(sentence).map(([index, value]) => {
          return (
            <div
              key={index}
              className={`flex ${
                value.hover ? 'text-slate-500' : ' text-slate-400'
              }`}
            >
              {Object.entries(value.words).map(([index, info]) => {
                return (
                  <Letter
                    key={index}
                    {...info}
                    index={Number(index)}
                    currentIndex={currentIndex}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Input
