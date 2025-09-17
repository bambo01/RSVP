import './App.css'
import Input from './Input'

function App() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Wrapper: flex-col on small, row on md+ */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px- md:px-12 lg:justify-end lg:px-150 py-10 min-h-screen gap-10">
        
        {/* LEFT: Text + RSVP */}
        <div className="flex flex-col justify-center items-center md:items-start flex-1 text-center md:text-left  space-y-6">
          {/* Title */}
          <div className="flex flex-col items-center md:items-start lg:flex lg:justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bebas">
              Maelyn's
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bebas -mt-2 md:-mt-4">
              Birthday
            </h1>
          </div>

          {/* Invitation details */}
          <div className="space-y-4">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">
              You're invited to my birthday party!
            </h1>

            <div className="flex flex-col items-center md:items-start justify-center">
              <div className="flex flex-col items-center md:items-start font-semibold mb-2 text-lg sm:text-xl text-white">
                <h1>September 23, 2025</h1>
                <h1>5:00 PM</h1>
              </div>
              <img
                src="/inasal.png"
                alt="Birthday Pic 2"
                className="w-32 sm:w-36 md:w-40 rounded-lg"
              />
            </div>

            {/* RSVP Form */}
            <Input />
          </div>
        </div>

        {/* RIGHT: Image block */}
        <div className="flex flex-row md:flex-col gap-4">
          <img
            src="/pic1.jpg"
            alt="Birthday Pic 1"
            className="w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-lg"
          />
          <img
            src="/pic3.png"
            alt="Birthday Pic 2"
            className="w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default App
