import React from 'react'
import axios from 'axios'
import {message} from 'antd'

function Nescafe() {
  const handleAdd = async () => {
    try {
      const response = await axios.post('/nescafe/sample/add',{value: "Dummy Data"})
      console.log(response.data)
      message.success("A Dummy Record was Successfully Added!")
    } catch (error) {
      message.error("There was some error in adding the dummy record")
    }
  }

  const handleEdit = async () => {
    try {
      const response = await axios.post('/nescafe/sample/edit',{value:"Dummy Data", edit: "Edited Dummy Data"})
      console.log(response.data)
      message.success("A Dummy Record was Successfully Updated!")
    } catch (error) {
      message.error("There was some error in updating the dummy record")
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.post('/nescafe/sample/delete',{value:"Dummy Data"})
      console.log(response.data)
      message.success("A Dummy Record was Successfully Deleted!")
    } catch (error) {
      message.error("There was some error in deleting the dummy record")
    }
  }

  return (
    <>
    <div>This is Nescafe ka Page</div>
    <div className='row'>
        <div className='col-md-9 row'>
          <div className='col-md-2'>
            <button className='btn btn-dark' onClick={handleAdd}>Add Data</button>
          </div>
          <div className='col-md-2'>
            <button className='btn btn-dark' onClick={handleEdit}>Edit Data</button>
          </div>
          <div className='col-md-2'>
            <button className='btn btn-dark' onClick={handleDelete}>Delete Data</button>
          </div>
        </div>
        <div className='col-md-3'>
            <a href='/'><button className='btn btn-dark'>Go Back</button></a>
        </div>
    </div>
    </>
  )
}

export default Nescafe