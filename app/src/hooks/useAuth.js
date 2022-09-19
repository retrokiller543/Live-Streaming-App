import { useContext } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const useAuth = () => {
  return useContext(useStateContext);
};

export default useAuth;
