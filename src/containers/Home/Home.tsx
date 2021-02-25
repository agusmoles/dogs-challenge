import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Input } from "../../components";
import { BreedCard } from "../../components/Card/BreedCard";
import { useFetch } from "../../hooks";

interface AllBreedsResponse {
  message: Record<string, string>;
}

const Home: FunctionComponent = () => {
  const [searchedBreed, setSearchedBreed] = useState("");
  const { fetchedData: allBreedsData } = useFetch<AllBreedsResponse>(
    "https://dog.ceo/api/breeds/list/all"
  );
  const [allBreedsNames, setAllBreedsNames] = useState<string[]>([]);

  const onBreedChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchedBreed(value);
  };

  useEffect(() => {
    if (!allBreedsData) return;

    setAllBreedsNames(Object.keys(allBreedsData.message));
  }, [allBreedsData]);

  return (
    <Container>
      <div>
        <Input
          label="Search a breed"
          type="text"
          value={searchedBreed}
          onChange={onBreedChange}
        />
      </div>

      {allBreedsNames && (
        <BreedsList>
          {allBreedsNames.map((breedName) => (
            <BreedCard key={breedName} breed={breedName} />
          ))}
        </BreedsList>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const BreedsList = styled.div`
  padding: 25px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  gap: 25px 15px;
`;

export default Home;
