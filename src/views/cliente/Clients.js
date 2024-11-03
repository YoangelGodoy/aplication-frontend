import React from 'react'
import {
  CForm,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/react'

const GClients = () => {
  
  const clientes = [
    { id: 1, cedula: '30782050', nombre: 'Yoangel', apellido: 'Godoy', telefono: '04147287332', direccion: 'Michelena', status: 'Activo' },
    { id: 2, cedula: '30651748', nombre: 'Aaron', apellido: 'Godoy', telefono: '04127584461', direccion: 'Lobatera', status: 'Inactivo' },
  ]
  return(
  <CContainer>
    <CRow>
      <CCol>
        <CCard className='mb-4'>
          <CCardHeader>
            <h2>Registrar Nuevo Cliente</h2> 
          </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow className='mt-3'>
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        id="cedula"
                        name="cedula"
                        label="Cédula"
                        placeholder="Ingrese la cédula"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        placeholder="Ingrese el nombre"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mt-3">
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        id="apellido"
                        name="apellido"
                        label="Apellido"
                        placeholder="Ingrese el apellido"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="tel"
                        id="telefono"
                        name="telefono"
                        label="Teléfono"
                        placeholder="Ingrese el teléfono"
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mt-3">
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        id="direccion"
                        name="direccion"
                        label="Dirección"
                        placeholder="Ingrese la dirección"
                      />
                    </CCol>
                  </CRow>
                <CButton type="submit" color="primary" className="mt-3">
                  Registrar Cliente
                </CButton>
              </CForm>
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h2>Lista de Clientes</h2>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Cédula</CTableHeaderCell>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Apellido</CTableHeaderCell>
                    <CTableHeaderCell>Teléfono</CTableHeaderCell>
                    <CTableHeaderCell>Dirección</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {clientes.map((cliente) => (
                    <CTableRow key={cliente.id}>
                      <CTableDataCell>{cliente.cedula}</CTableDataCell>
                      <CTableDataCell>{cliente.nombre}</CTableDataCell>
                      <CTableDataCell>{cliente.apellido}</CTableDataCell>
                      <CTableDataCell>{cliente.telefono}</CTableDataCell>
                      <CTableDataCell>{cliente.direccion}</CTableDataCell>
                      <CTableDataCell>
                        <CButton className="update">
                         Actualizar
                        </CButton>
                        <CButton className="delete">
                         Borrar
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
  </CContainer>
  )
}

export default GClients;