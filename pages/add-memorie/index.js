import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { IoMdCloseCircle } from "react-icons/io";

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
  const [imagePreview, setImagePreview] = useState("");

  const imagePreviewHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const [memorie, setMemorie] = useState({
    title: "",
    desc: "",
    hashtag: "",
    image: "",
    username: session.user.username,
    email: session.user.email,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Upload image to firebase
    const sotrageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    // Pause the upload
    // uploadTask.pause();

    // // Resume the upload
    // uploadTask.resume();

    // // Cancel the upload
    // uploadTask.cancel();

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setMemorie({ ...memorie, image: downloadURL });
        });
      }
    );
  };

  // submitting the post request after getting the link
  useEffect(() => {
    if (memorie.image) {
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
      <div className="flex flex-col md:flex-row align-center justify-center gap-10 my-16">
        <div className="flex h-96 items-center justify-center ">
          {imagePreview === "" ? (
            <label className="w-64 h-full flex flex-col justify-center items-center px-4 py-6 bg-gray-700 text-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-white hover:text-gray-700">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select an image
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  imagePreviewHandler(e);
                  setFile(e.target.files[0]);
                }}
              />
            </label>
          ) : (
            <div className="relative max-w-md h-96 flex flex-col justify-center items-center gap-1">
              <IoMdCloseCircle
                className=" text-gray-700 w-7 h-7 self-end cursor-pointer mr-2"
                onClick={() => {
                  setFile(null);
                  setImagePreview("");
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt=""
                className="rounded-md hover:scale-95 transition duration-500"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-stretch gap-8">
          <input
            type="text"
            value={memorie.title}
            onChange={(e) => setMemorie({ ...memorie, title: e.target.value })}
            required
            placeholder="Give your memorie a title"
            className="bg-gray-700 py-2 px-4 rounded-md text-white outline-none border-none"
          />{" "}
          <input
            type="text"
            value={memorie.hashtag}
            placeholder="Separate your tags with a comma ','"
            onChange={(e) =>
              setMemorie({ ...memorie, hashtag: e.target.value })
            }
            required
            className="bg-gray-700 py-2 px-4 rounded-md text-white outline-none border-none"
          />
          <textarea
            value={memorie.desc}
            onChange={(e) => setMemorie({ ...memorie, desc: e.target.value })}
            required
            cols={"50"}
            rows={"6"}
            placeholder="Tell us more about your memorie"
            className="bg-gray-700 py-2 px-4 rounded-md text-white outline-none border-none"
          />
          <button
            className="px-6 py-2 -mt-2 bg-white hover:bg-gray-700 text-gray-700 hover:text-white rounded-md max-w-xs self-center"
            onClick={handleSubmit}
          >
            Add memorie
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMemorie;

AddMemorie.auth = true;
