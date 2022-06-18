import React, {useEffect, useRef, useState} from 'react'
import {locService} from '../services/loc.service'
import {eventBus} from '../services/eventBusService'

export const LocList = () => {
  const [locs, setLocs] = useState(null)
  // let btnStyle = useRef({display: 'none'})

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
  const handleButtonHover = (ev) => {
    ev.stopPropagation()
  }
  const handleButtonLeave = (ev) => {
    ev.stopPropagation()
    ev.target.style.display = 'none'
  }

  const handleMouseOver = (ev) => {
    ev.target.children[0].style.display = 'block'
    // btnStyle.current = {display: 'block'}
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
            onClick={() => handleClick(loc)}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className="loc"
            key={loc._id}
          >
            {loc.name}
            <button
              onMouseOver={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={(ev) => removeLoc(ev, loc)}
              className={'btn btn-danger btn-delete'}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
