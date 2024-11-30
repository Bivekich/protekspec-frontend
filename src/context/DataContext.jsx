import { createContext, useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [globalData, setGlobalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const value = {
    globalData,
    setGlobalData,
    isLoading,
    setIsLoading,
    isPageLoading,
    setIsPageLoading,
  };

  return (
    <DataContext.Provider value={value}>
      {(isLoading || isPageLoading) && (
        <div className="fixed inset-0 bg-white z-[9999] flex justify-center items-center">
          <ClipLoader color="#FAC612" size={60} />
        </div>
      )}
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);
