import './App.css'
import Input from './Input'

function App() {
  return (
    <div 
      className="w-full min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Wrapper: flex-col on mobile, row on md+ */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-20 py-10 md:py-0 min-h-screen">
        
        {/* LEFT: Centered text block */}
        <div className="flex flex-col justify-center items-center flex-1 text-center md:text-left space-y-6 xl:-mr-70">
          <div className='flex flex-col items-center'>
            <h1 className="text-5xl md:text-8xl text-white font-bebas">Maelyn's</h1>
            <h1 className="text-4xl md:text-7xl text-white font-bebas -mt-2 md:-mt-4">Birthday</h1>
          </div>

          <div className="space-y-4">
            <h1 className="text-lg md:text-2xl font-semibold text-white">
              You're invited to my birthday party!
            </h1>
            <div className='flex flex-col items-center justify-center'>
             <div className='flex flex-col items-center font-semibold mb-2 text-xl text-white'>
               <h1>September 23, 2025</h1>
               <h1>5:00 PM</h1>
             </div>
               <img src="/inasal.png" alt="Birthday Pic 2" className="w-40 md:w-40 rounded-lg" />
            </div>
            <Input />
          </div>
        </div>

        {/* RIGHT: Image block */}
        <div className="flex gap-4 md:space-y-4 mt-8 md:mt-0 md:flex-col">
          <img src="/pic1.jpg" alt="Birthday Pic 1" className="w-60 md:w-80 rounded-lg" />
          <img src="/pic1.jpg" alt="Birthday Pic 2" className="w-60 md:w-80 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default App
