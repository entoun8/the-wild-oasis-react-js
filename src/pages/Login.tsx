import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";

function Login() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Main Login Card - matches your website's card styling */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Section */}
          <div className="px-8 py-6 text-center border-b border-slate-200/60">
            <div className="mb-4">
              <Logo />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">
              Sign in to your account to continue
            </p>
          </div>
          
          {/* Form Section */}
          <div className="px-8 py-6">
            <LoginForm />
          </div>
        </div>
        
        {/* Footer Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            © 2024 The Wild Oasis. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
