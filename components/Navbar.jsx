import Image from "next/image";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        {/* <Logo src="/images/logo.png" width="50px" height="50px" alt="Logo" /> */}
        <h1>Memories</h1>
        <Search>
          <Icon>
            <AiOutlineSearch />
          </Icon>

          <input type="text" placeholder="Searching for a memorie?" />
        </Search>
        <Link href="/AddMemorie" passHref>
          <NewButton>New Memorie {">"}</NewButton>
        </Link>
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
`;
