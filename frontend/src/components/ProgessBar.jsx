const ProgressBar = ({ percentage }) => {
  return (
    <div className="flex items-center gap-2">
    <div className="w-full border border-neutral-300 rounded-full h-3 overflow-hidden">
      <div
        className={`${percentage < 40 ? 'bg-red-500' : percentage < 70 ? 'bg-yellow-500' : 'bg-green-500'} h-full rounded-full transition-all duration-300 text-white`}
        style={{ width: `${percentage}%` }}
      />
    </div>
    {percentage}%
    </div>
  )
}

export default ProgressBar
