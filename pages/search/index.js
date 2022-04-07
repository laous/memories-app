import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import MemoriesList from "../../components/MemoriesList";
import { getAllMemories } from "../../reducers/memoriesReducer";

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  useEffect(() => setQuery(router.query.query), [router]);

  const memories = useSelector((state) => state.memories);
  console.log(memories)
  const dispatch = useDispatch()

  useEffect(() =>{
    if(memories.status === 'idle' ){
      dispatch(getAllMemories())
    }
  },[memories , dispatch])

  return (
    <>
      <div>
        <MemoriesList
          memories={memories?.list?.filter((item) =>
            item.name?.toLowerCase().includes(query.toLowerCase())
          )}
        />
      </div>
    </>
  );
};

export default Search;
