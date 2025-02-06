import { Outlet } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const ParentLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default ParentLayout;
