"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * SignupForm — self-contained client component.
 * Props:
 *  - onSuccess?: () => void   (optional callback after successful signup)
 */
export default function SignupForm({ onSuccess } = {}) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30)
    return () => clearTimeout(t)
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
    setErrors((s) => ({ ...s, [name]: undefined }))
  }

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  function validateAll() {
    const next = {}
    if (!form.username.trim()) next.username = "Username is required."
    if (!form.email.trim()) next.email = "Email is required."
    else if (!validateEmail(form.email.trim())) next.email = "Please enter a valid email."
    if (!form.password) next.password = "Password is required."
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters."
    if (!form.confirmPassword) next.confirmPassword = "Please confirm your password."
    else if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match."
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccess(false)
    const nextErrors = validateAll()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setSubmitting(true)
    try {
      // TODO: replace with real API call
      await new Promise((r) => setTimeout(r, 900))
      setSuccess(true)
      setForm({ username: "", email: "", password: "", confirmPassword: "" })
      if (typeof onSuccess === "function") onSuccess()
    } catch (err) {
      setErrors({ form: "Something went wrong. Try again." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main
      className={cn(
        "min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        "transition-all duration-300"
      )}
    >
      <section
        className="w-full max-w-md rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-lg p-6 sm:p-8"
        aria-labelledby="signup-title"
      >
        <header className="mb-4 text-center">
          <h1 id="signup-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Join CourseAcademy — start learning today.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {/* username */}
          <div className="relative mb-4">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="flex items-center gap-3 rounded-md border px-3 py-2 bg-transparent border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-sky-400 transition">
              <User className="h-4 w-4 text-slate-500" />
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? "username-error" : undefined}
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <p id="username-error" className="mt-1 text-xs text-destructive">
                {errors.username}
              </p>
            )}
          </div>

          {/* email */}
          <div className="relative mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="flex items-center gap-3 rounded-md border px-3 py-2 bg-transparent border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-sky-400 transition">
              <Mail className="h-4 w-4 text-slate-500" />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* password */}
          <div className="relative mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-md border px-3 py-2 bg-transparent border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-sky-400 transition">
              <Lock className="h-4 w-4 text-slate-500" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="ml-2 inline-flex items-center justify-center rounded p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-xs text-destructive">
                {errors.password}
              </p>
            )}
          </div>

          {/* confirm password */}
          <div className="relative mb-6">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm password
            </label>
            <div className="flex items-center gap-3 rounded-md border px-3 py-2 bg-transparent border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-sky-400 transition">
              <Lock className="h-4 w-4 text-slate-500" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="ml-2 inline-flex items-center justify-center rounded p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirm-error" className="mt-1 text-xs text-destructive">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* form level error */}
          {errors.form && <p className="mb-3 text-sm text-destructive">{errors.form}</p>}

          <div className="flex items-center justify-between gap-3">
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? "Creating account..." : "Create account"}
            </Button>

            <div className="flex-none">
              {success ? (
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Check className="h-4 w-4" />
                  <span>Account created</span>
                </div>
              ) : (
                <span className="text-sm text-slate-500 dark:text-slate-300">
                  <Link href="/login" className="text-sky-600 hover:underline">
                    Already have an account?
                  </Link>
                </span>
              )}
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}