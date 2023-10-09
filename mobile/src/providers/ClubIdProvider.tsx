import { useContext, useState, createContext } from "react";

// @ts-ignore
const ClubIdContext = createContext<number>();
// @ts-ignore
const SetClubIdContext = createContext<React.Dispatch<React.SetStateAction<number>>>();

export const ClubIdProvider = ({ children }) => {
    const [clubId, setClubId] = useState<number>(3)

    return (
        <SetClubIdContext.Provider value={setClubId}>
            <ClubIdContext.Provider value={clubId}>
                {children}
            </ClubIdContext.Provider>
        </SetClubIdContext.Provider>
    )

}

export const useClubIdContext = () => useContext(ClubIdContext)
