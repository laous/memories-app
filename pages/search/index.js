import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemoriesList from "../../components/MemoriesList";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [query, setQuery] = useState("");
  const queryParams = new URLSearchParams();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    queryParams = new URLSearchParams(window.location.search);
    setQuery(queryParams.get("query"));
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const list = useSelector((state) => state.memories.list);

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
