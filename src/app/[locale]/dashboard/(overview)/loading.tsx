export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-bounce"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-bounce"></div>
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-bounce"></div>
      </div>
      <p className="text-sm text-gray-400">Loading...</p>
      <p className="text-sm text-white">Loading...</p>
    </div>
  )
}
