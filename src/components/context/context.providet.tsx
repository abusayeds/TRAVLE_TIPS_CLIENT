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
  token: string | undefined;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  reFactehUser: () => Promise<void>;
  search: boolean;
  setSearch: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

const UserContext = createContext<IUserProviderValues | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | undefined>("");
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const reFactehUser = async () => {
    const token = await getToken();
    let res = null;

    if (token) {
      res = verifyToken(token as string);
    }
    try {
      const { data } = await axios.get(`${baseAPI}/single-user/${res?.id}`, {
        headers: {
          Authorization: token as string,
        },
      });

      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      reFactehUser().then(() => setIsLoading(false));
    }
  }, [isLoading, user]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
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
