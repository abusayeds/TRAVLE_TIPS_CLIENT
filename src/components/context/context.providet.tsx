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
}
const UserContext = createContext<IUserProviderValues | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

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
      console.error("Failed to fetch votes", error);
    }
  };

  useEffect(() => {
    reFactehUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ reFactehUser, user, setUser, isLoading, setIsLoading }}
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
