import { NavLink, Outlet } from "react-router-dom";
import { FaBox, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation for large devices.......... */}
      <aside className="w-64 bg-white shadow-lg p-5 hidden md:block">
        <h2 className="text-xl font-bold mb-5">Dashboard</h2>
        <nav className="space-y-3">
          <NavLink
            to="/"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"
          >
            <FaBox /> All Products
          </NavLink>
          <NavLink
            to="/dashboard/all-user"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"
          >
            <FaUsers /> All Users
          </NavLink>
        </nav>
      </aside>
      {/* Mobile Screen Bottom Navigation */}
      <div className="md:hidden z-50 fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-3">
        <NavLink to="/" className="flex flex-col items-center">
          <FaBox />
          <span className="text-xs">Products</span>
        </NavLink>
        <NavLink
          to="/dashboard/all-user"
          className="flex flex-col items-center"
        >
          <FaUsers />
          <span className="text-xs">Users</span>
        </NavLink>
      </div>
      {/* Main Content based on navigation items */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
