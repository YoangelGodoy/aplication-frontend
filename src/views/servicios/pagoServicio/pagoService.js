import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
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

const pagoservicio = [
    { id:'001', cedula: '30987654', idS:'001', fecha:'2023-05-01', status:'Pendiente', metodo:'Transferencia',  monto:'750', decrip:'Pago'},
    { id:'002', cedula: '30932654', idS:'002', fecha:'2023-06-01', status:'Completado', metodo:'Efectivo',  monto:'520', decrip:'Servicio remolque carro'},
  ]

 function PagoServicio() {
  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h2>Registro de Pagos de Clientes</h2>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="cedulaCliente"
                    name="cedulaCliente"
                    label='Cédula del Cliente'
                    placeholder='Ingresa la Cédula del Cliente'
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="idServicio"
                    name="idServicio"
                    label='ID de Servicio'
                    placeholder='Ingresa el ID del Servicio'
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    id="fechaPago"
                    name="fechaPago"
                    label='Fecha de Pago'
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    id="status"
                    name="status"
                    label='Status'
                  >
                    <option value="">Seleccione...</option>
                    <option value="completado">Completado</option>
                    <option value="pendiente">Pendiente</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormSelect
                    id="metodoPago"
                    name="metodoPago"
                    label='Método de Pago'
                    placeholder='Ingresa el Metodo de Pago'
                  >
                    <option value="">Seleccione...</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="number"
                    id="monto"
                    name="monto"
                    label='Monto'
                    placeholder='Ingresa el Monto'
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
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h2>Historial de Pagos</h2>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID Servicio</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Método de Pago</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Monto</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
              {pagoservicio.map((pagoS) => (
                            <CTableRow>
                            <CTableDataCell>{pagoS.id}</CTableDataCell>
                            <CTableDataCell>{pagoS.cedula}</CTableDataCell>
                            <CTableDataCell>{pagoS.idS}</CTableDataCell>
                            <CTableDataCell>{pagoS.fecha}</CTableDataCell>
                            <CTableDataCell>{pagoS.status}</CTableDataCell>
                            <CTableDataCell>{pagoS.metodo}</CTableDataCell>
                            <CTableDataCell>{pagoS.monto}</CTableDataCell>
                            <CTableDataCell>{pagoS.decrip}</CTableDataCell>
                            </CTableRow>
                        ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PagoServicio