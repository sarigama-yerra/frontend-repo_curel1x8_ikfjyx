import { useEffect, useRef, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Message({ role, content }) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow ${role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/80 backdrop-blur border border-black/10 text-gray-900'}`}>
        {content}
      </div>
    </div>
  )
}

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! I\'m your friendly mini-robot. Ask me anything ✨' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a concise, friendly assistant.' },
            ...newMessages,
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Unknown error' }))
        throw new Error(typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail))
      }

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `I ran into an error: ${err.message}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/10 border border-white/10 rounded-3xl shadow-xl overflow-hidden backdrop-blur">
      <div ref={listRef} className="h-[420px] overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white/40 to-white/10">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div className="text-xs text-gray-600 animate-pulse">Mini-robot is typing...</div>
        )}
      </div>
      <form onSubmit={sendMessage} className="flex items-center gap-2 p-3 bg-white/60">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  )
}
