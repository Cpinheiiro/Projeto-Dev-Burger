import { createContext, useContext, useState } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const userInfoLocalStorage = localStorage.getItem('devburger:userData');

    return userInfoLocalStorage ? JSON.parse(userInfoLocalStorage) : {};
  });

  const putUserData = (userData) => {
    setUserInfo(userData);

    localStorage.setItem('devburger:userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUserInfo({});

    localStorage.removeItem('devburger:userData');
  };

  return (
    <UserContext.Provider value={{ userInfo, putUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be a valid context');
  }
  return context;
};
