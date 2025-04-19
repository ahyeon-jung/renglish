import { useLogin, useNotify, Notification } from 'react-admin'
import { useState } from 'react'

const LoginPage = () => {
  const login = useLogin()
  const notify = useNotify()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(form)
    } catch (error) {
      notify('로그인 실패', { type: 'error' })
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: 300 }}>
        <h2>로그인</h2>
        <div>
          <label>이메일</label>
          <input
            type="text"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>비밀번호</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <Notification />
    </div>
  )
}

export default LoginPage
