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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/react'

const GTowTrucks = () =>{

    const towTrucks = [
        { id: 1, tuition: '22RTAG', model: 'Triton', type_towtruck: 'Plataforma', status: 'Activa'},
        { id: 2, tuition: '77RGPO', model: 'Cheyenne', type_towtruck: 'Gancho', status: 'Inactiva'},
      ]
    
    return(
      <CContainer>
       <CRow>
        <CCol>
          <CCard className = "mb-4">
            <CCardHeader>
              <h2>Registrar Nueva Grúa</h2>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormInput
                      type='text'
                      id="tuition"
                      name="tuition"
                      label="Matricula"
                      placeholder="Ingrese la Matricula"
                    /> 
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="model"
                      name="model"
                      label="Modelo"
                      placeholder="Ingrese el Modelo"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                <CCol md={6}>
                <CFormSelect id="type_towtruck" name="type_towtruck" label="Tipo de Grúa">
                  <option value="">Seleccione...</option>
                  <option value="gancho">Gancho</option>
                  <option value="plataforma">Plataforma</option>
                  </CFormSelect>
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
                  Registrar Grúa
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
              <h2>Lista de Grúas</h2>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Matricula</CTableHeaderCell>
                    <CTableHeaderCell>Modelo</CTableHeaderCell>
                    <CTableHeaderCell>Estatus</CTableHeaderCell>
                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {towTrucks.map((towtruck) => (
                    <CTableRow>
                      <CTableDataCell>{towtruck.tuition}</CTableDataCell>
                      <CTableDataCell>{towtruck.model}</CTableDataCell>
                      <CTableDataCell>{towtruck.type_towtruck}</CTableDataCell>
                      <CTableDataCell>{towtruck.status}</CTableDataCell>
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
export default GTowTrucks