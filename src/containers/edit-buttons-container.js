import React from 'react'
import { DeleteButton, EditButton } from '../components/buttons'

export default function EditButtonsContainer({isEditable, handleEdit, id, authorised, handleDelete, handleUpdate}) {
  return (
    <div className="edit__btns__container">
      {authorised && <EditButton name={isEditable ? "cancel" : "edit"} handleEdit={handleEdit}/>}
      {authorised && isEditable && 
        <>
          <DeleteButton
            id={id}
            deleteBlog={handleDelete}  
          />
          <EditButton handleEdit={handleUpdate} name="save"/>
        </>
      }  
    </div>
  )
}
