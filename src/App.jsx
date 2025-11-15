import Spline from '@splinetool/react-spline'
import ChatUI from './components/ChatUI'

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Hero with Spline 3D robot */}
      <div className="relative h-[60vh] w-full">
        <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Gradient overlay for readability; allow pointer events to pass through */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Mini Robot Chat
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              A playful, friendly chatbot powered by OpenAI. Say hello and get instant responses.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="relative z-10 -mt-16 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-white/90">Talk to the bot</h2>
            <p className="text-white/60">Ask anything. The mini robot answers in a friendly, concise way.</p>
          </div>
          <ChatUI />
          <div className="mt-6 text-center text-white/50 text-sm">
            Tip: Set your OpenAI API key as OPENAI_API_KEY in the backend env to enable replies.
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
