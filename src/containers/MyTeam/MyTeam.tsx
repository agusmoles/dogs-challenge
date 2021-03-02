import React, { Fragment, FunctionComponent } from "react";
import styled from "styled-components";
import { BreedCard } from "../../components";
import { useDogsTeam } from "../../hooks";

const BreedPage: FunctionComponent = () => {
  const { dogsTeam } = useDogsTeam();

  if (dogsTeam.length === 0) return <h2>You don't have a team yet!😞</h2>;

  const savedBreeds = dogsTeam.map(({ breed }) => breed);
  const unRepeatedBreeds = [...new Set(savedBreeds)].sort();

  return (
    <Container>
      <h1>My team</h1>

      {unRepeatedBreeds.map((breed) => (
        <Fragment key={breed}>
          <h2>{breed}</h2>
          <BreedsList>
            {dogsTeam
              .filter((dogTeammate) => dogTeammate.breed === breed)
              .map(({ image }) => (
                <BreedCard key={image} breed={breed} image={image} addToTeam />
              ))}
          </BreedsList>
        </Fragment>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 20px;

  h2 {
    padding-top: 20px;
  }
`;

const BreedsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 25px 0;
  width: 100%;
  gap: 25px 15px;
`;

export default BreedPage;
