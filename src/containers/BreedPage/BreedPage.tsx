import React, { FunctionComponent, useEffect, useState } from "react";
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
  const { fetchedData: subBreedsData } = useFetch<SubBreedsResponse>(
    `https://dog.ceo/api/breed/${breed}/list`
  );
  const [subBreedsNames, setSubBreedsNames] = useState<string[]>([]);

  useEffect(() => {
    if (!subBreedsData) return;

    setSubBreedsNames(subBreedsData.message);
  }, [subBreedsData]);

  return (
    <Container>
      <h1>{breed}</h1>

      {subBreedsNames && (
        <SubBreedsList>
          <BreedCard breed={breed} addToTeam />
          {subBreedsNames.map((subBreedName) => (
            <BreedCard
              key={subBreedName}
              breed={breed}
              subBreed={subBreedName}
              addToTeam
            />
          ))}
        </SubBreedsList>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 20px;
`;

const SubBreedsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 25px 0;
  width: 100%;
  gap: 25px 15px;
`;

export default BreedPage;
