import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useFormP from './hooks/useFormP'
import './styles.scss'

const EditPaleta = () => {
  const  {id}=useParams()
  const {paletas}= useSelector(state=>state.paletasStore)
//   console.log(paletas);
//   console.log(id);
  const paletaTOedit= paletas.find((paleta)=>paleta.id===id)
//   console.log(paletaTOedit);
  const [dataForm,handleChangeInput]=useFormP({...paletaTOedit})
  const sendEdit=(e)=>{
    e.preventDefault()
    console.log(dataForm);
    // const {paletaTOedit:infoPaleta}=dataForm
    // console.log(infoPaleta);

  }
  
  return (
    <div>
    
    <Form  className='formEdit' onSubmit={sendEdit}>
    <input name='name' defaultValue={paletaTOedit.name} type="text" onChange={handleChangeInput} placeholder='name'/>
    <select  name='category' placeholder='paleta type' onChange={handleChangeInput}>
    <option value={paletaTOedit.category}>{paletaTOedit.category} </option>
    <option value="paleta de agua">paleta de agua</option>
    <option value="paleta de crema">paleta de crema</option>
    <option value="paleta mixta">paleta mixta</option>
    <option value="paleta con relleno">paleta con relleno</option>
    </select>
    <textarea defaultValue={paletaTOedit.description}  name='description'  onChange={handleChangeInput} placeholder='Description'/>
    <input defaultValue={paletaTOedit.price} name='price'  onChange={handleChangeInput} placeholder='precio' type="number"/>
    <input defaultValue={paletaTOedit.quantity} name='quantity' onChange={handleChangeInput} placeholder='cantidad' type="number"/>
    <FloatingLabel  label="" className="mb-3">
              <Form.Control
               name=""
                // onChange={({target})=>{handdleChangeInputs(target)}}
                onChange={handleChangeInput}
                
                type="file"
                size="sm"
                // {...register()}
              />
              {/* <p>{errors[item.name]?.message}</p> */}
            </FloatingLabel>

        <button type='submit'> Confirm edit </button>
    </Form>

    
    </div>
  )
}

export default EditPaleta