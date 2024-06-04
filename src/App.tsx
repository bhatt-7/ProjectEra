import React from "react";
import Navbar from "./components/common/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Footer from "./components/common/Footer";

import FriendRequest from "./pages/FriendRequest";
import Login from "./pages/Login";
import Myprofile from "./pages/Myprofile";
import CreateProject from "./pages/CreateProject";
import { NavbarDemo } from "./components/NavbarDemo";
//import VerifyEmail from './pages/VerifyEmail'
import Signup from "./pages/Signup";
import ProjectList from "./pages/ProjectList";
import OtpVerificationForm from "./components/Auth/OtpVerificationForm";
import SuccessPage from "./pages/Success";
import FriendConnect from "./pages/FriendConnect";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path='/verify-email' element={<VerifyEmail/>} ></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/friends" element={<FriendRequest />}></Route>
        <Route path="/friends-connect" element={<FriendConnect/>}></Route>
        <Route path="/dashboard/my-profile" element={<Myprofile />}></Route>
        <Route path="/project" element={<ProjectList />}></Route>
        <Route path="/contact-us" element={<Contact/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route
          path="/dashboard/create-project"
          element={<CreateProject />}
        ></Route>
        <Route path="/otp-verification" element={<OtpVerificationForm />} />{" "}
        {/* Add the route for OTP verification */}
        <Route path="/success" element={<SuccessPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
