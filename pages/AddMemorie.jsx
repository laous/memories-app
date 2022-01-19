import Link from "next/link";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AddMemorie = () => {
  const router = useRouter();

  const [file, setFile] = useState(null);

  const [memorie, setMemorie] = useState({
    name: "",
    title: "",
    desc: "",
    hashtag: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Upload image to firebase
    const sotrageRef = ref(storage, `images/${file.name}`);
    await uploadBytesResumable(sotrageRef, file).then(() => alert("uploaded"));

    //get image link from firebase
    await getDownloadURL(sotrageRef)
      .then((downloadURL) => setMemorie({ ...memorie, image: downloadURL }))
      .then(() => console.log(memorie))
      .catch((e) => alert("ERROR " + e));
  };

  // submitting the post request after getting the link
  useEffect(() => {
    axios
      .post("https://memories-app-black.vercel.app/api/memorie", memorie)
      .then(() => router.push("/"))
      .catch(() => alert("Error!"));
  }, [memorie.image]);

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
            value={memorie.name}
            onChange={(e) => setMemorie({ ...memorie, name: e.target.value })}
            required
          />
          <input
            type="text"
            value={memorie.title}
            onChange={(e) => setMemorie({ ...memorie, title: e.target.value })}
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
            value={memorie.desc}
            onChange={(e) => setMemorie({ ...memorie, desc: e.target.value })}
            required
          />
          <input
            type="text"
            value={memorie.hashtag}
            onChange={(e) =>
              setMemorie({ ...memorie, hashtag: e.target.value })
            }
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
