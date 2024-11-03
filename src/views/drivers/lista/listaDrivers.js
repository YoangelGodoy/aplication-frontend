
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
    const choferes = [
        { id: 1, cedula: '30782050', nombre: 'Yoangel', apellido: 'Godoy', telefono: '04147287332', direccion: 'Michelena', status: 'Activo' },
        { id: 2, cedula: '30651748', nombre: 'Aaron', apellido: 'Godoy', telefono: '04127584461', direccion: 'Lobatera', status: 'Inactivo' },
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
                        {choferes.map((chofer) => (
                            <CTableRow key={chofer.id}>
                            <CTableDataCell>{chofer.cedula}</CTableDataCell>
                            <CTableDataCell>{chofer.nombre}</CTableDataCell>
                            <CTableDataCell>{chofer.apellido}</CTableDataCell>
                            <CTableDataCell>{chofer.telefono}</CTableDataCell>
                            <CTableDataCell>{chofer.direccion}</CTableDataCell>
                            <CTableDataCell>
                                <CBadge color={ColorStatus(chofer.status)}>
                                {chofer.status}
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