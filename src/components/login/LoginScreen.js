import React, { useContext, useState } from 'react'
import Axios from 'axios';
import qs from 'querystring';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const LoginScreen = ({history}) => {
    const tokenApp = Buffer.from('kalum:Inicio.2020','utf8').toString('base64');
    const config = {
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : `Basic ${tokenApp}`
        }
    }
    const [login,setLogin] = useState({
        username: 'etumax',
        password: 'Guatemala',
        grant_type : 'password'
    });

    const {dispatch} = useContext(AuthContext)

    async function handleLogin(e){
        e.preventDefault();
        try{
            const {data} = await Axios.post('http://localhost:9002/oauth/token', qs.stringify(login),config);
            swal.fire('Login',`Bienvenido al sistema ${data.apellidos} ${data.nombres}`,'success');
            dispatch({type: types.login, payload: data});
        }catch(error){
            if(error.response.status === 400){
                swal.fire('Login',`Credenciales incorectas, intente de nuevo`,'error')
            }else{
                swal.fire('Login',`Error ${error.response.data.error_description}`,'error');
            }
        }
    }

    function handleInputChange(e){
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
        console.log(login);
    }

    return (
        <div className="container mt-5">

            <div className="card border-primary text-center">
                <div className="card-header">
                    Iniciar sesion
                </div>
            </div>
            <div className="card-body">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={login.username} onChange={handleInputChange} className="form-control" name="username" placeholder="username" autoFocus required/>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" value={login.password} onChange={handleInputChange} className="form-control" name="password" placeholder="password" required/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                    <div className="form-group">
                        Aún no tienes cuenta? <Link to="/signup">Registrate</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}
