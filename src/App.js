import Registration from "./pages/Registration/Registration.jsx";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/Layout/NotFound.js";
import Home from "./components/Home/Home.js";
import Header from "./components/Layout/Header.js";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import Createjob from "./components/Createjob/Createjob.js";
import Showjob from "./components/Showjob/Showjob.js";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { loadUser } from "./redux/actions/user";
import { ProtectedRoute } from "protected-route-react";
import Loader from "./components/Layout/Loader.js";


function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);


  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Toaster toastOptions={{ duration: 5000 }} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createjob" element={<Createjob />} />
            <Route path="/editjob/:id" element={<Createjob edit={true} />} />
            
            <Route
              path="/job/:id"
              element={
                <>
                  <Header />
                  <Showjob />
                </>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
