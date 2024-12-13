"use client";

import { RegisterForm } from "@/components/auth";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Inscription</h1>
          <p className="text-gray-500">Créez votre compte administrateur</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
