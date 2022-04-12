import { PhotographIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'

const Input = () => {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

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
        <div className={``}>
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
            <div className="icon">
              <PhotographIcon className="h-[20px] text-[#1d9dfd]" />
              <input type="file" onChange={addImage} ref={filePicker} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Input
