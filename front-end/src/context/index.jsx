import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const GlobalContext = createContext(null);

const API_BASE_URL = "https://expense-tracker-server.mushari-alothman.uk";

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    description: "",
  });

  const [value, setValue] = useState("expense");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [allTransactions, setAllTransactions] = useState([]);

  const fetchAllTransactions = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      setAllTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllTransactions();
  }, [fetchAllTransactions]);

  const handleFormSubmit = useCallback(
    async (currentFormData) => {
      if (!currentFormData.description || !currentFormData.amount) return;

      const { type, description, amount } = currentFormData;

      try {
        await axios.post(`${API_BASE_URL}/addTransaction`, {
          type,
          description,
          amount,
        });
        fetchAllTransactions();
      } catch (error) {
        console.error("Failed to add transaction:", error);
      }
    },
    [fetchAllTransactions]
  );

  const resetTransactions = useCallback(async () => {
    try {
      await axios.delete(`${API_BASE_URL}/resetTransactions`);
      fetchAllTransactions();
    } catch (error) {
      console.error("Failed to reset transactions:", error);
    }
  }, [fetchAllTransactions]);

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        totalExpense,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
        value,
        setValue,
        allTransactions,
        setAllTransactions,
        handleFormSubmit,
        resetTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
