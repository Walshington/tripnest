import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          TripNest
        </h1>
        <p className="text-lg text-gray-400">
          Your landing page goes here.
        </p>
      </div>
    </div>
  )
}
