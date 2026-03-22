'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { submitFlag } from '@/app/actions'

interface ChallengeFormProps {
  challengeId: string
}

function ChallengeForm({ challengeId }: ChallengeFormProps) {
  const [flag, setFlag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const result = await submitFlag(challengeId, flag)
      if (result.success) {
        setSuccess('Flag 提交成功！')
        // 直接在组件内部处理成功后的逻辑，避免传递事件处理函数
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        }, 1000)
      } else {
        setError(result.message || 'Flag 不正确')
      }
    } catch (err) {
      setError('提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="flag" className="block text-sm font-medium text-gray-300 mb-1">
          Flag
        </label>
        <Input
          id="flag"
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="flag{...}"
          className="border-gray-700 bg-black/50 text-white placeholder-gray-500"
          disabled={isSubmitting}
        />
      </div>
      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}
      {success && (
        <div className="text-green-400 text-sm">{success}</div>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-neon-purple hover:bg-neon-purple/80 text-white"
      >
        {isSubmitting ? '提交中...' : '提交 Flag'}
      </Button>
    </form>
  )
}

export default ChallengeForm
