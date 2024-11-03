import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
} from '@coreui/react'

const serviciosGrua = [
  {
    id: '001',
    cedulaCliente: '12345678',
    cedulaChofer: '87654321',
    matriculaGrua: 'ABC123',
    costo: 150.00,
    tipoVehiculo: 'carro',
    status: 'Completado',
    descripcion: 'Servicio de grúa por avería en carretera'
  },
  {
    id: '002',
    cedulaCliente: '23456789',
    cedulaChofer: '98765432',
    matriculaGrua: 'XYZ789',
    costo: 200.00,
    tipoVehiculo: 'camion',
    status: 'En Proceso',
    descripcion: 'Remolque de camión accidentado'
  },
  {
    id: '003',
    cedulaCliente: '23456789',
    cedulaChofer: '98765432',
    matriculaGrua: 'XYZ789',
    costo: 200.00,
    tipoVehiculo: 'camion',
    status: 'Pendiente',
    descripcion: 'Remolque de camión accidentado'
  },
]

const ColorStatus = (status) => {
  switch (status) {
    case 'Pendiente':
      return 'warning'
    case 'En Proceso':
      return 'info'
    case 'Completado':
      return 'success'
    default:
      return 'secondary'
  }
}

function Lista() {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h2>Lista de Servicios de Grúa</h2>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
              <CTableHeaderCell scope="col">Chofer</CTableHeaderCell>
              <CTableHeaderCell scope="col">Matrícula</CTableHeaderCell>
              <CTableHeaderCell scope="col">Costo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {serviciosGrua.map((servicio) => (
              <CTableRow key={servicio.id}>
                <CTableDataCell>{servicio.id}</CTableDataCell>
                <CTableDataCell>{servicio.cedulaCliente}</CTableDataCell>
                <CTableDataCell>{servicio.cedulaChofer}</CTableDataCell>
                <CTableDataCell>{servicio.matriculaGrua}</CTableDataCell>
                <CTableDataCell>${servicio.costo.toFixed(2)}</CTableDataCell>
                <CTableDataCell>{servicio.tipoVehiculo}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={ColorStatus(servicio.status)}>
                    {servicio.status}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{servicio.descripcion}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Lista