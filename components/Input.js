import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import React, { useState, useRef } from 'react'
import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import { async } from '@firebase/util'
import { useSession } from 'next-auth/react'

const Input = () => {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const { data: session } = useSession()

  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      uesrname: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      })
    }

    setLoading(false)
    setInput('')
    setSelectedFile(null)
    setShowEmojis(false)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (event) => {
      setSelectedFile(event.target.result)
    }
  }

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach((el) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  return (
    <div
      className={`flex space-x-3 overflow-y-hidden border-b border-gray-700 p-3 ${
        loading && 'opacity-50'
      }`}
    >
      <img
        className="h-10 w-10 cursor-pointer rounded-full"
        src={session?.user?.image}
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
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
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
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
