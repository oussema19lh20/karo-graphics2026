"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check dark mode status
    const checkDarkMode = () => {
      const isDarkClass = document.documentElement.classList.contains("dark")
      setIsDark(isDarkClass)
    }

    checkDarkMode()

    // Trigger fade-out animation after page load
    const loadTimer = setTimeout(() => {
      setFadeOut(true)
      const removeTimer = setTimeout(() => {
        setLoading(false)
      }, 400) // matches transition duration (400ms)
      return () => clearTimeout(removeTimer)
    }, 700) // hold for 700ms for a premium feel

    return () => clearTimeout(loadTimer)
  }, [])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background transition-opacity duration-400 ease-out-in-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Pulsing glow behind the logo */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#1d7bbf]/20 via-[#1eb3e7]/20 to-[#d81751]/20 blur-xl opacity-75 animate-pulse" />

        {/* Brand Logo */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-500 hover:scale-105">
          <Image
            src={isDark ? "/images/logo mode sombre.png" : "/images/logo color mode claire.png"}
            alt="karo graphics"
            fill
            sizes="(max-width: 768px) 112px, 128px"
            className="object-contain animate-logo-pulse"
            priority
          />
        </div>

        {/* Loading Spinner */}
        <div className="relative w-12 h-12 mt-2">
          {/* Inner tracking circle */}
          <div className="absolute inset-0 rounded-full border-4 border-muted/30" />
          {/* Spinning gradient ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-[#d81751] border-r-[#1eb3e7] border-b-[#1d7bbf] border-l-transparent animate-spin" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes logoPulse {
          0%, 100% {
            transform: scale(0.96);
            filter: drop-shadow(0 0 10px rgba(30, 179, 231, 0.1));
          }
          50% {
            transform: scale(1.04);
            filter: drop-shadow(0 0 25px rgba(216, 23, 81, 0.25));
          }
        }
        .animate-logo-pulse {
          animation: logoPulse 2s ease-in-out infinite;
        }
        .duration-400 {
          transition-duration: 400ms;
        }
      `}</style>
    </div>
  )
}
