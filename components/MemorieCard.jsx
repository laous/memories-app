import styled from "styled-components";

const MemorieCard = ({ memorie }) => {
  const nbLikes = Math.floor(Math.random() * 100);
  return (
    <Container>
      <Part1 img={memorie.image}>
        <Text>{memorie.name}</Text>
      </Part1>
      <Part2>
        <Title>
          <span>#{memorie.hashtag}</span>
          <h1>{memorie.title}</h1>
        </Title>
        <p>{memorie.desc}</p>
        <p>{nbLikes} Likes</p>
      </Part2>
    </Container>
  );
};

export default MemorieCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 460px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  width: 332px;
  transition: all ease 0.4s;
  border-radius: 10px;

  :hover {
    transform: translateY(-3%);
  }
`;
const Part1 = styled.div`
  height: 100%;
  position: relative;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
`;

const Text = styled.div`
  position: absolute;
  top: 10px;
  left: 18px;
`;

const Part2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  p {
    font-size: 16px;
  }
  span {
    font-size: 12px;
  }
`;
const Title = styled.div`
  h1 {
    font-size: 20px;
  }
`;
