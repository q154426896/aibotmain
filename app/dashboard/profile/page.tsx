'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: '/placeholder.svg?height=100&width=100',
    cozeid: '',
    keyword: ''
  })

  const handleGoBack = () => {
    router.push('/dashboard')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleSave = () => {
    // 这里添加保存逻辑
    console.log('保存的用户信息:', user)
    // 可以在这里添加API调用来保存用户信息
    alert('用户信息已保存')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block relative">
                <img alt="profile" src={user.avatar} className="mx-auto object-cover rounded-full h-24 w-24 "/>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-lg font-semibold">{user.name}</span>
                <span className="text-gray-500 font-medium">{user.email}</span>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="cozeid" className="text-sm font-medium text-gray-700">Coze ID</label>
                  <Input
                    type="text"
                    id="cozeid"
                    name="cozeid"
                    value={user.cozeid}
                    onChange={handleInputChange}
                    placeholder="请输入您的 Coze ID"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="keyword" className="text-sm font-medium text-gray-700">关键词</label>
                  <Input
                    type="text"
                    id="keyword"
                    name="keyword"
                    value={user.keyword}
                    onChange={handleInputChange}
                    placeholder="请输入关键词"
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  保存
                </Button>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <button onClick={handleGoBack} className="text-cyan-600 hover:text-cyan-700">返回仪表板 &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

