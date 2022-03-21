import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { add } from "../reducers/memoriesReducer";
import Navbar from "./Navbar";

export default function Layout({ children , memoriesList}) {

  // const dispatch = useDispatch()


  // useEffect(
  //   ()=> {
  //       dispatch(add(memoriesList))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   } , []
  // )
    return (
      <>
        <Navbar />
        <main>{children}</main>
      </>
    )
  }

  export const getServerSideProps = async () =>{
    const hostname = process.env.NEXT_PUBLIC_SITE_URL
    console.log(hostname)
    const res = await axios.get(`${hostname}/api/memorie`)
    // console.log(res)
  
    return {
      props:{
        memoriesList:res.data
      }
    }
  }