import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
}

interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  trackingCode?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  addresses: Address[];
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 459.90,
    trackingCode: "BR123456789",
    items: [
      { productId: "1", name: "Blazer Oversized Premium", quantity: 1, price: 459.90, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800" }
    ]
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "shipped",
    total: 289.90,
    trackingCode: "BR987654321",
    items: [
      { productId: "3", name: "Vestido Midi Elegante", quantity: 1, price: 289.90, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800" }
    ]
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem("addresses");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders] = useState<Order[]>(mockOrders);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password.length >= 6) {
      const newUser = {
        id: "1",
        email,
        name: email.split("@")[0],
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password.length >= 6) {
      const newUser = { id: "1", email, name };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addAddress = useCallback((address: Omit<Address, "id">) => {
    const newAddress = { ...address, id: Date.now().toString() };
    setAddresses(prev => {
      const updated = [...prev, newAddress];
      localStorage.setItem("addresses", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateAddress = useCallback((id: string, address: Partial<Address>) => {
    setAddresses(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...address } : a);
      localStorage.setItem("addresses", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem("addresses", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const setDefaultAddress = useCallback((id: string) => {
    setAddresses(prev => {
      const updated = prev.map(a => ({ ...a, isDefault: a.id === id }));
      localStorage.setItem("addresses", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        addresses,
        orders,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
