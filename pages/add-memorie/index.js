import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

const AddMemorie = () => {
  // get session
  const { data: session, status } = useSession();

  //get router
  const router = useRouter();

  // get hostname for requests
  const hostname = process.env.NEXT_PUBLIC_SITE_URL;

  //image state
  const [file, setFile] = useState(null);

  //
  const [imageUploaded, setImageUploaded] = useState(false);

  const [memorie, setMemorie] = useState({
    title: "",
    desc: "",
    hashtag: "",
    image: "",
    username:session.user.username,
    email:session.user.email
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Upload image to firebase
    const sotrageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file)

    // Pause the upload
    // uploadTask.pause();

    // // Resume the upload
    // uploadTask.resume();

    // // Cancel the upload
    // uploadTask.cancel();

    uploadTask.on('state_changed',
    (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        }
    }, 
    (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
            // User canceled the upload
            break;

        // ...

        case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
    }, 
    async () => {
        // Upload completed successfully, now we can get the download URL
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        setMemorie({ ...memorie, image: downloadURL })
        });
    }
    );
  };

  // submitting the post request after getting the link
  useEffect( () => {
      if(memorie.image){
        axios
            .post(`${hostname}/api/memories`, memorie)
            .then(() => router.push("/"))
            .catch((error) => console.error(error.response.data));
      }

  }, [memorie.image, imageUploaded, hostname, memorie, router]);

  return (
    <>
      <Head>
        <title>Add new memorie</title>
        <meta
          name="description"
          content="Add the details of your new memorie."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <form onSubmit={handleSubmit}>
          <Item>
            {" "}
            <label>Title</label>
            <label>Image</label>
            <label>Description</label>
            <label>HashTags</label>
          </Item>
          <Item>
            {" "}
            <input
              type="text"
              value={memorie.title}
              onChange={(e) =>
                setMemorie({ ...memorie, title: e.target.value })
              }
              required
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              onc
            />
            <textarea
              value={memorie.desc}
              onChange={(e) => setMemorie({ ...memorie, desc: e.target.value })}
              required
              cols={"50"}
              rows={"6"}
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
    </>
  );
};

export default AddMemorie;

AddMemorie.auth = true;

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
