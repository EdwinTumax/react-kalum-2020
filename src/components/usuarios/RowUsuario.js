import React, { useState } from 'react'
import Axios from 'axios';
import swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap';

export const RowUsuario = ({id,apellidos,nombres, password,username,email,bio,roles}) => {
    const token = localStorage.getItem('TOKEN_KEY');
    const [userSeleccionado, setUserSeleccionado] = useState({
        id: id,
        apellidos: apellidos,
        nombres: nombres,
        password: password,
        username: username,
        email: email,
        bio: bio
    }); 
    const [modalEditar,setModalEditar] = useState(false);    
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }
    const history = useHistory();

    const handleChange = e => {
        const {name,value} = e.target;
        setUserSeleccionado((prevState) => ({
            ...prevState,
            [name] : value
        }));
    }

    async function cancelar(e){
        userSeleccionado.apellidos = apellidos;
        userSeleccionado.nombres = nombres;
        userSeleccionado.username = username;
        userSeleccionado.email = email;
        userSeleccionado.bio = bio;
        setModalEditar(false);
    }

    async function editar (e) {
        e.preventDefault();
        try{
            console.log(userSeleccionado);
            const {data} = await Axios.put(`http://localhost:9002/kalum-oauth/v1/usuarios/${userSeleccionado.id}`,userSeleccionado,config);    
            swal.fire('Editar usuario',`${data.Mensaje}`,'success');
        }catch(error){
            userSeleccionado.apellidos = apellidos;
            userSeleccionado.nombres = nombres;
            userSeleccionado.username = username;
            userSeleccionado.email = email;
            userSeleccionado.bio = bio;
            swal.fire('Error',`${JSON.stringify(error.response.data.Mensaje)}`,'error');
        }
        setModalEditar(false);
    }

    const seleccionarUsuario = (elemento,caso) => {
        setUserSeleccionado(elemento);
        (caso === 'editar') && setModalEditar(true);
    }


    async function handleEliminar(e){
        e.preventDefault();
        roles.map((role) => {
            eliminarRolDeUsuario(`http://localhost:9002/kalum-oauth/v1/usuarios/${id}/role/${role.id}`);                
        });
        eliminarUsuario();
    }
    
    async function eliminarRolDeUsuario(url){
        try{
            const {data} = await Axios.delete(url,config);            
        }catch(error){
            swal.fire('Eliminar Rol',`Error: ${error.response.data}`,'error');
        }
    }

    async function eliminarUsuario(){
        try{
            swal.fire({
                title: 'Esta seguro de eliminar el registro?',
                text: `${nombres} ${apellidos}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    Axios.delete(`http://localhost:9002/kalum-oauth/v1/usuarios/${id}`,config)
                        .then(({data}) =>{
                            swal.fire(
                                'Deleted!',
                                `El registro ${username} fue eliminado con éxito.`,
                                'success'
                              )
                              history.replace('/usuarios');
                        }).catch(e =>{
                            console.log(e);
                        })                  
                }
              });
        }catch(error){
            swal.fire('Eliminar Usuario',`Error: ${error.response.data}`,'error');
        }
    }


    return (
        <>
            <tr>
            <td>{userSeleccionado.apellidos}</td>
            <td>{userSeleccionado.nombres}</td>
            <td>{userSeleccionado.username}</td>
            <td>{userSeleccionado.email}</td>
            <td>{userSeleccionado.bio}</td>
            <td>
                <button type="button" onClick={() => seleccionarUsuario(userSeleccionado,'editar')} name="editar" className="btn btn-primary btn-sm">Editar</button>
            </td>
            <td>
                <button type="button" onClick={handleEliminar} name="eliminar" className="btn btn-danger btn-sm">Eliminar</button>
            </td>
            </tr>
            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    Editar Usuario
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Apellidos</label>
                        <input className="form-control" type="text" name="apellidos" onChange={handleChange} value={userSeleccionado && userSeleccionado.apellidos}></input>
                    </div>
                    <div className="form-group">
                        <label>Nombres</label>
                        <input className="form-control" type="text" name="nombres" onChange={handleChange} value={userSeleccionado && userSeleccionado.nombres}></input>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" type="text" name="username" onChange={handleChange} value = {userSeleccionado && userSeleccionado.username}></input>
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <input className="form-control" type="text" name="bio" onChange= {handleChange} value = {userSeleccionado && userSeleccionado.bio}></input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-primary" onClick={editar}>Actualizar</Button>
                    <Button className="btn btn-danger" onClick={cancelar}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
