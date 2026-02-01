import { useContext } from "react";
import { ConnectionContext } from "./connection-context";

export const useConnection = () => {
  return useContext(ConnectionContext);
};
