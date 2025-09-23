import React, { useEffect, useState } from 'react'

const Input = () => {
  const [formData, setFormData] = useState({
    name: '',
    pax: ''
  })

  const [display, setDisplay] = useState(true) // show form initially
  const [rsvps, setRsvps] = useState([])       // list for table
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

      // Optimistically add the new entry so it shows up immediately
      setRsvps(prev => [
        { name: formData.name, numOfPax: Number(formData.pax) },
        ...prev
      ])

      setFormData({ name: '', pax: '' }) // reset form
      setDisplay(false) // hide form after submit

    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('Something went wrong. Please try again later.')
    }
  }

  // Fetch the latest RSVPs once the thank-you screen is showing
  useEffect(() => {
    const fetchRsvps = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('https://animo-backend.up.railway.app/api/rsvp', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        if (!res.ok) throw new Error('Failed to fetch RSVPs')
        const list = await res.json()

        // Expecting an array of objects with { name, numOfPax }
        // If your API returns something like { data: [...] }, adjust accordingly:
        // setRsvps(list.data ?? list)
        setRsvps(Array.isArray(list) ? list : (list.data ?? []))
      } catch (err) {
        console.error(err)
        setError('Could not load the RSVP list.')
      } finally {
        setLoading(false)
      }
    }

    if (!display) {
      fetchRsvps()
    }
  }, [display])

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
        <div className="flex flex-col gap-4">
          {/* Thank you banner */}
          <div className="text-gray-900 font-semibold flex justify-center text-xl md:text-2xl bg-orange-200 py-3 rounded shadow">
            <h1>Thank you for your RSVP!</h1>
          </div>

          {/* RSVP Table */}
          <div className="bg-white/90 rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Guest List</h2>
              {loading && <span className="text-sm text-gray-500">Loading…</span>}
            </div>

            {error ? (
              <div className="text-red-600">{error}</div>
            ) : rsvps.length === 0 ? (
              <div className="text-gray-600">No RSVPs yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b"># of Pax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((item, idx) => (
                      <tr key={`${item.name}-${idx}`} className="odd:bg-white even:bg-gray-50">
                        <td className="px-4 py-2 border-b text-gray-800">
                          {item.name ?? item.fullName ?? '—'}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {item.numOfPax ?? item.pax ?? '0'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Optional: Back button to show form again */}
          <button
            onClick={() => setDisplay(true)}
            className="self-start bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
          >
            Add another RSVP
          </button>
        </div>
      )}
    </>
  )
}

export default Input
