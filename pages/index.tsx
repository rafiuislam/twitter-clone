import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <Feed />
        {/* Widget */}

        {/* Modal */}
      </main>
    </div>
  )
}

export default Home
