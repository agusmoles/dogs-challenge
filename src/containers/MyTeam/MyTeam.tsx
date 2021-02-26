import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { BreedCard } from "../../components";
import { useLocalStorage } from "../../hooks";

const BreedPage: FunctionComponent = () => {
  const [breedsTeam] = useLocalStorage<string[]>("breeds-team", []);

  return (
    <Container>
      <h1>My team</h1>

      {breedsTeam && (
        <BreedsList>
          {breedsTeam.map((completeBreedName) => {
            const [breed, subBreed] = completeBreedName.split("-");
            return <BreedCard breed={breed} subBreed={subBreed} addToTeam />;
          })}
        </BreedsList>
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
