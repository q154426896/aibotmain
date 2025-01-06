'use client'

import { useState, useEffect } from 'react'
import TopNavBar from './components/TopNavBar'
import MainContent from './components/MainContent'
import UserList from './components/UserList'
import Pagination from './components/Pagination'
import BatchActions from './components/BatchActions'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  status: 'running' | 'paused' | 'stopped'
  avatar: string
}

export default function Dashboard() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [contentHeight, setContentHeight] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [usersPerPage, setUsersPerPage] = useState(16)

  useEffect(() => {
    const updateContentHeight = () => {
      const windowHeight = window.innerHeight
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0
      const mainContentHeight = document.querySelector('.main-content')?.clientHeight || 0
      const paginationHeight = document.querySelector('.pagination-container')?.clientHeight || 0
      setContentHeight(windowHeight - navbarHeight - mainContentHeight - paginationHeight - 32) // 32px for margins
    }

    updateContentHeight()
    window.addEventListener('resize', updateContentHeight)
    return () => window.removeEventListener('resize', updateContentHeight)
  }, [])

  useEffect(() => {
    const calculateUsersPerPage = () => {
      const windowWidth = window.innerWidth
      if (windowWidth >= 1280) return 16 // xl
      if (windowWidth >= 1024) return 12 // lg
      if (windowWidth >= 640) return 8  // sm
      return 4 // xs
    }

    const handleResize = () => {
      setUsersPerPage(calculateUsersPerPage())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase()
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(lowercasedQuery) ||
      user.status.toLowerCase().includes(lowercasedQuery)
    )
    setFilteredUsers(filtered)
    setCurrentPage(1)
  }

  const handleAddUser = (username: string) => {
    const newUser: User = {
      id: `user-${users.length + 1}`,
      name: username,
      status: 'stopped',
      avatar: `/placeholder.svg?height=40&width=40`
    }
    setUsers(prevUsers => [...prevUsers, newUser])
    setFilteredUsers(prevFiltered => [...prevFiltered, newUser])
  }

  const handleUpdateUserStatus = (userId: string, status: 'running' | 'paused' | 'stopped') => {
    const updateUsers = (userList: User[]) =>
      userList.map(user =>
        user.id === userId ? { ...user, status } : user
      )
    
    setUsers(updateUsers)
    setFilteredUsers(updateUsers)
  }

  const handleBatchAction = (action: 'start' | 'pause' | 'stop') => {
    const statusMap = {
      'start': 'running',
      'pause': 'paused',
      'stop': 'stopped'
    }
    const newStatus = statusMap[action] as 'running' | 'paused' | 'stopped'

    const updateUsers = (userList: User[]) =>
      userList.map(user =>
        selectedUsers.includes(user.id) ? { ...user, status: newStatus } : user
      )
    
    setUsers(updateUsers)
    setFilteredUsers(updateUsers)
  }

  const handleBatchUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const lines = content.split('\n').filter(line => line.trim() !== '')
      const newUsers = lines.map((line, index) => ({
        id: `user-${users.length + index + 1}`,
        name: line.trim(),
        status: 'stopped' as const,
        avatar: `/placeholder.svg?height=40&width=40`
      }))
      setUsers(prevUsers => [...prevUsers, ...newUsers])
      setFilteredUsers(prevFiltered => [...prevFiltered, ...newUsers])
    }
    reader.readAsText(file)
  }

  const displayedUsers = filteredUsers.length > 0 ? filteredUsers : users
  const totalPages = Math.max(1, Math.ceil(displayedUsers.length / usersPerPage))
  const paginatedUsers = displayedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopNavBar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-grow flex flex-col p-4 space-y-4">
          <div className="main-content">
            <MainContent 
              onSearch={handleSearch} 
              onAddUser={handleAddUser}
              onBatchUpload={handleBatchUpload}
            />
          </div>
          <div className="flex-1 overflow-hidden" style={{ height: `${contentHeight}px` }}>
            <UserList 
              users={paginatedUsers}
              selectedUsers={selectedUsers} 
              setSelectedUsers={setSelectedUsers}
              onUpdateUserStatus={handleUpdateUserStatus}
            />
          </div>
          <div className="pagination-container mt-4 flex justify-between items-center p-4 bg-white border-t">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <BatchActions 
              selectedUsers={selectedUsers}
              onBatchStart={() => handleBatchAction('start')}
              onBatchPause={() => handleBatchAction('pause')}
              onBatchStop={() => handleBatchAction('stop')}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

