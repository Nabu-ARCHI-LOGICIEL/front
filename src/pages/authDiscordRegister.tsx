import { useEffect, useState } from "react";

export default function RegisterDiscord() {
	const [info, setInfo] = useState<any>(null);
	const [username, setUsername] = useState("");
	const [given_name, setGiven_name] = useState("");
	const [family_name, setFamily_name] = useState("");
	const [error, setError] = useState("");
	const tempId = new URLSearchParams(location.search).get("tempId") ?? "";

	useEffect(() => {
		if (!tempId) {
			setError("Lien invalide");
			return;
		}
		fetch(`http://localhost:3000/auth/discord/temp?tempId=${tempId}`)
			.then((r) => r.json())
			.then((d) => {
				setInfo(d);
				setUsername(d?.username || "");
			})
			.catch(() => setError("Impossible de charger les infos"));
	}, [tempId]);

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		const res = await fetch("http://localhost:3000/auth/discord/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ tempId, username, given_name, family_name}),
		});
		if (!res.ok) {
			const err = await res.json().catch(() => ({}));
			setError(err.error || "Erreur d'inscription");
			return;
		}
		const { token } = await res.json();
		localStorage.setItem("token", token);
		location.href = "/profile";
	}

	if (error) return <p>{error}</p>;
	if (!info) return <p> Chargement...</p>;

	return (
		<div style={{ maxWidth: 420, margin: "40px auto" }}>
			<h2>Bienvenue {info.username}</h2>
			<p>{info.email}</p>
			<br /><br />
			<form onSubmit={submit}>
				<label>Ton pseudo :</label>
				<input
					type="text"
					placeholder={info.username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<br />
				<label>Ton prenom :</label>
				<input
					type="text"
					placeholder="Erwan"
					onChange={(e) => setGiven_name(e.target.value)}
					required
				/>
				<br />
				<label>Ton nom :</label>
				<input
					type="text"
					placeholder="SINCK"
					onChange={(e) => setFamily_name(e.target.value)}
					required
				/>
				<br /><br />
				<button type="submit">Continuer</button>
			</form>
		</div>
	);
}
