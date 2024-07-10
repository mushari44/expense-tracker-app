import TransactionForm from "../add-transaction";
import TransactionChartSummary from "../charts";

export default function Summary({
  isOpen,
  onClose,
  totalExpense,
  totalIncome,
}) {
  return (
    <div className="p-6 border border-gray-100 overflow-hidden rounded-2xl bg-white flex mt-2">
      <div className="w-full flex justify-center items-center flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
        <div className="flex-1 w-full flex flex-col items-center justify-evenly  sm:ml-20 sm:mr-2">
          <h1 className="text-md mb-4 text-gray-600 font-bold text-xl">
            Balance is {totalIncome - totalExpense}
          </h1>
          <div className="flex justify-evenly items-center bg-gray-50 w-full   h-24 border border-gray-100">
            <div className="flex flex-col">
              <p className="text-gray-600 ">Total Income</p>

              <h2 className="text-gray-700 text-lg">{totalIncome}$</h2>
            </div>
          </div>
          <div className="flex justify-evenly items-center bg-gray-50 w-full h-24 border border-gray-100">
            <div className="flex flex-col">
              <p className="text-gray-600">Total Expense</p>

              <h2 className="text-gray-700 text-lg">{totalExpense}$</h2>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-10 -ml-10 w-72 h-72  items-center justify-center">
          <h2>
            <TransactionChartSummary
              expense={totalExpense}
              income={totalIncome}
            />
          </h2>
        </div>
      </div>
      <TransactionForm onClose={onClose} isOpen={isOpen} />
    </div>
  );
}
