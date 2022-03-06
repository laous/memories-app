import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const index = () => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    setQuery(queryParams.get("query"));
  }, []);

  return (
    <>
      <Navbar term={query} />
      <div>{query}</div>
    </>
  );
};

export default index;
