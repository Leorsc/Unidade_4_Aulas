import { useContext } from "react";
import UserContexyt from "../contexts/UserContext";

function useUser(valor) {
  return useContext(valor)
}

export default useUser;