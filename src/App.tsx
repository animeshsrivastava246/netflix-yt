import { Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/layout/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import CloneWarningModal from "./components/common/CloneWarningModal";
import SplashScreen from "./components/common/SplashScreen";
import Search from "./pages/Search";

const App = () => {
	const [showSplash, setShowSplash] = useState(true);
	const handleSplashDone = useCallback(() => setShowSplash(false), []);

	return (
		<AuthContextProvider>
			{showSplash && <SplashScreen onDone={handleSplashDone} />}
			<div
				className={`transition-opacity duration-700 ease-in-out ${
					showSplash ? "opacity-0 pointer-events-none" : "opacity-100"
				}`}
			>
				<CloneWarningModal />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/search" element={<Search />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</AuthContextProvider>
	);
};

export default App;
