import axios from 'axios'
import Head from 'next/head'
import HomeImage from '../components/HomeImage'
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
        <h1 style={{textAlign:"center"}}>Welcome to memories!</h1>
        <HomeImage />
        <MemoriesList memories={memoriesList}/>
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