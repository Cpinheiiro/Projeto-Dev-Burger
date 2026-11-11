import { UserProvider } from './UserContext.jsx';

const AppProvider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppProvider;
