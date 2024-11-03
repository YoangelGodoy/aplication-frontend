import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const GClients = React.lazy(() => import ('./views/cliente/Clients'))
const GDrivers = React.lazy(() => import ('./views/drivers/añadir/Drivers')) 
const listaDriver = React.lazy(() => import ('./views/drivers/lista/listaDrivers')) 
const GestionLicencias = React.lazy(() => import ('./views/drivers/añadirLicencia/GestionLicencias')) 
const Pagochofer = React.lazy(() => import ('./views/drivers/pagos/pagosDrivers')) 
const GTowTrucks = React.lazy(() => import ('./views/towTrucks/TowTrucks')) 
const AñadirS = React.lazy(() => import ('./views/servicios/añadir/añadirS')) 
const ListaServicio = React.lazy(() => import ('./views/servicios/lista/ListaServicio')) 
const PagoServicio = React.lazy(() => import ('./views/servicios/pagoServicio/pagoService')) 


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/drivers/añadir' ,  name: 'Drivers', element: GDrivers },
  { path: '/drivers/lista' ,  name: 'listaDrivers', element: listaDriver },
  { path: '/drivers/añadirLicencia' ,  name: 'Licencias', element: GestionLicencias },
  { path: '/drivers/pagos' ,  name: 'Pagos', element: Pagochofer },
  { path: '/cliente', name:'Clients', element: GClients },
  { path: '/towTrucks', name:'TowTrucks', element: GTowTrucks  },
  { path: '/servicios/añadir', name:'añadirS', element: AñadirS  },
  { path: '/servicios/lista', name:'Servicios', element: ListaServicio},
  { path: '/servicios/pagoServicio', name:'PagoServicio', element: PagoServicio},
]

export default routes
