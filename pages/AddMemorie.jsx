import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const AddMemorie = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [hashtag, setHashtag] = useState("");

  const handleSubmit = () => {
    const memorie = {
      name,
      title,
      desc,
      hashtag,
    };
  };

  return (
    <Container>
      <Top>
        <h1>Add new Memorie!</h1>
        <Link href={"/"} passHref>
          Back Home
        </Link>
      </Top>

      <form>
        <label>Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label>HashTags</label>
        <input
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
        />
        <input type="submit" value={"Ajouter"} />
      </form>
    </Container>
  );
};

export default AddMemorie;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: teal;
  }
`;
