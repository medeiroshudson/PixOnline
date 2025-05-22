"use client";

import { useState } from "react";
import { useAuth } from "@/store/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { GuestGuard } from "@/components/auth/AuthGuard";
import { siteConfig } from "../../../config/site";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const resetPasswordSchema = z.object({
  email: z.string().email("Digite um email válido"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const success = await resetPassword(data.email);
      if (success) {
        setSuccess(true);
      } else {
        setError("Não foi possível enviar o email de redefinição. Por favor, tente novamente.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao processar sua solicitação.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GuestGuard>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 p-4">
        <div className="fixed top-4 right-4 z-50">
          <ThemeSwitcher />
        </div>
        <Link href="/login" className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{siteConfig.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">Recuperação de senha</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Esqueceu sua senha?</h2>
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center py-6">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Email enviado!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Verifique sua caixa de entrada para concluir a redefinição de senha.
                </p>
                <Link 
                  href="/login" 
                  className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Voltar para o login
                </Link>
              </div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Digite seu email para receber um link de redefinição de senha.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Enviando..." : "Enviar link de redefinição"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
