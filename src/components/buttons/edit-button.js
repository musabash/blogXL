import React from 'react'

export default function EditButton({name, handleEdit}) {
  return (
    <button onClick={handleEdit}>{name}</button>
  )
}