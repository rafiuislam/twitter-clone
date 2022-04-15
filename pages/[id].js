import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Modal from '../components/Modal'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import { getProviders, getSession, useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from '@firebase/firestore'
import { db } from '../firebase'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import Comment from '../components/Comment'

const PostPage = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    onSnapshot(doc(db, 'posts', id), (snapshot) => setPost(snapshot.data()))
  }, [db]) // inFormat doc(db,...) & .data() for retrieving & inserting the data in variable respectively

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => setComments(snapshot.docs)
    )
  }, [db, id]) // inFormat collection(db,...) & .docs for retrieving & inserting the data in array's respectively

  if (!session) return <Login providers={providers} />

  return (
    <div>
      <Head>
        <title>
          {post?.username} on twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <div className="max-w-2xl flex-grow border-l border-r border-gray-700 sm:ml-[73px] xl:ml-[370px]">
          <div className="sticky top-0 z-50 flex items-center gap-x-4 border-b border-gray-700 bg-black px-1.5 py-2 text-xl font-semibold text-[#d9d9d9]">
            <div
              className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0"
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>

        {/* Widget */}
        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}