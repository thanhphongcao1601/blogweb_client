import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PostDetail from "./pages/PostDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Filter from "./pages/Filter";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postdetail/:postId" element={<PostDetail />} />
      </Routes>
    </>
  );
}

export default App;
