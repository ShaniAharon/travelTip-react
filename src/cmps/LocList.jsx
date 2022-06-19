import React, {useEffect, useState} from 'react'
import {locService} from '../services/loc.service'
import {eventBus} from '../services/eventBusService'

export const LocList = () => {
  const [locs, setLocs] = useState(null)

  useEffect(() => {
    loadLocs()
  })

  const loadLocs = async () => {
    const locs = await locService.getLocs()
    setLocs(locs)
  }

  const removeLoc = async (ev, {_id}) => {
    ev.stopPropagation()
    await locService.removeLoc(_id)
    eventBus.emit('removeMark', _id)
  }

  const handleClick = (loc) => {
    eventBus.emit('clickLoc', loc)
  }

  const handleMouseOver = (ev) => {
    ev.target.children[0].style.display = 'flex'
  }

  const handleMouseLeave = (ev) => {
    ev.target.children[0].style.display = 'none'
  }

  if (!locs) return <div>Loading...</div>
  return (
    <div className="loc-list pos-relative">
      <h2 className="text-center u">Your locs</h2>
      <ul className="clean-list pos-center">
        {locs.map((loc) => (
          <li
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className="loc flex items-center"
            key={loc._id}
          >
            {loc.name}
            <div
              className="btn-container m-1 "
              onMouseOver={(ev) => ev.stopPropagation()}
              onMouseLeave={(ev) => ev.stopPropagation()}
            >
              <button
                onClick={(ev) => removeLoc(ev, loc)}
                onMouseLeave={(ev) => ev.stopPropagation()}
                className={'btn btn-danger btn-delete'}
              >
                delete
              </button>
              <button
                onClick={() => handleClick(loc)}
                className={'btn btn-success btn-delete'}
              >
                Go
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
