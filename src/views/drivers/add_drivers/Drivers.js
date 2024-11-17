import React, { useEffect, useState } from 'react';
import { helpFetch } from '/src/components/helpers/helpFetch';
import {
  CForm,
  CFormInput,
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
  CFormSelect
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react'; 
import { cilHistory, cilTrash } from '@coreui/icons'; 

const ADrivers = () => {
  const api = helpFetch();
  const [updateData, setUpdateData] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [states, setStates] = useState([]); 
  const [municipalities, setMunicipalities] = useState([]); 
  const [filteredMunicipalities, setFilteredMunicipalities] = useState([]); 

  useEffect(() => {
    // Fetch drivers
    api.get("driver").then((response) => {
      if (!response.error) setDrivers(response);
    });

    // Fetch states
    const fetchStates = async () => {
      const response = await api.get("state"); 
      if (!response.error) setStates(response);
    };

    fetchStates();
  }, []);

  useEffect(() => {
    // Fetch municipalities
    const fetchMunicipalities = async () => {
      const response = await api.get("municipality"); 
      if (!response.error) setMunicipalities(response);
    };

    fetchMunicipalities();
  }, []);

  const addDriver = (add) => {
    const options = { body: add };

    api.post("driver", options).then((response) => {
      if (!response.error) setDrivers([...drivers, response]);
    });
  };

  const updateDriver = (add) => {
    const options = { body: { ...add, updated_at: new Date().toISOString() } };

    api.put("driver", options, add.id).then((response) => {
      if (!response.error) {
        const newDrivers = drivers.map(el => el.id === add.id ? response : el);
        setDrivers(newDrivers);
        setUpdateData(null);
      }
    });
  };

  const deleteDriver = (id) => {
    const confirmDelete = window.confirm(`¿Deseas eliminar el registro con id: ${id}?`);

    if (confirmDelete) {
      api.delet("driver", id).then((response) => {
        if (!response.error) {
          const newDrivers = drivers.filter(el => el.id !== String(id));
          setDrivers(newDrivers);
        }
      });
    }
  };

  const [formData, setFormData] = useState({
    id_driver: '',
    name_driver: '',
    lastname_driver: '',
    phone: '',
    fkid_municipality: '',
    status_driver: '',
    created_at: '',
    updated_at: '',
    id: null,
    fkid_state: ''
  });

  useEffect(() => {
    if (updateData != null) {
      setFormData(updateData);

      // Filtro
      const selectedStateId = updateData.fkid_municipality ? municipalities.find(m => m.id_municipality === updateData.fkid_municipality)?.fkid_state : null;
      if (selectedStateId) {
        const filtered = municipalities.filter(m => m.fkid_state === selectedStateId);
        setFilteredMunicipalities(filtered);
      }
    } else {
      resetForm();
    }
  }, [updateData, municipalities]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateData != null) {
      updateDriver(formData);
    } else {
      const currentDate = new Date().toISOString();
      formData.created_at = currentDate;
      formData.updated_at = currentDate;
      formData.id = Date.now().toString();
      addDriver(formData);
      resetForm();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Filtro
    if (e.target.name === 'fkid_state') {
      const selectedStateId = e.target.value;
      const filtered = municipalities.filter(m => m.fkid_state === selectedStateId);
      setFilteredMunicipalities(filtered);
      setFormData({
        ...formData,
        fkid_municipality: ''
      });
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id_driver: '',
      name_driver: '',
      lastname_driver: '',
      phone: '',
      fkid_municipality: '',
      status_driver: '',
      created_at: '',
      updated_at: '',
      id: null,
    });
    setUpdateData(null);
    setFilteredMunicipalities([]);
  };

  const municipalityMap = municipalities.reduce((acc, municipality) => {
    acc[municipality.id_municipality] = municipality.name;
    return acc;
  }, {});

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard className='mb-4'>
            <CCardHeader>
              <h2>{updateData ? "Actualizar Chofer" : "Registrar Nuevo Chofer"}</h2>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="id_driver"
                      name="id_driver"
                      label="Cédula"
                      placeholder="Ingrese la cédula del chofer"
                      onChange={handleChange}
                      value={formData.id_driver}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="name_driver"
                      name="name_driver"
                      label="Nombre"
                      placeholder="Ingrese el nombre"
                      onChange={handleChange}
                      value={formData.name_driver}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="lastname_driver"
                      name="lastname_driver"
                      label="Apellido"
                      placeholder="Ingrese el apellido"
                      onChange={handleChange}
                      value={formData.lastname_driver}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormSelect
                      id="fkid_state"
                      name="fkid_state"
                      label="Estado"
                      onChange={handleChange}
                      value={formData.fkid_state}
                      required
                    >
                      <option value="">Seleccione un estado...</option>
                      {states.map(state => (
                        <option key={state.id_state} value={state.id_state}>{state.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CFormSelect
                      id="fkid_municipality"
                      name="fkid_municipality"
                      label="Municipio"
                      onChange={handleChange}
                      value={formData.fkid_municipality}
                      required
                    >
                      <option value="">Seleccione un municipio...</option>
                      {filteredMunicipalities.map(municipality => (
                        <option key={municipality.id_municipality} value={municipality.id_municipality}>{municipality.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="tel"
                      id="phone"
                      name="phone"
                      label="Teléfono"
                      placeholder="Ingrese el teléfono"
                      onChange={handleChange}
                      value={formData.phone}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CFormSelect
                      id="status_driver"
                      name="status_driver"
                      label="Estado del Chofer"
                      onChange={handleChange}
                      value={formData.status_driver}
                      required
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CButton type="submit" color="primary" className="mt-3">
                  {updateData ? "Actualizar" : "Registrar"}
                </CButton>
                <CButton type="button" color="secondary" className="mt-3 ms-2" onClick={handleCancel}>
                  Cancelar
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
                    <CTableHeaderCell>Municipio</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell>Fecha de Creación</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {drivers.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="8">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    drivers.map((driver) => (
                      <CTableRow key={driver.id}>
                        <CTableDataCell>{driver.id_driver}</CTableDataCell>
                        <CTableDataCell>{driver.name_driver}</CTableDataCell>
                        <CTableDataCell>{driver.lastname_driver}</CTableDataCell>
                        <CTableDataCell>{driver.phone}</CTableDataCell>
                        <CTableDataCell>{municipalityMap[driver.fkid_municipality] || 'N/A'}</CTableDataCell>
                        <CTableDataCell>{driver.status_driver}</CTableDataCell>
                        <CTableDataCell>{new Date(driver.created_at).toLocaleDateString()}</CTableDataCell>
                        <CTableDataCell>
                          <CButton className="update" onClick={() => setUpdateData(driver)}>
                            <CIcon icon={cilHistory} />
                          </CButton>
                          <CButton className="delete" onClick={() => deleteDriver(driver.id)}>
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
    </CContainer>
  );
};

export default ADrivers;