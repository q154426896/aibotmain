'use client'

import { useState, useRef } from 'react'
import { MagnifyingGlassIcon, UserPlusIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid'

interface MainContentProps {
  onSearch: (query: string) => void
  onAddUser: (username: string) => void
  onBatchUpload: (file: File) => void
}

export default function MainContent({ onSearch, onAddUser, onBatchUpload }: MainContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [username, setUsername] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onAddUser(username.trim())
      setUsername('')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onBatchUpload(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="main-content flex items-center py-4">
      <div className="flex items-center justify-between w-full">
        <div className="w-1/3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-48 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            添加用户
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt"
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            批量上传
          </button>
        </div>
      </div>
    </div>
  )
}

