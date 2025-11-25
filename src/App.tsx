import {
	Routes,
	Route,
	Link,
	useNavigate,
	useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AuthSuccess from "./pages/authsuccess";
import RegisterGoogle from "./pages/authGoogleRegister";
import Admin from "./pages/Admin";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);

	function handleLogout() {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		navigate("/login");
	}

	const hideNav = location.pathname === "/admin";

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800">
			{!hideNav && (
				<nav className="flex justify-between items-center bg-white px-6 py-3 shadow-sm mb-6">
					<div className="space-x-4">
						<Link to="/" className="hover:underline">
							Accueil
						</Link>
						|
						{!isLoggedIn && (
							<Link to="/login" className="hover:underline">
								Connexion
							</Link>
						)}
						{isLoggedIn && (
							<Link to="/profile" className="hover:underline">
								Profil
							</Link>
						)}
					</div>
					{isLoggedIn && (
						<button
							onClick={handleLogout}
							className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
						>
							Logout
						</button>
					)}
				</nav>
			)}

			<main className="px-6">
				<Routes>
					<Route
						path="/"
						element={
							<h1 className="text-2xl font-semibold">
								Bienvenue 👋
							</h1>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/auth/success" element={<AuthSuccess />} />
					<Route path="/auth/register" element={<RegisterGoogle />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</main>
		</div>
	);
}
