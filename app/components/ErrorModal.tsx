import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ErrorModalProps {
  onClose: () => void
}

export default function ErrorModal({ onClose }: ErrorModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold mb-4">错误</h2>
        <p className="mb-6">用户名或密码错误，请重试。</p>
        <Button onClick={onClose} className="w-full">确定</Button>
      </div>
    </div>
  )
}

