import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';  // ✅ Import Redux Provider
import store from './redux/store.js'; // ✅ Import your Redux store

import Layout from './components/shared/Layout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';

// Newly added components
import Courses from './components/Courses';
import Messaging from './components/Messaging';
import Favorites from './components/Favorites';
import Feedback from './components/Feedback';
import UserNotifications from "./components/UserNotifications";

// ✅ Define routes with Layout
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/description/:id', element: <JobDescription /> },
      { path: '/browse', element: <Browse /> },
      { path: '/profile', element: <Profile /> },
      { path: '/courses', element: <Courses /> },
      { path: '/messages', element: <Messaging /> },
      { path: '/favorites', element: <Favorites /> },
      { path: '/feedback', element: <Feedback /> },
      { path: '/notifications', element: <UserNotifications /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },

  // Admin routes
  { path: "/admin/companies", element: <ProtectedRoute><Companies /></ProtectedRoute> },
  { path: "/admin/companies/create", element: <ProtectedRoute><CompanyCreate /></ProtectedRoute> },
  { path: "/admin/companies/:id", element: <ProtectedRoute><CompanySetup /></ProtectedRoute> },
  { path: "/admin/jobs", element: <ProtectedRoute><AdminJobs /></ProtectedRoute> },
  { path: "/admin/jobs/create", element: <ProtectedRoute><PostJob /></ProtectedRoute> },
  { path: "/admin/jobs/:id/applicants", element: <ProtectedRoute><Applicants /></ProtectedRoute> },
  { path: "/admin/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
]);

function App() {
  return (
    <Provider store={store}>  {/* ✅ Wrap with Redux Provider */}
      <main aria-live="polite">
        <RouterProvider router={appRouter} />
      </main>
    </Provider>
  );
}

export default App;
