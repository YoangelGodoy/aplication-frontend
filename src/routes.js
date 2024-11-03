import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GClients = React.lazy(() => import ('./views/cliente/Clients'))
const GDrivers = React.lazy(() => import ('./views/drivers/Drivers')) 
const GTowTrucks = React.lazy(() => import ('./views/towTrucks/TowTrucks')) 
const AñadirS = React.lazy(() => import ('./views/servicios/añadir/añadirS')) 
const ListaServicio = React.lazy(() => import ('./views/servicios/lista/ListaServicio')) 

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/drivers' ,  name: 'Drivers', element: GDrivers},
  { path: '/cliente', name:'Clients', element: GClients },
  { path: '/towTrucks', name:'TowTrucks', element: GTowTrucks  },
  { path: '/servicios/añadir', name:'añadirS', element: AñadirS  },
  { path: '/servicios/lista', name:'Servicios', element: ListaServicio},
  
]

export default routes
