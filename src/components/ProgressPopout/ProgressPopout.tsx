import React from 'react'
import classes from './progressPopout.module.sass'


type TProps = {
  progress: number,
  text: string,
  show: boolean,
  setShowProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setFile: React.Dispatch<React.SetStateAction<File | null>>,
  href: string,
  filename: string
}

export const ProgressPopout = (p: TProps) => {
  const onClickSave = () => {
    p.setShowProgress(false)
    p.setFile(null)
  }

  return p.show ? (
    <div className={classes.progressPopout}>
      <div className={classes.panel}>
        <div className={classes.text}>{p.text}</div>
        <div className={classes.progressBar}>
          <span>{p.progress}%</span>
          <div style={{width: p.progress + '%'}}/>
        </div>
        {p.progress >= 100 && (
          <div className={classes.button}>
            <a href={p.href} download={p.filename} onClick={onClickSave}>СОХРАНИТЬ ФАЙЛ</a>
          </div>
        )}
      </div>
    </div>
  ) : null
}
