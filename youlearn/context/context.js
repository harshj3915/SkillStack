"use client";
import { createContext, useState, useContext } from "react";

const Context = createContext();

export function ContextProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    return (
        <Context.Provider value={{ searchQuery, setSearchQuery,searchResults, setSearchResults }}>
            {children}
        </Context.Provider>
    );
}

export function UseContext() {
    return useContext(Context);
}
