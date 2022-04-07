import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

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
    <Container>
      <Wrapper>
        <Link href={"/"} passHref>
          <h1 style={{ cursor: "pointer" }}>Memories</h1>
        </Link>
        <Search>
          <Icon>
            <AiOutlineSearch />
          </Icon>
          <input
            type="text"
            placeholder="Searching for a memorie?"
            value={query}
            onChange={(e) => handleChange(e)}
          />
        </Search>

        {session ? (
          <NewButton
            onClick={async () => {
              await signOut();
            }}
          >
            Sign out
          </NewButton>
        ) : (
          <NewButton
            onClick={async () => {
              await signIn();
            }}
          >
            Login
          </NewButton>
          // <p>LL</p>
        )}
      </Wrapper>
    </Container>
  );
};
export default Navbar;

const Container = styled.header`
  height: 70px;
  width: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// const Logo = styled(Image)``;
const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  input {
    outline: none;
    border: none;
    background-color: #f0f0f0;
    color: black;
    padding: 0.5rem 1rem;
    height: 42px;
    width: 500px;
    border-radius: 0 5px 5px 0;
  }

  @media screen and (max-width: 948px) {
    display: none;
  }
`;

const Icon = styled.div`
  height: 42px;
  padding: 0.6rem 0.8rem;
  background-color: #444444;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-size: 1rem;
  color: white;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
`;
const NewButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 17px;
  cursor: pointer;
  padding: 5px 10px;
  transition: all 0.3s ease;

  :hover {
    border: 1px solid black;
    transform: skewY(10%);
  }
`;
