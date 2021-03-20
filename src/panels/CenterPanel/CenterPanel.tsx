import React from 'react'
import classes from './centerPanel.module.sass'


type TProps = {
  children: JSX.Element
}

export const CenterPanel = (p: TProps) => {
  return (
    <div>
      <div className={classes.centerPanel}>
        {p.children}
      </div>
    </div>
  )
}
