import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

  const licencia = [
      { numero: '001', cedula: '30782050', grado: '5ta', sexo:'Femenino',emision: '2023-01-01', expiracion: '2028-01-01', },
      { numero: '002', cedula: '30651748', grado: '4ta', sexo:'Masculino',emision: '2023-02-01', expiracion: '2028-02-01', },
    ]
 

function GestionLicencias() {

  return (
    <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <h2>Registro de Licencias</h2>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="numeroLicencia"
                    name="numeroLicencia"
                    label="Número de Licencia"
                    placeholder="Ingrese el Número de Licencia"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="cedulaChofer"
                    name="cedulaChofer"
                    label="Cédula del Chofer"
                    placeholder="Ingrese la Cedula del Chofer"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormSelect
                    id="grado"
                    name="grado"
                    label="Grado"
                  >
                    <option value="">Seleccione...</option>
                    <option value="4ta">4ta</option>
                    <option value="5ta">5ta</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    id="sexo"
                    name="sexo"
                    label="Sexo"
                  >
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    id="fechaEmision"
                    name="fechaEmision"
                    label="Fecha de Emision"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    id="fechaExpiracion"
                    name="fechaExpiracion"
                    label="Fecha de Expiracion"
                  />
                </CCol>
              </CRow>
              <CButton type="submit" color="primary">
                Registrar Licencia
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <h2>Licencias Registradas</h2>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Número</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cédula</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Grado</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha de Emisión</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha de Expiración</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Sexo</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
              {licencia.map((licencia) => (
                            <CTableRow>
                            <CTableDataCell>{licencia.numero}</CTableDataCell>
                            <CTableDataCell>{licencia.cedula}</CTableDataCell>
                            <CTableDataCell>{licencia.grado}</CTableDataCell>
                            <CTableDataCell>{licencia.emision}</CTableDataCell>
                            <CTableDataCell>{licencia.expiracion}</CTableDataCell>
                            <CTableDataCell>{licencia.sexo}</CTableDataCell>
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
    </CRow>
  )
}

export default GestionLicencias