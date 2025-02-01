import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AllTrainer from "../pages/AllTrainer";
import TrainerDetails from "../pages/TrainerDetails";
import BeATrainer from "../pages/BeATrainer";
import TrainerBooking from "../pages/TrainerBooking";
import Main from "../layout/Main";
import TrainerLogin from "../pages/trainer/TrainerLogin";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/sharedDash/Dashboard";
import NewsletterSubscribers from "../pages/admin/NewsletterSubscribers";
import AdminAllTrainers from "../pages/admin/AdminAllTrainers";
import AppliedTrainers from "../pages/admin/AppliedTrainers";
import ActivityLogs from "../pages/ActivityLogs";
import UserProfile from "../pages/UserProfile";
import AddClass from "../pages/admin/AddClass";
import AllClasses from "../pages/AllClasses";
import ClassDetails from "../pages/ClassDetails";
import TrainerDetailsFromClass from "../pages/TrainerDetailsFromClass";
import TrainerBookingPage from "../pages/TrainerBookingPage";
import Payment from "../pages/Payment";
import FinalPayment from "../pages/FinalPayment";
import ManageSlot from "../pages/trainer/ManageSlot";
import BookedTrainers from "../pages/BookedTrainers";
import AddForum from "../pages/AddForum";
import Forum from "../pages/Forum";
import ForumDetails from "../pages/ForumDetails";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import TrainerPrivateRoute from "./TrainerPrivateRoute";
import Balance from "../pages/admin/Balance";
import AddNewSlot from "../pages/trainer/AddNewSlot";
import PaymentSuccess from "../pages/PaymentSuccess";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/trainer-login",
        element: <TrainerLogin />,
      },
      {
        path: "/admin-login",
        element: <AdminLogin />,
      },
      {
        path: "/all-trainer",
        element: <AllTrainer />,
      },
      {
        path: "/trainer/:id",
        element: <TrainerDetails />,
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },
      {
        path: "/classes/:id",
        element: <ClassDetails />,
      },
      {
        path: "/book-trainer/:id",
        element: (
          <PrivateRoute>
            <TrainerBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/final-payment",
        element: (
          <PrivateRoute>
            <FinalPayment />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/trainers/:id",
        element: (
          <PrivateRoute>
            <TrainerDetailsFromClass />
          </PrivateRoute>
        ),
      },
      {
        path: "/booking/:id/:slotId",
        element: (
          <PrivateRoute>
            <TrainerBookingPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/be-a-trainer",
        element: (
          <PrivateRoute>
            <BeATrainer />
          </PrivateRoute>
        ),
      },
      {
        path: "/forums",
        element: <Forum />,
      },
      {
        path: "/forums/:id",
        element: <ForumDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/subscribers",
        element: (
          <AdminPrivateRoute>
            <NewsletterSubscribers />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-trainers",
        element: (
          <AdminPrivateRoute>
            <AdminAllTrainers />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/applied-trainers",
        element: (
          <AdminPrivateRoute>
            <AppliedTrainers />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/balance",
        element: <Balance />,
      },
      {
        path: "/dashboard/activity-logs",
        element: <ActivityLogs />,
      },
      {
        path: "/dashboard/profile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/add-class",
        element: (
          <AdminPrivateRoute>
            <AddClass />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-slot",
        element: (
          <TrainerPrivateRoute>
            <ManageSlot />
          </TrainerPrivateRoute>
        ),
      },
      {
        path: "/dashboard/booked-trainers",
        element: <BookedTrainers />,
      },
      {
        path: "/dashboard/forums",
        element: <AddForum />,
      },
      {
        path: "/dashboard/add-slot",
        element: <AddNewSlot />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
