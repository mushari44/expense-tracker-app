import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import Summary from "../summary";
import ExpenseView from "../expense-view";

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const {
    totalExpense,
    allTransactions,
    setTotalExpense,
    totalIncome,
    setTotalIncome,
    resetTransactions,
  } = useContext(GlobalContext);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    allTransactions.forEach((item) => {
      item.type === "income"
        ? (income += parseFloat(item.amount))
        : (expense += parseFloat(item.amount));
    });

    setTotalExpense(expense);
    setTotalIncome(income);
    console.log("main use effect");
  }, []);

  return (
    <div className="text-center flex flex-col px-5">
      <div className="flex items-center justify-center mt-5 sm:mt-12 ">
        <h1 className="text-blue-400 text-xl  sm:text-6xl">Expense Tracker</h1>
      </div>
      <div className="flex items-end justify-end mr-4 mt-5">
        <button
          onClick={onOpen}
          className="bg-blue-300 text-black ml-4 sm:px-4 text-sm px-1 sm:text-base py-1 sm:py-2 rounded"
        >
          Add New Transaction
        </button>
        <button
          className=" bg-red-300 text-black ml-4 sm:px-4 text-sm px-1 sm:text-base py-1 sm:py-2 rounded"
          onClick={resetTransactions}
        >
          RESET
        </button>
      </div>
      {/* <div className="flex items-start justify-start "> */}

      {/* </div> */}
      <Summary
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        isOpen={isOpen}
        onClose={onClose}
      />
      <div className="w-full flex items-start justify-evenly flex-col lg:flex-row">
        <ExpenseView
          data={allTransactions.filter((item) => item.type === "expense")}
          type={"expense"}
        />
        <ExpenseView
          data={allTransactions.filter((item) => item.type === "income")}
          type={"income"}
        />
      </div>
    </div>
  );
}
