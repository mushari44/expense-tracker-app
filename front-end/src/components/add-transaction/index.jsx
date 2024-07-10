import { useState, useContext } from "react";
import { GlobalContext } from "../../context";

export default function TransactionForm({ onClose, isOpen }) {
  const { formData, setFormData, handleFormSubmit } = useContext(GlobalContext);
  const [error, setError] = useState("");

  function handleFormChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isNaN(formData.amount) || formData.amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    handleFormSubmit(formData);
    setFormData({
      type: "expense",
      amount: "",
      description: "",
    });
    onClose();
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full z-50">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Transaction</h2>
              <button type="button" className="text-gray-500" onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter Description
              </label>
              <input
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Transaction description"
                name="description"
                type="text"
                onChange={handleFormChange}
                value={formData.description}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 ">
                Enter Amount
              </label>
              <input
                className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Transaction amount"
                name="amount"
                type="number"
                onChange={handleFormChange}
                value={formData.amount}
              />
              {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
            <div className="mt-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={handleFormChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />

                <label
                  htmlFor="income"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Income
                </label>
              </div>
              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  id="expense"
                  name="type"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={handleFormChange}
                  className="active:text-red-500 hover:ring-8 h-4 w-4  border-gray-300"
                />
                <label
                  htmlFor="expense"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Expense
                </label>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-end border-t border-gray-200">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Add
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
