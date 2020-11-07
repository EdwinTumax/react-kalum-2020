import React, {useContext} from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types'

export const Navbar = () => {

    const {user:{email}, dispatch} = useContext(AuthContext);

    const history = useHistory();

    const handleLogout = () =>{
        history.replace('/login')
        dispatch({
            type: types.logout
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark"> 
            <Link className="navbar-brand" to="/">
                Kalum
            </Link>
            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink activeClassName="active" className="nav-item nav-link" exact to="/usuarios">
                        Usuarios
                    </NavLink>
                </div>

                <div className="navbar-nav">
                    <NavLink activeClassName="active" className="nav-item nav-link" exact to="/roles">
                        Roles
                    </NavLink>
                </div>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">                
                <div className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info">
                        {email}
                    </span>
                    <button activeClassName="active" className="nav-item nav-link btn" onClick={handleLogout} >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}
