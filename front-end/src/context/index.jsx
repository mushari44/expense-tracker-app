import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const GlobalContext = createContext(null);

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
  async function fetchAllTransactions() {
    try {
      const response = await axios.get(
        "https://expense-tracker-server.mushari-alothman.uk/"
      );
      const data = await response.data;
      setAllTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAllTransactions();
  }, []);
  async function handleFormSubmit(currentFormData) {
    if (!currentFormData.description || !currentFormData.amount) return;
    const { type, description, amount } = currentFormData;
    try {
      await axios.post(
        "https://expense-tracker-server.mushari-alothman.uk/addTransaction",
        {
          type,
          description,
          amount,
        }
      );
      fetchAllTransactions();
    } catch (error) {
      console.log(error);
    }
  }
  async function resetTransactions() {
    try {
      await axios.delete(
        "https://expense-tracker-server.mushari-alothman.uk/resetTransactions"
      );
      fetchAllTransactions();
    } catch (error) {
      console.log(error);
    }
  }
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
