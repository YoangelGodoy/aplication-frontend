
import React from 'react'
import {
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
  CTableDataCell,
  CBadge
} from '@coreui/react'

const listaDriver  =()=>{
    const Drivers = [
        { id: 1, idCard: '30782050', name: 'Yoangel', lastName: 'Godoy', phone: '04147287332', address: 'Michelena', status: 'Activo' },
        { id: 2, idCard: '30651748', name: 'Aaron', lastName: 'Godoy', phone: '04127584461', address: 'Lobatera', status: 'Inactivo' },
      ]
      const ColorStatus = (status) => {
        switch (status) {
          case 'Inactivo':
            return 'warning'
          case 'Activo':
            return 'success'
          default:
            return 'secondary'
        }
      }

    return(
        <CContainer>
            <CRow>
                <CCol>
                <CCard>
                    <CCardHeader>
                    <h2>Lista de Choferes</h2>
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
                            <CTableHeaderCell>Status</CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                        </CTableRow>
                        </CTableHead>
                        <CTableBody>
                        {Drivers.map((driver) => (
                            <CTableRow key={driver.id}>
                            <CTableDataCell>{driver.idCard}</CTableDataCell>
                            <CTableDataCell>{driver.name}</CTableDataCell>
                            <CTableDataCell>{driver.lastName}</CTableDataCell>
                            <CTableDataCell>{driver.phone}</CTableDataCell>
                            <CTableDataCell>{driver.address}</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color={ColorStatus(driver.status)}>
                                {driver.status}
                                </CBadge>
                            </CTableDataCell>
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

export default listaDriver