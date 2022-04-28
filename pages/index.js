import axios from 'axios'
import Head from 'next/head'
import MemoriesList from '../components/MemoriesList'

export default function Home({memoriesList}) {

  return (
    <div>
      <Head>
        <title>Memories App</title>
        <meta name="description" content="Your favorite place to share memories!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MemoriesList memories={memoriesList} title={"Most viewed"}/>
      </main>

    </div>
  )
}


export const getServerSideProps = async () =>{
  const hostname = process.env.NEXT_PUBLIC_SITE_URL
  console.log(hostname)
  const res = await axios.get(`${hostname}/api/memories`)
  // console.log(res)

  return {
    props:{
      memoriesList:res.data
    }
  }
}