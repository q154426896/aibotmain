import { PlayIcon, PauseIcon, StopIcon, CheckIcon } from '@heroicons/react/24/solid'

interface User {
  id: string
  name: string
  status: 'running' | 'paused' | 'stopped'
  avatar: string
}

interface UserListProps {
  users: User[]
  selectedUsers: string[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>
  onUpdateUserStatus: (userId: string, status: 'running' | 'paused' | 'stopped') => void
}

export default function UserList({ users, selectedUsers, setSelectedUsers, onUpdateUserStatus }: UserListProps) {
  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(user => user.id))
    }
  }

  const toggleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'running':
        return 'bg-green-500' // 开始
      case 'paused':
        return 'bg-yellow-500' // 暂停
      case 'stopped':
        return 'bg-red-500' // 终止
    }
  }

  const getButtonStyles = (status: User['status'], buttonType: 'running' | 'paused' | 'stopped') => {
    const baseStyles = "flex items-center justify-center px-3 py-2 rounded-md transition-colors duration-200"
    const activeStyles = {
      running: "bg-green-100 text-green-600 hover:bg-green-200", // 开始
      paused: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200", // 暂停
      stopped: "bg-red-100 text-red-600 hover:bg-red-200" // 终止
    }
    const inactiveStyles = "bg-gray-100 text-gray-500 hover:bg-gray-200"

    return `${baseStyles} ${status === buttonType ? activeStyles[buttonType] : inactiveStyles}`
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">用户列表</h2>
        <button
          onClick={toggleSelectAll}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          {selectedUsers.length === users.length ? '取消全选' : '一键全选'}
        </button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="w-full h-full grid grid-rows-4 auto-rows-fr gap-4">
          {[...Array(4)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {users.slice(rowIndex * 4, (rowIndex + 1) * 4).map((user) => (
                <div
                  key={user.id}
                  className={`bg-white rounded-lg shadow-md p-4 border-2 flex flex-col justify-between ${
                    selectedUsers.includes(user.id) ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-semibold text-sm">{user.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></span>
                          <span className="text-xs text-gray-500 capitalize">
                            {user.status === 'running' ? '开始' : user.status === 'paused' ? '暂停' : '终止'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSelectUser(user.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedUsers.includes(user.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {selectedUsers.includes(user.id) && <CheckIcon className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-between mt-2 bg-gray-100 rounded-lg p-1">
                    <button 
                      onClick={() => onUpdateUserStatus(user.id, 'running')}
                      className={getButtonStyles(user.status, 'running')}
                    >
                      <PlayIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onUpdateUserStatus(user.id, 'paused')}
                      className={getButtonStyles(user.status, 'paused')}
                    >
                      <PauseIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onUpdateUserStatus(user.id, 'stopped')}
                      className={getButtonStyles(user.status, 'stopped')}
                    >
                      <StopIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

