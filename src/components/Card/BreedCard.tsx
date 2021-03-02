import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SavedDog, useDogsTeam, useFetch } from "../../hooks";

interface BreedCardProps {
  breed: string;
  addToTeam?: boolean;
  image?: string;
}

interface BreedImageResponse {
  message: string;
}

export const BreedCard: FunctionComponent<BreedCardProps> = ({
  breed,
  addToTeam,
  image,
}) => {
  const { status, fetchedData: breedImage } = useFetch<BreedImageResponse>(
    `https://dog.ceo/api/breed/${breed}/images/random`,
    !image
  );
  const { dogsTeam, setDogsTeam } = useDogsTeam();

  const [isAlreadyInTeam, setIsAlreadyInTeam] = useState(false);

  const switchTeam = () => {
    const sameBreedDogsInTheTeam = dogsTeam.filter(
      (dogTeammate) => dogTeammate.breed === breed
    ).length;

    if (
      !isAlreadyInTeam &&
      (dogsTeam.length >= 10 || sameBreedDogsInTheTeam >= 3)
    )
      return;

    if (!image) return;

    const newDogsTeam: SavedDog[] = isAlreadyInTeam
      ? dogsTeam.filter((dogTeammate) => dogTeammate.image !== image)
      : [...dogsTeam, { breed, image }];

    setDogsTeam(newDogsTeam);
  };

  useEffect(() => {
    if (!dogsTeam) return;

    setIsAlreadyInTeam(
      dogsTeam.some((dogTeammate) => dogTeammate.image === image)
    );
  }, [dogsTeam, breed, image]);

  return (
    <Card>
      {(status === "resolved" && breedImage) || image ? (
        <>
          <BreedName>{breed}</BreedName>
          <img src={image || breedImage?.message} alt={`${breed} breed`} />

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
