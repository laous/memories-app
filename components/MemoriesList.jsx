import styled from "styled-components";
import MemorieCard from "./MemorieCard";

const MemoriesList = ({ memories }) => {
  return (
    <Container>
      {memories.map((memorie) => (
        <MemorieCard memorie={memorie} key={memorie._id} />
      ))}
    </Container>
  );
};

export default MemoriesList;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 2rem 1rem;
`;
