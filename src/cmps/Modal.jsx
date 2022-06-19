import React, {useEffect, useState} from 'react'
import {useForm} from '../hooks/useForm'
import {locService} from '../services/loc.service'
import {eventBus} from '../services/eventBusService'

export const Modal = ({pos}) => {
  const [loc, handleChange, setLoc] = useForm(null)
  const [isShow, setShow] = useState(false)

  useEffect(() => {
    loadLoc()
  }, [pos])

  const loadLoc = () => {
    const loc = !pos ? locService.getEmptyLoc() : locService.createLoc(pos)
    setLoc(loc)
    setShow(true)
  }

  const onSaveLoc = async (ev) => {
    ev.preventDefault()
    await locService.saveLoc(loc)
    setShow(false)
    //test change the weather to the marked place , maybe remove it later
    eventBus.emit('centerWeather', loc)
    eventBus.emit('putMark', loc)
  }

  if (!loc) return <div>Loading...</div>

  return (
    <div
      className={'modal pos-center pos-relative' + (isShow ? ' show' : ' hide')}
    >
      <h2 className="text-center u">Name It</h2>
      <form onSubmit={onSaveLoc} className="">
        <input
          type="text"
          onChange={handleChange}
          value={loc.name}
          name="name"
          className="form-input"
        />

        <button className="btn btn-primary pos-center">Save</button>
      </form>
    </div>
  )
}
