/**
 * Global Error Boundary Component (Next.js App Router)
 * 
 * PURPOSE: Handle and display application errors gracefully
 * USAGE: Automatically catches errors in page components
 * 
 * HOW TO EDIT:
 * - Customize error message and recovery options
 * - Add error reporting to external services
 * - Include debugging information in development
 * 
 * HOW IT WORKS:
 * - Catches JavaScript errors in page components
 * - Displays user-friendly error message
 * - Provides recovery mechanisms (retry, navigate home)
 * - Logs errors for debugging purposes
 * 
 * ROLE: Error boundary and user experience recovery
 * RELATED FILES: Protects all pages in the app directory
 */

'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error for debugging
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an error while loading the restaurant data. 
          Please try again or return to the home page.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="block w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Return to Home
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}