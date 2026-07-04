import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/layout/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import CloneWarningModal from "./components/common/CloneWarningModal";

const App = () => {
	return (
		<AuthContextProvider>
			<CloneWarningModal />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</AuthContextProvider>
	);
};

export default App;
