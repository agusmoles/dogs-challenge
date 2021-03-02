import { useLocalStorage } from ".";

export interface SavedDog {
  image: string;
  breed: string;
}

export const useDogsTeam = () => {
  const [dogsTeam, setDogsTeam] = useLocalStorage<SavedDog[]>("dogs-team", []);

  return { dogsTeam, setDogsTeam };
};
