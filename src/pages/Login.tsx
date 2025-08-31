import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";

function Login() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <Logo />
      </div>
      <h4 className="text-2xl font-bold text-gray-900 mb-8">
        Log in to your account
      </h4>
      <LoginForm />
    </main>
  );
}

export default Login;
