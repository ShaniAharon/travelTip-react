import React, {useEffect, useState} from 'react'
import {locService} from '../services/loc.service'

export const LocList = () => {
  const [locs, setLocs] = useState(null)

  useEffect(() => {
    loadLocs()
  }, [])

  const loadLocs = async () => {
    const locs = await locService.getLocs()
    setLocs(locs)
  }

  if (!locs) return <div>Loading...</div>
  return (
    <div className="loc-list pos-relative">
      <h2 className="text-center u">Your locs</h2>
      <ul className="clean-list pos-center">
        {locs.map((loc) => (
          <li className="loc" key={loc._id}>
            {loc.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
