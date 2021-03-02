import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BreedCard } from "../../components";
import { useFetch } from "../../hooks";

interface RouteParams {
  breed: string;
}

interface SubBreedsResponse {
  message: string[];
}

const BreedPage: FunctionComponent = () => {
  const { breed } = useParams<RouteParams>();
  const { fetchedData: breedImagesData } = useFetch<SubBreedsResponse>(
    `https://dog.ceo/api/breed/${breed}/images`
  );

  return (
    <Container>
      <h1>{breed}</h1>

      {breedImagesData && (
        <BreedsImages>
          {breedImagesData.message.map((dogImage) => (
            <BreedCard
              key={dogImage}
              image={dogImage}
              breed={breed}
              addToTeam
            />
          ))}
        </BreedsImages>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 20px;
`;

const BreedsImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 25px 0;
  width: 100%;
  gap: 25px 15px;
`;

export default BreedPage;
