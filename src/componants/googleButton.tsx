export default function GoogleButton() {
    return (
        <button
            className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            onClick={() => (window.location.href = "http://localhost:3000/auth/google/login")}>
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Login with Google</span>
        </button>
    );
}
