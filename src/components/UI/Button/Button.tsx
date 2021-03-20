import React, {CSSProperties, SyntheticEvent} from 'react'
import classes from './button.module.sass'


type TProps = {
  children?: string,
  onClick?: (event?: SyntheticEvent) => void,
  style?: CSSProperties,
  disabled?: boolean
}

export const Button = (p: TProps) => {
  return (
    <button disabled={p.disabled} style={p.style} className={classes.button} onClick={p.onClick}>
      {p.children}
    </button>
  )
}
