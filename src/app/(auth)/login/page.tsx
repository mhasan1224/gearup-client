
import AuthLayout from "@/components/auth/auth-layout";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to your GearUp account to continue."
    >
      <LoginForm />
    </AuthLayout>
  );
}
