import { createContext, useContext } from "react";

const AuthContext = createContext()

function AuthProvider({children}) {
   return <AuthContext.Provider>
    {children}
   </AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}