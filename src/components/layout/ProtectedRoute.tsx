import { ReactNode } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user } = UserAuth();
	if (!user) {
		return <Navigate to="/" />;
	}
	return <>{children}</>;
};

export default ProtectedRoute;
