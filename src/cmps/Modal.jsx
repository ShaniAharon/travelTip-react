import React, {useEffect} from 'react'
import {useForm} from '../hooks/useForm'
import {locService} from '../services/loc.service'

export const Modal = ({pos}) => {
  const [loc, handleChange, setLoc] = useForm(null)
  console.log('got pos prop', pos)

  useEffect(() => {
    loadLoc()
  }, [])

  const loadLoc = () => {
    const loc = !pos ? locService.getEmptyLoc() : locService.createLoc(pos)
    console.log('loc', loc)
    setLoc(loc)
  }

  const onSaveLoc = async (ev) => {
    ev.preventDefault()
    const savedLoc = await locService.saveLoc(loc)
    console.log('savedLoc', savedLoc)
  }

  if (!loc) return <div>Loading...</div>

  return (
    <div className="modal pos-center pos-relative">
      <h2 className="text-center u">Modal</h2>
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
