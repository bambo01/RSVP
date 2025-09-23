import React, { useEffect, useState } from "react"

const GuestList = () => {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const res = await fetch("https://animo-backend.up.railway.app/api/rsvp")
        if (!res.ok) throw new Error("Failed to fetch RSVPs")
        const list = await res.json()
        setRsvps(Array.isArray(list) ? list : list.data ?? [])
      } catch (err) {
        setError("Could not load guest list")
      } finally {
        setLoading(false)
      }
    }
    fetchRsvps()
  }, [])

  // ✅ Compute total pax
  const totalPax = rsvps.reduce((sum, guest) => sum + (guest.numOfPax || 0), 0)

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-10 px-6"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Guest List</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto w-full max-w-3xl">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left"># of Pax</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((guest, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border-b">{guest.name}</td>
                  <td className="px-4 py-2 border-b">{guest.numOfPax}</td>
                </tr>
              ))}

              {/* ✅ Total Row */}
              <tr className="bg-orange-100 font-bold">
                <td className="px-4 py-2 border-t">Total</td>
                <td className="px-4 py-2 border-t">{totalPax}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default GuestList
