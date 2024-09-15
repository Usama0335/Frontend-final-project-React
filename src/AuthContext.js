import React, { createContext, useContext, useState } from 'react';

// Create a context object
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userType, setUserType] = useState(null); // Add state for user type

  const login = (token, userType) => {
    setAccessToken(token);
    setUserType(userType); // Set the userType in the context
  };

  const logout = () => {
    setAccessToken(null);
    setUserType(null); // Clear userType on logout
  };

  return (
    <AuthContext.Provider value={{ accessToken, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  console.log(context.accessToken);
  return context;
};
