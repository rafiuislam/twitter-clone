import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
} from '@heroicons/react/outline'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import React, { useState, useRef } from 'react'

const Input = () => {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const filePickerRef = useRef(null)

  const addImageToPost = () => {}

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach((el) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  return (
    <div
      className={`flex space-x-3 overflow-y-hidden border-b border-gray-700 p-3`}
    >
      <img
        className="h-10 w-10 cursor-pointer rounded-full"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png"
        alt=""
      />
      <div className="w-full divide-y divide-gray-700 ">
        <div className={`${selectedFile && 'pb-8'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's Up?"
            className=" min-h-[40px] w-full bg-transparent text-lg tracking-wide text-[#d9d9d9] outline-none"
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="h-5 text-white" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="max-h-80 rounded-2xl object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
              <PhotographIcon className="h-[20px] text-[#1d9dfd]" />
              <input
                type="file"
                hidden
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
            <div className="icon">
              <ChartBarIcon className="h-[22px] text-[#1d9dfd]" />
            </div>

            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className="h-[22px] text-[#1d9dfd]" />
            </div>

            <div className="icon">
              <CalendarIcon className="h-[22px] text-[#1d9dfd]" />
            </div>

            {showEmojis && (
              <Picker
                theme="dark"
                style={{
                  position: 'absolute',
                  marginTop: '465px',
                  marginRight: 40,
                  maxWidth: '320px',
                  borderRadius: '20px',
                }}
                onSelect={addEmoji}
              />
            )}
          </div>
          <button
            className="rounded-full bg-[#1d9dfd] px-4 py-1.5 font-bold text-white shadow-md hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9df0]"
            disabled={!input.trim() && !selectedFile}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default Input
