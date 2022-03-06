import React from "react";
import { useSelector } from "react-redux";
import MemoriesList from "../../components/MemoriesList";

const index = () => {
  const query = "";
  const queryParams = new URLSearchParams(window.location.search);
  query = queryParams.get("query");

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
