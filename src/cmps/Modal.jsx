import React, {useEffect, useState} from 'react'
import {locService} from '.././services/loc.service'

export const Modal = ({loc}) => {
  console.log('got loc prop', loc)
  return (
    //TODO: create a modal with form and input , when submit create a new loc
    <div className="modal pos-center pos-relative">
      <h2 className="text-center u">Modal</h2>
      <form className="">
        <input type="text" className="form-input" />
        <button className="btn btn-primary pos-center">Save</button>
      </form>
    </div>
  )
}
