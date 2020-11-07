import React, { useEffect, useState } from 'react'
import { RowUsuario } from './RowUsuario';
import  Axios  from 'axios'
export const TableUsuarios = () => {

    const [usuarios,setUsuarios] = useState([]);

    useEffect( () =>{
        async function getUsuarios() {
            const {data: listaUsuarios} = await Axios.get('http://localhost:9002/kalum-oauth/v1/usuarios');
            setUsuarios(listaUsuarios);
        }
        getUsuarios();
    },[]);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Apellidos</th>
                    <th>Nombres</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Bio</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(usuario => (
                    <RowUsuario key={usuario.email} {...usuario}/>
                ))}
            </tbody>
        </table>
    )
}
