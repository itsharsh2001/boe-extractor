import React from 'react'
import classes from './Sidebar.module.css'

function Sidebar() {
  return (
    <section className = {classes.sidebar}>
        <ul>
            <li>
                <img src="/grid.png" alt="" />
                <a href="/">BOE</a>
            </li>
        </ul>
    </section>
  )
}

export default Sidebar