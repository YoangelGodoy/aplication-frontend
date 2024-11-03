import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const pagochofer = [
    { cedula:'30780090', fecha:'2024-02-21', monto:'500', descrip:'pago mensual'},
    { cedula:'30784590', fecha:'2024-11-21', monto:'600', descrip:'pago mensual'},

  ]

function Pagochofer() {
  return (
    <CRow>
      <CCol md={9}>
        <CCard className="mb-4">
          <CCardHeader>
            <h2>Registro de Pagos</h2>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormInput
                    type="text"
                    id="cedulaChofer"
                    name="cedulaChofer"
                    label="Cedula del Chofer"
                    placeholder='Ingrese la Cedula del Chofer'
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    id="fechaPago"
                    name="fechaPago"
                    label="Fecha del Pago"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="monto"
                    name="monto"
                    label='Monto'
                    placeholder='Ingrese el Monto'
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={12}>
                  <CFormTextarea
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    rows={3}
                  />
                </CCol>
              </CRow>
              <CButton type="submit" color="primary">
                Registrar Pago
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <h2>Historial de Pagos</h2>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Cédula del Chofer</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha de Pago</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Monto</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
              {pagochofer.map((pago) => (
                            <CTableRow>
                            <CTableDataCell>{pago.cedula}</CTableDataCell>
                            <CTableDataCell>{pago.fecha}</CTableDataCell>
                            <CTableDataCell>${pago.monto}</CTableDataCell>
                            <CTableDataCell>{pago.descrip}</CTableDataCell>
                            </CTableRow>
                        ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>
    </CRow>
  )
}

export default Pagochofer