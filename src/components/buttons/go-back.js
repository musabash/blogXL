import React from 'react'

export default function GoBackBtn({history}) {
  return (
    <button
        className="go-back"
        onClick={() => history.goBack()}
      >
        ◀ Back
    </button>
  )
}
