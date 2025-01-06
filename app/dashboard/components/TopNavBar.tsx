'use client'

import { useState } from 'react'
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img className="h-12 w-auto" src="https://lf3-static.bytednsdoc.com/obj/eden-cn/lnhtp-aubvj/ljhwZthlaukjlkulzlp/count-fe/icon/logo-dark.svg" alt="Logo" />
          </div>
          <div className="flex items-center relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <UserCircleIcon className="h-8 w-8" />
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-full">
                <a href="#" onClick={() => router.push('/dashboard/profile')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人资料</a>
                <a href="#" onClick={() => {/* 添加退出登录逻辑 */}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">退出登录</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

