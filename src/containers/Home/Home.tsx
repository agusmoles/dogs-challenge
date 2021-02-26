import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Input } from "../../components";
import { BreedCard } from "../../components";
import { useDebounce, useFetch } from "../../hooks";

interface AllBreedsResponse {
  message: Record<string, string>;
}

const Home: FunctionComponent = () => {
  const [searchedBreed, setSearchedBreed] = useState("");
  const debouncedSearchedBreed = useDebounce(searchedBreed, 350);
  const { fetchedData: allBreedsData } = useFetch<AllBreedsResponse>(
    "https://dog.ceo/api/breeds/list/all"
  );
  const [displayedBreeds, setDisplayedBreeds] = useState<string[]>([]);

  const onBreedChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearchedBreed(value);
  };

  useEffect(() => {
    if (!allBreedsData) return;

    const allBreeds = Object.keys(allBreedsData.message);
    setDisplayedBreeds(allBreeds);
  }, [allBreedsData]);

  useEffect(() => {
    if (!allBreedsData) return;

    const allBreeds = Object.keys(allBreedsData.message);

    debouncedSearchedBreed === ""
      ? setDisplayedBreeds(allBreeds)
      : setDisplayedBreeds(
          allBreeds.filter((breedName) =>
            breedName.startsWith(debouncedSearchedBreed)
          )
        );
  }, [debouncedSearchedBreed, allBreedsData]);

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

      {displayedBreeds && (
        <BreedsList>
          {displayedBreeds.map((breedName) => (
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
