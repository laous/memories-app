import Image from "next/image";
import styled from "styled-components";
import Cover from "../public/images/cover.jpg";

const HomeImage = () => {
  return (
    <Container>
      <Image
        src="/images/cover.jpg"
        alt="Memories"
        height={"400px"}
        width="1000px"
        id="#banner"
        objectFit="cover"
      />
    </Container>
  );
};

export default HomeImage;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  #banner {
    min-width: 400px;
    min-height: 400px;
    object-fit: cover;
  }
`;
