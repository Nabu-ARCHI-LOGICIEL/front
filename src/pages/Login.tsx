import DiscordButton from "@/componants/discordButton";
import GoogleButton from "@/componants/googleButton";
import { useState } from "react";

export default function Login() {

	return (
		<div>
			<h2>Connexion : </h2>
			<br />
			<GoogleButton/>
			<br />
			<DiscordButton/>
		</div>
	);
}
