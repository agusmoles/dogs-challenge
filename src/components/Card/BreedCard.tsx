import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { useFetch, useLocalStorage } from "../../hooks";

interface BreedCardProps {
  breed: string;
  addToTeam?: boolean;
}

interface BreedImageResponse {
  message: string;
}

export const BreedCard: FunctionComponent<BreedCardProps> = ({
  breed,
  addToTeam,
}) => {
  const { status, fetchedData: breedImage } = useFetch<BreedImageResponse>(
    `https://dog.ceo/api/breed/${breed}/images/random`
  );
  const [breedsTeam, setBreedsTeam] = useLocalStorage<string[]>(
    "breeds-team",
    []
  );
  const [isAlreadyInTeam, setIsAlreadyInTeam] = useState(false);

  const addBreedToTeam = () => {
    const newBreedsTeam = isAlreadyInTeam
      ? breedsTeam.filter((breedName) => breedName !== breed)
      : [...breedsTeam, breed];
    setBreedsTeam(newBreedsTeam);
  };

  useEffect(() => {
    if (!breedsTeam) return;

    setIsAlreadyInTeam(
      breedsTeam.findIndex((breedName) => breed !== breedName) !== -1
    );
  }, [breedsTeam, breed]);

  return (
    <Card>
      <BreedName>{breed}</BreedName>
      {status === "resolved" && breedImage ? (
        <img src={breedImage.message} alt={`${breed} breed`} />
      ) : (
        <>Loading...</>
      )}

      {addToTeam ? (
        <button onClick={addBreedToTeam}>
          {isAlreadyInTeam ? "Remove from team" : "Add to team"}
        </button>
      ) : (
        <a href={`/${breed}`}>See breed</a>
      )}
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  width: 250px;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;

  img {
    width: 100%;
    height: 190px;
    object-fit: cover;
  }

  a,
  button {
    text-align: center;
    padding: 15px;
    background: transparent;
    width: 100%;
    font-size: 16px;
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

const BreedName = styled.div`
  background: #fff;
  padding: 3px 5px;
  border-radius: 2px;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 13px;
`;
