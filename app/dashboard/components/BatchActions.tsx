import { PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/solid'

interface BatchActionsProps {
  selectedUsers: string[]
  onBatchStart: () => void
  onBatchPause: () => void
  onBatchStop: () => void
}

export default function BatchActions({ selectedUsers, onBatchStart, onBatchPause, onBatchStop }: BatchActionsProps) {
  const isDisabled = selectedUsers.length === 0

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <button
        onClick={onBatchStart}
        disabled={isDisabled}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <PlayIcon className="h-5 w-5 inline-block mr-2" />
        批量启动
      </button>
      <button
        onClick={onBatchPause}
        disabled={isDisabled}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <PauseIcon className="h-5 w-5 inline-block mr-2" />
        批量暂停
      </button>
      <button
        onClick={onBatchStop}
        disabled={isDisabled}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <StopIcon className="h-5 w-5 inline-block mr-2" />
        批量终止
      </button>
    </div>
  )
}

