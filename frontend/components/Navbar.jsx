"use client"

import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <header className={"sticky top-0 z-40"}>
      <nav
        className={
          "backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
        }
        aria-label="Main navigation"
      >
        <div className={"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
          {/* ---------- Desktop (lg+) ---------- */}
          <div
            className={`hidden lg:grid grid-cols-3 items-center h-16
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
                        transition-all duration-400 ease-out`}
          >
            {/* Left: Logo */}
            <div className={"flex items-center"}>
              <Link href={"/"} className={"inline-block"}>
                <span
                  className={
                    "text-lg font-semibold tracking-tight text-slate-900 dark:text-white hover:opacity-90 transition-opacity duration-200"
                  }
                >
                  CourseAcademy
                </span>
              </Link>
            </div>

            {/* Center: Nav links */}
            <div className={"flex justify-center"}>
              <ul className={"flex items-center space-x-6"}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        "group inline-flex items-center text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors duration-200 hover:text-sky-600"
                      }
                    >
                      <span
                        className={
                          "relative px-1 py-1 transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
                        }
                      >
                        {item.label}
                        <span
                          className={
                            "block h-0.5 bg-sky-600 rounded-sm scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100"
                          }
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Auth Buttons + ModeToggle */}
            <div className={"flex justify-end items-center space-x-3"}>
              <ModeToggle />

              <Link href={"/login"} className={"inline-flex"}>
                <Button
                  variant="ghost"
                  className={
                    "px-3 py-1 text-sm transition-transform duration-150 ease-out hover:-translate-y-0.5"
                  }
                >
                  Login
                </Button>
              </Link>

              <Link href={"/signup"} className={"inline-flex"}>
                <Button className={"px-3 py-1 text-sm shadow-sm"}>Signup</Button>
              </Link>
            </div>
          </div>

          {/* ---------- Tablet (md to lg) ---------- */}
          <div
            className={`hidden md:flex lg:hidden items-center justify-between h-16
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
                        transition-all duration-300 ease-out`}
          >
            {/* Left: Logo */}
            <div className={"flex items-center"}>
              <Link href={"/"} className={"inline-block"}>
                <span className={"text-base font-semibold text-slate-900 dark:text-white"}>
                  CourseAcademy
                </span>
              </Link>
            </div>

            {/* Center: compact menu (Dropdown) */}
            <div className={"flex-1 flex justify-center"}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className={"px-3 py-1"}>
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {NAV_ITEMS.map((item) => (
                    <DropdownMenuItem key={item.href}>
                      <Link href={item.href} className={"w-full block"}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Right: ModeToggle + Buttons */}
            <div className={"flex items-center space-x-2"}>
              <ModeToggle />
              <Link href={"/login"} className={"inline-flex"}>
                <Button variant="ghost" size="sm" className={"px-2 py-1 text-sm"}>
                  Login
                </Button>
              </Link>
              <Link href={"/signup"} className={"inline-flex"}>
                <Button size="sm" className={"px-3 py-1 text-sm"}>
                  Signup
                </Button>
              </Link>
            </div>
          </div>

          {/* ---------- Mobile (sm) ---------- */}
          <div
            className={`flex items-center justify-between md:hidden h-14
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
                        transition-all duration-300 ease-out`}
          >
            <div className={"flex items-center"}>
              <Link href={"/"} className={"inline-block"}>
                <span className={"text-base font-semibold text-slate-900 dark:text-white"}>
                  CourseAcademy
                </span>
              </Link>
            </div>

            <div className={"flex items-center gap-2"}>
              {/* show small mode toggle icon (optional) - make visible on mobile */}
              <div className={"mr-1"}>
                <ModeToggle />
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((s) => !s)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className={
                  "inline-flex items-center justify-center rounded-md p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition"
                }
              >
                {mobileOpen ? <X className={"h-5 w-5"} /> : <Menu className={"h-5 w-5"} />}
              </button>
            </div>
          </div>

          {/* Mobile panel (slide down) */}
          <div
            className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
              mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className={"px-4 pb-4"}>
              <ul className={"flex flex-col gap-2 mt-3 border-t pt-3 border-slate-200/50 dark:border-slate-700/50"}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        "block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                <li>
                  <div className={"flex items-center gap-2 px-3"}>
                    <Link href={"/login"} className={"inline-flex flex-1"}>
                      <Button variant="ghost" className={"w-full"}>
                        Login
                      </Button>
                    </Link>
                    <Link href={"/signup"} className={"inline-flex flex-1"}>
                      <Button className={"w-full"}>Signup</Button>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className={"px-3 pt-2"}>
                    <span className={"text-sm text-muted-foreground"}>Theme</span>
                    <div className={"mt-2"}>
                      <ModeToggle />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* ---------- end container ---------- */}
        </div>
      </nav>
    </header>
  )
}