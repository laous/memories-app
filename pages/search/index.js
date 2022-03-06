import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const index = () => {
  const query = "";
  if (window !== undefined) {
    const queryParams = new URLSearchParams(window.location.search);
    query = queryParams.get("query");
  }

  return (
    <>
      <div>{query}</div>
    </>
  );
};

export default index;
