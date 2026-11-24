
import AuthLayout from "@/components/auth/auth-layout";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      description="Join GearUp and get access to quality equipment rentals."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
