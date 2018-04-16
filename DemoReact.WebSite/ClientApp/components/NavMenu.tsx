import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return   <div>
            <ul className="nav flex-column nav-pills">
                <li className="nav-item">
                    <NavLink to={'/'} exact className='nav-link' activeClassName='active' >
                          Home
                    </NavLink>
               
                </li>

                <li className="nav-item">
                    <NavLink to={'/clientes'} className='nav-link' activeClassName='active'>
                        Clientes
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to={'/personas'} className='nav-link' activeClassName='active'>
                        Personas
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to={'/modal1'} className='nav-link' activeClassName='active'>
                        Modal JQuery
                    </NavLink>
                </li>
                
                <li className="nav-item">
                    <NavLink to={'/modal2'} className='nav-link' activeClassName='active'>
                        Modal React
                    </NavLink>
                </li>


                <li className="nav-item">                   
                    <NavLink to={'/counter'} className='nav-link' activeClassName='active'>
                         Counter
                    </NavLink>
                </li>

                <li className="nav-item">      
                    <NavLink to={'/fetchdata'} className='nav-link' activeClassName='active'>
                         Fetch data
                    </NavLink>
                </li>

               
            </ul>
        </div>        ;
    }
}
