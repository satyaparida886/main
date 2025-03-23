import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Travel Planner</h1>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium transition-all duration-300 ${
                isActive ? "text-yellow-300 border-b-2 border-yellow-300" : "hover:text-gray-200"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/results"
            className={({ isActive }) =>
              `text-lg font-medium transition-all duration-300 ${
                isActive ? "text-yellow-300 border-b-2 border-yellow-300" : "hover:text-gray-200"
              }`
            }
          >
            Results
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
