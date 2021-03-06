import React from 'react'
import { DeleteButton, EditButton } from '../components/buttons'

export function EditButtonsContainer({isEditable, handleEdit, id, authorised, handleDelete, handleUpdate, published}) {

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
          {!published && <EditButton handleEdit={() => handleUpdate(true)} name="publish"/>}
        </>
      }  
    </div>
  )
}
