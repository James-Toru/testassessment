"use client";
import { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  return (
    <DataContext.Provider value={{ posts, setPosts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};