import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Cliente } from './components/Cliente';
import { ClienteCrear } from './components/ClienteCrear';
import { Persona } from './components/Persona';
import { PersonaCrear } from './components/PersonaCrear';

import { ModalJQuery } from './components/ModalJQuery';
import { ModalReact } from './components/ModalReact';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route exact path='/modal1' component={ModalJQuery} />
    <Route exact path='/modal2' component={ModalReact} />

    <Route exact path='/clientes' component={Cliente} />
    <Route exact path='/clientes/crear' component={ClienteCrear} />
    <Route exact path='/clientes/editar/:id' component={ClienteCrear} />

    <Route exact path='/personas' component={Persona} />
    <Route exact path='/personas/crear' component={PersonaCrear} />
    <Route exact path='/personas/editar/:id' component={PersonaCrear} />

</Layout>;
