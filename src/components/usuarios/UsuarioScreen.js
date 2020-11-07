import React from 'react'
import { TableUsuarios } from './TableUsuarios'

export const UsuarioScreen = () => {
    return (
        <div>
            <h1>Usuarios</h1>
            <hr/>
            <div className="card border-primary mb-3">
                <div className="card-header">Usuarios</div>                
                <div className="card-body text-primary">
                    <h5 className="card-title">Listado de usuarios</h5>
                    <div className="my-2 text-left">
                        <button className="btn btn-rounded btn-primary" type="button">
                            Crear Usuario
                        </button>
                    </div>
                    <div className="alert alert-info">
                        No existen registros en la base de datos
                    </div>
                    <div>
                        <TableUsuarios/>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
