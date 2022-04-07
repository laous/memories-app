import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeImage from '../components/HomeImage'
import MemoriesList from '../components/MemoriesList'
import { add } from '../reducers/memoriesReducer'

export default function Home({memoriesList}) {
  // const [memories , setMemories] = useState(memoriesList)

  const dispatch = useDispatch()


  useEffect(
    ()=> {
        dispatch(add(memoriesList))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []
  )

  const list = useSelector(state => state.memories.list)
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
        <MemoriesList memories={list}/>
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