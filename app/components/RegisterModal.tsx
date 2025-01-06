'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, AlertCircle } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RegisterModalProps {
  onClose: () => void
}

export default function RegisterModal({ onClose }: RegisterModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const { toast } = useToast()

  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false)

  useEffect(() => {
    setIsUsernameValid(username.length === 10)
  }, [username])

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    setIsPasswordValid(passwordRegex.test(password))
  }, [password])

  useEffect(() => {
    setIsConfirmPasswordValid(password === confirmPassword)
  }, [password, confirmPassword])

  useEffect(() => {
    setIsVerificationCodeValid(verificationCode === 'aibot')
  }, [verificationCode])

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid || !isVerificationCodeValid) {
      toast({
        title: "注册失败",
        description: "请检查输入是否符合要求。",
        variant: "destructive",
      })
      return
    }
    // 这里添加注册逻辑
    toast({
      title: "注册成功",
      description: "您已成功注册账号。",
    })
    onClose()
  }

  const inputClasses = (isValid: boolean) => 
    `pr-10 ${!isValid && (username || password || confirmPassword || verificationCode) ? 'border-red-500' : 'border-gray-300'}`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute -right-12 top-0 text-white hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="mb-6 relative w-full" style={{ paddingTop: '37.5%' }}>
          <Image 
            src="https://cdn.pixabay.com/photo/2017/06/04/16/31/banner-2371477_960_720.jpg" 
            alt="Banner" 
            fill
            className="rounded-lg object-cover object-center"
          />
        </div>
        <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">欢迎注册我们的平台！请填写以下信息。</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClasses(isUsernameValid)}
              required
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>用户名必须为10个字符</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses(isPasswordValid)}
              required
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>密码必须包含大小写字母和数字</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              type="password"
              placeholder="确认密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClasses(isConfirmPasswordValid)}
              required
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>两次输入的密码必须一致</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="验证码"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={inputClasses(isVerificationCodeValid)}
              required
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>请输入正确的验证码</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button type="submit" className="w-full">注册</Button>
        </form>
      </div>
    </div>
  )
}

