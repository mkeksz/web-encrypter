import React, {CSSProperties} from 'react'
import classes from './glass.module.sass'


type TProps = {
  children: JSX.Element | string,
  style?: CSSProperties
}

export const Glass = (p: TProps) => {
  return (
    <div className={classes.glass} style={p.style}>
      {p.children}
    </div>
  )
}
