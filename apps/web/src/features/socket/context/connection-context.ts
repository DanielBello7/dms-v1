import { createContext } from "react";
import type { ConnectionType } from "./connection";

export const ConnectionContext = createContext({} as ConnectionType);
