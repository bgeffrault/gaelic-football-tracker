import { useContext, useState, createContext } from "react";

const ClubIdContext = createContext<number>(undefined);
const SetClubIdContext =
  createContext<React.Dispatch<React.SetStateAction<number>>>(undefined);

export function ClubIdProvider({ children }) {
  const [clubId, setClubId] = useState<number>(3);

  return (
    <SetClubIdContext.Provider value={setClubId}>
      <ClubIdContext.Provider value={clubId}>{children}</ClubIdContext.Provider>
    </SetClubIdContext.Provider>
  );
}

export const useClubIdContext = () => useContext(ClubIdContext);
