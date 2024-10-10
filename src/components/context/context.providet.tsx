import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

import { IUser } from "../../types";
import { baseAPI } from "../../config/envConfig";
import { getToken } from "../utils/getToken";
import { verifyToken } from "../utils/VerifyToken";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  reFactehUser: () => Promise<void>;
  search: boolean;
  setSearch: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const reFactehUser = async () => {
    const token = await getToken();
    let res = null;

    if (token) {
      res = verifyToken(token as string);
    }
    try {
      const { data } = await axios.get(`${baseAPI}/single-user/${res!.id}`, {
        headers: {
          Authorization: token as string,
        },
      });

      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  // useEffect to call reFactehUser when isLoading changes
  useEffect(() => {
    if (isLoading) {
      reFactehUser().then(() => setIsLoading(false)); // Optionally, set loading to false after the fetch
    }
  }, [isLoading, user]); // reFactehUser will be called whenever isLoading changes

  return (
    <UserContext.Provider
      value={{
        reFactehUser,
        user,
        setUser,
        isLoading,
        setIsLoading,
        search,
        setSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === null || context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};
export default UserProvider;
