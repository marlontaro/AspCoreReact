import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Cliente } from './components/Cliente';
import { ClienteCrear } from './components/ClienteCrear';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route exact path='/clientes' component={Cliente} />
    <Route exact path='/clientes/crear' component={ClienteCrear} />
    <Route exact path='/clientes/editar/:id' component={ClienteCrear} />
</Layout>;
