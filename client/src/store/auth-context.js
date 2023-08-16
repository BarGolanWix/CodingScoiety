import { createContext } from "react";

import ReactDOM from "react-dom";

const AuthContext = createContext({ admitted: "", setAdmitted: "" });

export default AuthContext;
