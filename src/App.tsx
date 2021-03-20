import React, {SyntheticEvent, useState} from 'react'
import {CenterPanel} from './panels/CenterPanel/CenterPanel'
import {ButtonFile} from './components/UI/ButtonFile/ButtonFile'
import {Glass} from './components/Glass/Glass'
import {FormEncrypt} from './components/FormEncrypt/FormEncrypt'
import {TFile} from './types'
import {LoadingPopout} from './components/LoadingPopout/LoadingPopout'
import {ProgressPopout} from './components/ProgressPopout/ProgressPopout'


export const App = () => {
  const [file, setFile] = useState(null as TFile)
  const [showLoading, setShowLoading] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)
  const [textProgress, setTextProgress] = useState('')
  const [hrefDownload, setHrefDownload] = useState('')
  const [filenameResult, setFilenameResult] = useState('')

  const onSelectFile = (event: SyntheticEvent) => {
    setShowLoading(false)
    const target = event.target as HTMLInputElement
    const selectedFile = target.files![0]
    setFile(selectedFile)
  }
  const onClickFile = () => setShowLoading(false)

  return (
    <>
      <CenterPanel>
        <Glass style={{width: '100%', maxWidth: '500px', margin: '5px'}}>
          <div style={{display: 'flex', placeItems: 'center', flexDirection: 'column'}}>
            <ButtonFile onClick={onClickFile} onChange={onSelectFile} nameFile={file ? file.name : null}/>
            {file && <FormEncrypt setFilenameResult={setFilenameResult} setHrefDownload={setHrefDownload} setProgress={setProgress} setShowProgress={setShowProgress} setTextProgress={setTextProgress} file={file}/>}
          </div>
        </Glass>
      </CenterPanel>
      <LoadingPopout show={showLoading}/>
      <ProgressPopout href={hrefDownload} filename={filenameResult} progress={progress} text={textProgress} show={showProgress} setFile={setFile} setShowProgress={setShowProgress}/>
    </>
  )
}
