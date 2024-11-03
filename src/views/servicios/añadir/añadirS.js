import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CButton
} from '@coreui/react'

function AñadirS() {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h2>Servicio de Grúa</h2>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput 
              type="text" 
              id="cedulaCliente" 
              name="cedulaCliente" 
              placeholder='Ingrese la cedula del Cliente'
              label="Cédula del Cliente"
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect id="tipoVehiculo" name="tipoVehiculo" label="Tipo de Vehiculo">
                <option value="">Seleccione...</option>
                <option value="motocicleta">Motocicleta</option>
                <option value="camion">Camión</option>
                <option value="carro">Carro</option>
                <option value="autobus">Autobús</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput 
              type="text" 
              id="cedulaChofer" 
              name="cedulaChofer" 
              label="Cédula del Chofer"
              placeholder='Ingrese la Cédula del Chofer'
              />
            </CCol>
            <CCol md={6}>
              <CFormInput 
              type="text" 
              id="matriculaGrua" 
              name="matriculaGrua" 
              label="Matrícula de la Grúa"
              placeholder='Ingrese la Matrícula de la Grúa'
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput 
              type="number" 
              id="costo" 
              name="costo" 
              label="Costo"
              placeholder='Ingrese el Costo del Servicio'
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="status">Status</CFormLabel>
              <CFormSelect id="status" name="status">
                <option value="">Seleccione...</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completado">Completado</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormTextarea 
              id="descripcion" 
              name="descripcion" 
              label="Descripción"
              rows={3}>                
              </CFormTextarea>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CButton type="submit" color="primary">
                Guardar Servicio
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AñadirS