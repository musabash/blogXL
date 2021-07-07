import React from 'react'

export default function MetaData({children, dataPrimary, dataSecondary, span}) {
  return (
    <div className="metadata">
      <h3 className="primary__metadata">{dataPrimary} <span>{span}</span></h3>
      <h4 className="secondary__metadata">{dataSecondary}</h4>
    </div>
  )
}
