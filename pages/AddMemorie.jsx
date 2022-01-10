import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddMemorie = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [hashtag, setHashtag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const memorie = {
      name: name,
      title: title,
      desc: desc,
      hashtag: hashtag,
    };
    if (name == "" || title == "" || desc == "" || hashtag == "") {
      return null;
    }

    await axios.post("http://localhost:3000/api/memorie", memorie);
    router.push("/");
  };

  return (
    <Container>
      <Top>
        <h1>Add new Memorie!</h1>
        <Link href={"/"} passHref>
          Back Home
        </Link>
      </Top>

      <form onSubmit={handleSubmit}>
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
