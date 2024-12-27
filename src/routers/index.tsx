import { createBrowserRouter } from "react-router-dom";
import * as RouteComponent from '../routers/route-components';
import { ROUTESCONSTANT } from "../routes/routesConstant";

export const AppRouters = createBrowserRouter([
  // {
  //   path: ROUTESCONSTANT.FORM_PAGE, // Main component for Goal Page
  //   element: <RouteComponent.form />,
  // },
  {
    path: ROUTESCONSTANT.DASHBOARD_PAGE, // Main component for Goal Page
    element: <RouteComponent.SoftwareDashboard/>,
  },
  {
    path: ROUTESCONSTANT.LOGIN_PAGE, // Main component for Goal Page
    element: <RouteComponent.Login/>,
  },
  {
    path: ROUTESCONSTANT.DEMO_PAGE, // Main component for Goal Page
    element: <RouteComponent.demo/>,
  },
  // {
  //   path: ROUTESCONSTANT.NAVBAR_PAGE, // Main component for Goal Page
  //   element: <RouteComponent.Navbar/>,
  // },
  
]);
