import { useEffect, useState } from "react";

type tempInfo = {
    username:string,
    email:string,
    haveGoogle:boolean,
}

export default function TempAddDiscord() {
    const [info, setInfo] = useState<tempInfo>();
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const tempId = new URLSearchParams(location.search).get("tempId") ?? "";

    useEffect(() => {
        if (!tempId) {
            setError("Lien invalide");
            return;
        }
        fetch(`http://localhost:3000/auth/discord/tempadd?tempId=${tempId}`)
            .then((r) => r.json())
            .then((d) => {
                setInfo(d);
                setUsername(d?.username || "");
            })
            .catch(() => setError("Impossible de charger les infos"));
    }, [tempId]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/auth/discord/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tempId }),
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
            <br />
            <p> Vous avez deja un compte Nabu {info.haveGoogle ? "(avec google)" : ""} : {info.email}</p>
            <br />
            <br />
            <p>Synchroniser votre compte discord a votre compte Nabu :</p>
            <form className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onSubmit={submit}>
                <button type="submit">continuer</button>
            </form>
        </div>
    );
}
