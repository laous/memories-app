import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemoriesList from "../../components/MemoriesList";

const index = () => {
  // get router object
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [query, setQuery] = useState("");

  // change query state whenever the router changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => setQuery(router.query.query), [router]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const list = useSelector((state) => state.memories.list);
  console.log(list);

  return (
    <>
      <div>
        <MemoriesList
          memories={list.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )}
        />
      </div>
    </>
  );
};

export default index;
