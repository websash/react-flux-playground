import React from 'react'
import joinClasses from 'react/lib/joinClasses'
import s from './Spinner.css'

const Spinner = ({active}) => (
  <div className={joinClasses(s.spinner, active && s.active)}>
    <div className={s.timer}></div>
  </div>
)

export default Spinner
