import LoginPages from "@/src/components/modules/LoginPages";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPages />
    </Suspense>
  );
};

export default LoginPage;
