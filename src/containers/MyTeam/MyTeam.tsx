import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BreedCard } from "../../components";
import { useDogsTeam } from "../../hooks";

const BreedPage: FunctionComponent = () => {
  const { dogsTeam } = useDogsTeam();

  return (
    <Container>
      <h1>My team</h1>

      {dogsTeam.length !== 0 ? (
        <BreedsList>
          {dogsTeam.map(({ breed, image }) => (
            <BreedCard breed={breed} image={image} addToTeam />
          ))}
        </BreedsList>
      ) : (
        <h2>You don't have a team yet!😞</h2>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 20px;
`;

const BreedsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 25px 0;
  width: 100%;
  gap: 25px 15px;
`;

export default BreedPage;
