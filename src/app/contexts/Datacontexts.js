"use client";
import { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [createdPosts, setCreatedPosts] = useState([]);

  return (
    <DataContext.Provider value={{ createdPosts, setCreatedPosts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};