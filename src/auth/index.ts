const AUTH_URL = "http://localhost:3000";

export const getCurrentUser = async () => {
	const token = localStorage.getItem("token");
	if (!token) throw new Error("Pas de token");
	const res = await fetch(`${AUTH_URL}/users/me`, {
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!res.ok) {
		localStorage.removeItem("token");
		throw new Error("Session expirée");
	}

	return res.json();
};
