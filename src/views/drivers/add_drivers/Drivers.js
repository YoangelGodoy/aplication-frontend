import React from 'react'
import {
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
} from '@coreui/react'

const ADrivers = () => {
  
  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard className = "mb-4">
            <CCardHeader>
              <h2>Registrar Nuevo Chofer</h2>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="idCard"
                      name="idCard"
                      label="Cédula"
                      placeholder="Ingrese la cédula"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="name"
                      name="name"
                      label="Nombre"
                      placeholder="Ingrese el nombre"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="lastName"
                      name="lastName"
                      label="Apellido"
                      placeholder="Ingrese el apellido"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="phone"
                      name="phone"
                      label="Teléfono"
                      placeholder="Ingrese el teléfono"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="address"
                      name="address"
                      label="Dirección"
                      placeholder="Ingrese la dirección"
                    />
                  </CCol>
                  <CCol md={6}>
                  <CFormSelect id="status" name="status" label="Status">
                  <option value="">Seleccione...</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  </CFormSelect>
                  </CCol>
                </CRow>
                <CButton type="submit" color="primary" className="mt-3">
                  Registrar Chofer
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ADrivers