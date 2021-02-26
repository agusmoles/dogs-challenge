import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFetch, useLocalStorage } from "../../hooks";

interface BreedCardProps {
  breed: string;
  subBreed?: string;
  addToTeam?: boolean;
}

interface BreedImageResponse {
  message: string;
}

export const BreedCard: FunctionComponent<BreedCardProps> = ({
  breed,
  subBreed,
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

  const switchTeam = () => {
    const sameBreedDogsInTheTeam = breedsTeam.filter((breedName) =>
      breedName.startsWith(breed)
    ).length;

    if (
      !isAlreadyInTeam &&
      (breedsTeam.length >= 10 || sameBreedDogsInTheTeam >= 3)
    )
      return;

    const completeBreedName = subBreed ? `${breed}-${subBreed}` : breed;

    const newBreedsTeam = isAlreadyInTeam
      ? breedsTeam.filter((breedName) => breedName !== completeBreedName)
      : [...breedsTeam, completeBreedName];

    setBreedsTeam(newBreedsTeam);
  };

  useEffect(() => {
    if (!breedsTeam) return;
    const completeBreedName = subBreed ? `${breed}-${subBreed}` : breed;

    setIsAlreadyInTeam(
      breedsTeam.some((breedName) => completeBreedName === breedName)
    );
  }, [breedsTeam, breed, subBreed]);

  return (
    <Card>
      {status === "resolved" && breedImage ? (
        <>
          <BreedName>
            {breed} {subBreed && `- ${subBreed}`}
          </BreedName>
          <img src={breedImage.message} alt={`${breed} breed`} />

          {addToTeam ? (
            <button onClick={switchTeam}>
              {isAlreadyInTeam ? "Remove from team" : "Add to team"}
            </button>
          ) : (
            <Link to={`/${breed}`}>See breed</Link>
          )}
        </>
      ) : (
        <>Loading...</>
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
