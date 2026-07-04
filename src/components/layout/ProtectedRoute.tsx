import { ReactNode } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, isLoading } = UserAuth();

	if (isLoading) {
		return (
			<div className="w-full h-screen flex items-center justify-center bg-black">
				<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600" />
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
