import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react'; 
import { cilHistory, cilTrash } from '@coreui/icons'; 
import { helpFetch } from '/src/components/helpers/helpFetch';

function Licenses() {
  const api = helpFetch();
  const [licences, setLicences] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [formData, setFormData] = useState({
    number: '',
    idCard: '',
    degree: '',
    sex: '',
    emission: '',
    expiration: '',
  });

  useEffect(() => {
    api.get("license").then((response) => {
      if (!response.error) setLicences(response);
    });

    api.get("driver").then((response) => {
      if (!response.error) setDrivers(response);
    });
  }, []);

  useEffect(() => {
    if (updateData) {
      setFormData({
        number: updateData.number,
        idCard: updateData.idCard,
        degree: updateData.degree,
        sex: updateData.sex,
        emission: updateData.emission,
        expiration: updateData.expiration,
      });
    }
  }, [updateData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateData) {
      updateLicense(formData);
    } else {
      addLicense(formData);
    }
  };

  const addLicense = (data) => {
    const options = { body: data };
    api.post("license", options).then((response) => {
      if (!response.error) {
        setLicences([...licences, response]);
        resetForm();
      }
    });
  };

  const updateLicense = (data) => {
    const options = { body: { ...data, updated_at: new Date().toISOString() } };
    api.put("license", options, updateData.id).then((response) => {
      if (!response.error) {
        const updatedLicences = licences.map(el => el.id === updateData.id ? response : el);
        setLicences(updatedLicences);
        resetForm(); 
      }
    });
  };

  const deleteLicense = (id) => {
    const confirmDelete = window.confirm(`¿Deseas eliminar la licencia con número: ${id}?`);
    if (confirmDelete) {
      api.delet("license", id).then((response) => {
        if (!response.error) {
          const newLicences = licences.filter(licence => licence.id !== id);
          setLicences(newLicences);
        }
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      number: '',
      idCard: '',
      degree: '',
      sex: '',
      emission: '',
      expiration: '',
    });
    setUpdateData(null);
  };

  return (
    <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <h2>Registro de Licencias</h2>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="numeroLicencia"
                    name="number"
                    label="Número de Licencia"
                    placeholder="Ingrese el Número de Licencia"
                    value={formData.number}
                    onChange ={handleChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    id="cedulaChofer"
                    name="idCard"
                    label="Cédula del Chofer"
                    value={formData.idCard}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    {drivers.map(driver => (
                      <option key={driver.id_driver} value={driver.id_driver}>{driver.id_driver}</option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormSelect
                    id="grado"
                    name="degree"
                    label="Grado"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="4ta">4ta</option>
                    <option value="5ta">5ta</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    id="sexo"
                    name="sex"
                    label="Sexo"
                    value={formData.sex}
                    onChange={handleChange}
                    required
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
                    name="emission"
                    label="Fecha de Emisión"
                    value={formData.emission}
                    onChange={handleChange}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    id="fechaExpiracion"
                    name="expiration"
                    label="Fecha de Expiración"
                    value={formData.expiration}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CButton type="submit" color="primary">
                {updateData ? "Actualizar Licencia" : "Registrar Licencia"}
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
                  {licences.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="7">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    licences.map((licence) => (
                      <CTableRow key={licence.id}>
                        <CTableDataCell>{licence.number}</CTableDataCell>
                        <CTableDataCell>{licence.idCard}</CTableDataCell>
                        <CTableDataCell>{licence.degree}</CTableDataCell>
                        <CTableDataCell>{licence.emission}</CTableDataCell>
                        <CTableDataCell>{licence.expiration}</CTableDataCell>
                        <CTableDataCell>{licence.sex}</CTableDataCell>
                        <CTableDataCell>
                          <CButton className="update" onClick={() => setUpdateData(licence)}>
                            <CIcon icon={cilHistory} />
                          </CButton>
                          <CButton className="delete" onClick={() => deleteLicense(licence.id)}>
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  );
}

export default Licenses;