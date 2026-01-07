import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format");
    }

    // Mock login - in real app, call API
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );
    if (!foundUser) {
      throw new Error("Incorrect credentials");
    }

    const userData = { name: foundUser.name, email: foundUser.email };
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Mock signup - in real app, call API
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const existingUser = users.find((u: any) => u.email === email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = { name, email, password };
    users.push(newUser);
    await AsyncStorage.setItem("users", JSON.stringify(users));

    const userData = { name, email };
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
