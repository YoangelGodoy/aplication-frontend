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

  const licences = [
      { number: '001', idCard: '30782050', degree: '5ta', sex:'Femenino', emission: '2023-01-01', expiration: '2028-01-01', },
      { number: '002', idCard: '30651748', degree: '4ta', sex:'Masculino', emission: '2023-02-01', expiration: '2028-02-01', },
    ]
 

function Licenses() {

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
              {licences.map((licence) => (
                            <CTableRow>
                            <CTableDataCell>{licence.number}</CTableDataCell>
                            <CTableDataCell>{licence.idCard}</CTableDataCell>
                            <CTableDataCell>{licence.degree}</CTableDataCell>
                            <CTableDataCell>{licence.emission}</CTableDataCell>
                            <CTableDataCell>{licence.expiration}</CTableDataCell>
                            <CTableDataCell>{licence.sex}</CTableDataCell>
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

export default Licenses