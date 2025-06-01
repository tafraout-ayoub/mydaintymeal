/**
 * Global Loading UI Component (Next.js App Router)
 * 
 * PURPOSE: Display loading state while pages are being rendered
 * USAGE: Automatically shown by Next.js during page transitions
 * 
 * HOW TO EDIT:
 * - Customize loading animation and styling
 * - Add skeleton screens for specific content types
 * - Include branded loading indicators
 * 
 * HOW IT WORKS:
 * - Renders immediately while page components load
 * - Provides visual feedback during navigation
 * - Automatically replaced by page content when ready
 * 
 * ROLE: User experience enhancement during loading states
 * RELATED FILES: Used across all pages in the app directory
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
        <p className="text-gray-600">Loading restaurant data...</p>
      </div>
    </div>
  )
}