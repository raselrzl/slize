export default function OutOfStockPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Some items are out of stock</h1>
      <p className="text-gray-700 mb-6">
        Please try again later or explore other products you might love.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full font-semibold shadow-md hover:from-gray-700 hover:to-gray-800 transition-all"
      >
        🛍️ Go Shopping
      </a>
    </div>
  );
}
