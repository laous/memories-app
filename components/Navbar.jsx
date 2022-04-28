import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { BsPlusCircleFill } from "react-icons/bs";

const Navbar = ({ term }) => {
  const { data: session, status } = useSession();
  console.log(session);

  const [query, setQuery] = useState(!term ? "" : term);

  const router = useRouter();

  const handleChange = (e) => {
    setQuery(e.target.value);
    router.push(`/search?query=${e.target.value}`, undefined, {
      shallow: true,
    });
  };

  return (
    <header className="flex justify-between items-center my-4">
      <span className="text-2xl text-gray-700 uppercase tracking-wider cursor-pointer font-medium">
        <Link href={"/"} passHref>
          Memories
        </Link>
      </span>
      <div className="w-1/3 hidden md:flex justify-between items-center bg-white rounded-sm py-3">
        <input
          type="text"
          className="w-full outline-none border-none bg-transparent  px-5 pl-4 text-sm"
          placeholder="Search by username"
          onChange={(e) => handleChange(e)}
          value={query}
        />
        <div className="flex items-center justify-center h-full  px-3 cursor-pointer text-gray-700 self-end">
          <AiOutlineSearch className="w-5 h-5" />
        </div>
      </div>

      {session ? (
        <div className="flex items-center justify-center gap-6">
          <Link href={"/add-memorie"} passHref>
            <BsPlusCircleFill className="w-8 h-8 text-gray-700 cursor-pointer" />
          </Link>

          <button
            className="px-5 py-1.5 bg-gray-700 text-white rounded-md"
            onClick={async () => {
              await signOut();
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <>
          {" "}
          <button
            className="px-5 py-1.5 bg-gray-700 text-white rounded-md"
            onClick={async () => {
              await signIn();
            }}
          >
            Login
          </button>
        </>
      )}
    </header>
  );
};
export default Navbar;
