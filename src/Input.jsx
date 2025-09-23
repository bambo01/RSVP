import React, { useState } from 'react'

const Input = () => {
  const [formData, setFormData] = useState({
    name: '',
    pax: ''
  })

  const [display, setDisplay] = useState(true) // 👈 change to true to show form by default

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('My formData', formData)

    if (!formData.name || !formData.pax) {
      alert('Please fill out all fields before submitting.')
      return
    }

    try {
      const response = await fetch(
        `https://animo-backend.up.railway.app/api/rsvp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            numOfPax: Number(formData.pax)
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to submit RSVP')
      }

      const data = await response.json()
      console.log('RSVP submitted successfully:', data)

      alert(`RSVP submitted! Thank you ${formData.name}.`)

      setFormData({ name: '', pax: '' }) // reset form
      setDisplay(false) // 👈 hide form after submit

    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <>
      {display ? (
        <div>
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col space-y-4 bg-white bg-opacity-80 p-4 rounded-lg shadow-md"
          >
            {/* Name input */}
            <div className="flex flex-col mt-2">
              <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                Family Name:
              </label>
              <input 
                id="name" 
                type="text" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 bg-gray-100"
              />
            </div>

            {/* Pax input */}
            <div className="flex flex-col">
              <label htmlFor="pax" className="mb-1 text-sm font-medium text-gray-700">
                How many people are you bringing with you?
              </label>
              <input 
                id="pax" 
                type="number" 
                min="0"
                value={formData.pax}
                onChange={handleChange}
                placeholder="Enter number of pax"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 bg-gray-100"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-orange-200 px-10 py-2 rounded-sm font-semibold text-gray-800 hover:bg-orange-300 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className=" flex flex-col gap-2">
          <div className="text-white font-semibold flex justify-center text-2xl bg-orange-200 py-2 rounded shadow">
            <h1>Thank you for your RSVP!</h1>
          </div>
        </div>
      )}
    </>
  )
}

export default Input
