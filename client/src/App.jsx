function App() {
  return (
    <div className="min-h-screen bg-brand-yellow flex flex-col items-center justify-center p-10">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-4xl text-brand-dark font-bold mb-4">
          Simplify your health.
        </h1>
        <p className="text-gray-600 mb-8">
          Tailwind v4 is successfully installed and the custom colors are working!
        </p>
        <button className="bg-brand-dark text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors">
          Start the quiz!
        </button>
      </div>
    </div>
  )
}

export default App