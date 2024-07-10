export default function ExpenseView({ type, data }) {
  return (
    <div className="flex-1 w-full bg-white mr-4 mt-10 p-5 pb-4 border border-gray-100 rounded-lg">
      <div className="flex justify-center items-center">
        <h2
          className={`text-lg ${
            type === "income" ? "text-blue-700" : "text-red-700"
          } text-center`}
        >
          {type === "income" ? "Income" : "Expense"}
        </h2>
      </div>
      {data.map((item) => (
        <div
          key={item._id}
          className={`flex justify-between items-center mt-4 border p-4 rounded-md ${
            type === "expense"
              ? "bg-red-50 border-red-100"
              : "bg-blue-50 border-blue-100"
          }`}
        >
          <div className="flex items-center">
            <span className="ml-3 font-bold text-gray-600">
              {item.description}
            </span>
          </div>
          <span>${item.amount}</span>
        </div>
      ))}
    </div>
  );
}
