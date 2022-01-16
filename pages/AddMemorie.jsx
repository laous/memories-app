import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AddMemorie = () => {
  const router = useRouter();
  function delay(n) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
  }

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const handleUpload = () => {
    const sotrageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();

    await delay(5);
    console.log("after delay");

    const memorie = {
      name: name,
      title: title,
      desc: desc,
      hashtag: hashtag,
      image: image,
    };

    console.log(memorie);
    await axios
      .post("http://localhost:3000/api/memorie", memorie)
      .then(() => router.push("/"))
      .catch(() => alert("Error!"));

    setName("");
    setDesc("");
    setHashtag("");
    setTitle("");
    setImage("");
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
        <Item>
          {" "}
          <label>Your Name</label>
          <label>Title</label>
          <label>Image</label>
          <label>Description</label>
          <label>HashTags</label>
        </Item>
        <Item>
          {" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            onc
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <input
            type="text"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            required
          />
        </Item>

        <Button type="submit" value={"Add"} />
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
    justify-content: space-evenly;
    align-content: center;
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

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1.5rem;
  align-items: center;

  label {
    text-align: center;
  }
`;

const Button = styled.input`
  padding: 0.7rem 2rem;
  font-size: 16px;
  background-color: white;
  color: black;
  width: 10%;
  align-self: center;
  cursor: pointer;
`;
