import { useState } from 'react'
import '../src/styles/tailwind-base.css'

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Click Me
      </button>
    </div>
  );
}
export default App;