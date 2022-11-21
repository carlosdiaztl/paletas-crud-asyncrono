import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddPaletasAsync,
  actionEditPaletasAsync
} from "../redux/actions/paletasActions";
import { category, inputList } from "../services/data";
import { fileUpLoad } from "../services/fileUpload";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useFormP from "./hooks/useFormP";

const AddPaletas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { paletas, error } = useSelector((state) => state.paletasStore);
  const paleta = paletas.find(item => item.id === id)
  const defaulValues = {
    name: paleta ? paleta.name : "",
    category: paleta ? paleta.category : "",
    description: paleta ? paleta.description : "",
    price: paleta ? paleta.price : "",
    quantity: paleta ? paleta.quantity : "",
    //image: paleta ? paleta.image : ""
  }

  const {
    register,
    handleSubmit,
    formState: { errors }, watch
  } = useForm({
    defaulValues
  });


  const onSubmit = async (data) => {
    if (id) {

      console.log(data)
      console.log(data.image.length)
      const editPaleta = {id: paleta.id,  ...data}
      if (data.image.length) {
        const URLimg = await fileUpLoad(data.image[0]);
        editPaleta.image = URLimg;
      }else{
        editPaleta.image = paleta.image;
      }
      console.log(editPaleta);
      dispatch(actionEditPaletasAsync(editPaleta));

    } else {
      const URLimg = await fileUpLoad(data.image[0]);
      const paleta = {
        ...data,
        image: URLimg,
      };
      dispatch(actionAddPaletasAsync(paleta));
      console.log(error);
      if (error.error) {
        Swal.fire(
          "Upp ha ocurrido un error:",
          `${error.errorMessage}`,
          "error"
        );
      } else {
        Swal.fire(
          "De maravilla!!",
          "Ya la paleta se ha agregado",
          "success"
        ).then(() => {
          navigate("/home");
        });
      }
    }
  };
  return (
    <div>
      <h1>{paleta && id ? `Actualice la informacion de ${paleta.name}` :
        'Agregue una nueva paleta a la coleccion'} </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map((item, index) => {
          if (item.type === "select") {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  defaultValue={defaulValues[item.name]}
                  {...register(item.name)}
                >
                  <option value="">Seleccione una opción</option>
                  {category.map((element) => (
                    <option
                      key={element.value}
                      value={element.label}
                      className="text-capitalize"
                    // selected={
                    //   initialValue[item.name] &&
                    //   initialValue[item.name] === element.label
                    //     ? true
                    //     : false
                    // }
                    //evalua dos condiciones primero si existe y segundo si esa categoria es igual a la categoria del name
                    >
                      {element.label}
                    </option>
                  ))}
                </Form.Select>
                {/* <p>{errors[item.name]?.message}</p> */}
              </FloatingLabel>
            );
          }
          if (item.type === "textarea") {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Control
                  as="textarea"
                  defaultValue={defaulValues[item.name]}
                  {...register(item.name)}
                />
                {/* <p>{errors[item.name]?.message}</p> */}
              </FloatingLabel>
            );
          }

          return (
            <FloatingLabel key={index} label={item.label} className="mb-3">
              <Form.Control
                type={item.type}
                size={item.type === "file" ? "sm" : ""}
                defaultValue={defaulValues[item.name]}
                {...register(item.name)}
              />
              {/* <p>{errors[item.name]?.message}</p> */}
            </FloatingLabel>
          );
        })}
        <Button variant="warning" type="submit" className="mb-3">
        {paleta && id ? `Actualizar paleta` :
        'Agregar nueva paleta'}
        </Button>
      </Form>
    </div>
  );
};

export default AddPaletas;
