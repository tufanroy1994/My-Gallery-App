import React, { createContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

// Define the shape of the decoded JWT payload
interface DecodedToken {
  userId: string;
  // add other fields from your token if needed
}

// Define the context value shape
interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          const decoded = jwtDecode<DecodedToken>(storedToken);
          setUserId(decoded.userId);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
