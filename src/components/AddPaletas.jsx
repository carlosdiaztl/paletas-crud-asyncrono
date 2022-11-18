import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddPaletasAsync,
  actionFillPaletasAsync,
} from "../redux/actions/paletasActions";
import { category, inputList } from "../services/data";
import { fileUpLoad } from "../services/fileUpload";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useFormP from "./hooks/useFormP";

const AddPaletas = () => {
  
  const { paletas } = useSelector((state) => state.paletasStore);
  const [tittle, setTittle] = useState("Agregar nueva paleta a la colección");
  const [initialValue, setInitialValue] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    quantity: "",
  });
  const [urlImg, setUrlImg] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (id) {
      setTittle("Edite la paleta");
      const paletaFind = paletas.find((paleta) => paleta.id === id);
      if (paletaFind) {
        const valueForm = {
          name: paletaFind.name,
          category: paletaFind.category,
          price: paletaFind.price,
          description: paletaFind.description,
          quantity: paletaFind.quantity,
        };
        setInitialValue(valueForm);
        setUrlImg(paletaFind.image);
        setDataForm(valueForm)
      }
    }
  }, []);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },watch
  } = useForm();
  const { error } = useSelector((state) => state.paletasStore);
  const dispatch = useDispatch();
  // const handdleChangeInputs=(target)=>{
  //   setInitialValue({...initialValue,
  //     [target.name]:target.value
  //   })
  //   console.log(initialValue)
  

  // }
  const [dataForm,setDataForm, handleChangeInput]=useFormP({
    name: "",
    category: "",
    price: "",
    description: "",
    quantity: "",
  })
  const onSubmit = async (data) => {
    if (id) {
      console.log(dataForm);
      
      // console.log(data)


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
      <h1>{tittle} </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map((item, index) => {
          if (item.type === "select") {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Select
                name={item.name}
                onChange={handleChangeInput}
                  // defaultValue={initialValue[item.name]}
                  aria-label="Default select example"
                 
                  {...register(item.name)}
                >
                  <option value="">Seleccione una opción</option>
                  {category.map((element) => (
                    <option
                      key={element.value}
                      value={element.label}
                      className="text-capitalize"
                      selected={
                        initialValue[item.name] &&
                        initialValue[item.name] === element.label
                          ? true
                          : false
                      }
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
                 name={item.name}
                //  onChange={({target})=>{handdleChangeInputs(target)}}
                  defaultValue={initialValue[item.name]}
                  // value={dataForm[item.name]}
                  onChange={handleChangeInput}
                  as="textarea"
                  {...register(item.name)}
                />
                {/* <p>{errors[item.name]?.message}</p> */}
              </FloatingLabel>
            );
          }

          return (
            <FloatingLabel key={index} label={item.label} className="mb-3">
              <Form.Control
               name={item.name}
                // onChange={({target})=>{handdleChangeInputs(target)}}
                onChange={handleChangeInput}
                defaultValue={initialValue[item.name]}
                type={item.type}
                size={item.type === "file" ? "sm" : ""}
                {...register(item.name)}
              />
              {/* <p>{errors[item.name]?.message}</p> */}
            </FloatingLabel>
          );
        })}
        <Button variant="warning" type="submit" className="mb-3">
          Agregar paleta
        </Button>
      </Form>
    </div>
  );
};

export default AddPaletas;
