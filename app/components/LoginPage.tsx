'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoginForm from './LoginForm'
import RegisterModal from './RegisterModal'
import ErrorModal from './ErrorModal'

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false)
  const [showError, setShowError] = useState(false)
  const router = useRouter()

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === '123123') {
      router.push('/dashboard')
    } else {
      setShowError(true)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("https://images.pexels.com/photos/19670/pexels-photo.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'all 0.5s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px'
      }}>
        <div className="space-y-6" style={{ paddingLeft: '200px' }}>
          <h2 className="text-black" style={{
            fontSize: '50px',
            fontWeight: 600,
            lineHeight: '61px',
            transform: 'matrix(0.99, 0, -0.12, 1, 0, 0)'
          }}>巨量引擎旗下</h2>
          <p className="text-black" style={{
            fontSize: '50px',
            fontWeight: 600,
            lineHeight: '61px',
            transform: 'matrix(0.99, 0, -0.12, 1, 0, 0)'
          }}>内容消费趋势洞察</p>
          <p className="text-black" style={{
            fontSize: '26px',
            height: '61px',
            letterSpacing: '16px',
            lineHeight: '61px',
            marginTop: '7px',
            transform: 'matrix(0.99, 0, -0.12, 1, 0, 0)',
            whiteSpace: 'nowrap'
          }}>品牌解析内容风向 解码营销未来</p>
        </div>
        <div className="w-full max-w-md p-6 rounded-xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30 shadow-xl transition-all duration-500" style={{ paddingRight: '10px' }}>
          <div className="mb-6 relative w-full" style={{ paddingTop: '37.5%' }}>
            <Image 
              src="https://cdn.pixabay.com/photo/2017/06/04/16/31/banner-2371477_960_720.jpg" 
              alt="Banner" 
              fill
              className="rounded-lg object-cover object-center"
            />
          </div>
          <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">欢迎来到我们的平台！请登录或注册以继续。</p>
          </div>
          <LoginForm onLogin={handleLogin} onRegister={() => setShowRegister(true)} />
        </div>
      </div>
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showError && <ErrorModal onClose={() => setShowError(false)} />}
    </main>
  )
}

