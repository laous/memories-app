import styled from "styled-components";
import Cover from "../public/images/cover.jpg";

const HomeImage = () => {
  return <Container img={"/images/cover.jpg"}></Container>;
};

export default HomeImage;

const Container = styled.section`
  width: 100%;
  min-height: 400px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
