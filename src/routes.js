import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Clients = React.lazy(() => import ('./views/cliente/Clients'))
const Drivers = React.lazy(() => import ('./views/drivers/Drivers'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/drivers' ,  name: 'Drivers', element: Drivers},
  { path: '/cliente', name:'Clients', element: Clients },
]

export default routes
