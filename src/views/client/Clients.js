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

const AClients = () => {
  const api = helpFetch();
  const [updateData, setUpdateData] = useState(null);
  const [clients, setClients] = useState([]);
  const [states, setStates] = useState([]); 
  const [municipalities, setMunicipalities] = useState([]); 
  const [filteredMunicipalities, setFilteredMunicipalities] = useState([]); 

  
  useEffect(() => {
    api.get("client").then((response) => {
      if (!response.error) setClients(response);
    });

    
    const fetchStates = async () => {
      const response = await api.get("state"); 
      if (!response.error) setStates(response);
    };

    fetchStates();
  }, []);


  useEffect(() => {
    const fetchMunicipalities = async () => {
      const response = await api.get("municipality"); 
      if (!response.error) setMunicipalities(response);
    };

    fetchMunicipalities();
  }, []);

  const addClient = (add) => {
    const options = { body: add };

    api.post("client", options).then((response) => {
      if (!response.error) setClients([...clients, response]);
    });
  };

  const updateClient = (add) => {
    const options = { body: { ...add, updated_at: new Date().toISOString() } };

    api.put("client", options, add.id).then((response) => {
      if (!response.error) {
        const newClients = clients.map(el => el.id === add.id ? response : el);
        setClients(newClients);
        setUpdateData(null);
      }
    });
  };

  const deleteClient = (id) => {
    const confirmDelete = window.confirm(`¿Deseas eliminar el registro con id: ${id}?`);

    if (confirmDelete) {
      api.delet("client", id).then((response) => {
        if (!response.error) {
          const newClients = clients.filter(el => el.id !== String(id));
          setClients(newClients);
        }
      });
    }
  };

  const [formData, setFormData] = useState({
    id_client: '',
    name_client: '',
    lastname_client: '',
    fkid_municipality: '',
    phone: '',
    created_at: '',
    updated_at: '',
    id: null,
    fkid_state: ''
  });

  useEffect(() => {
    if (updateData != null) {
      setFormData(updateData);

      const selectedStateId = updateData.fkid_municipality ? municipalities.find(m => m.id_municipality === updateData.fkid_municipality)?.fkid_state : null;
      if (selectedStateId) {
        const filtered = municipalities.filter(m => m.fkid_state === selectedStateId);
        setFilteredMunicipalities(filtered);
      }
    } else {
      setFormData({
        id_client: '',
        name_client: '',
        lastname_client: '',
        fkid_municipality: '',
        phone: '',
        created_at: '',
        updated_at: '',
        id: null, 
      });
      setFilteredMunicipalities([]); 
    }
  }, [updateData, municipalities]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateData != null) {
      updateClient(formData);
    } else {
      const currentDate = new Date().toISOString();
      formData.created_at = currentDate;
      formData.updated_at = currentDate;
      formData.id = Date.now().toString();
      addClient(formData);
      resetForm();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    
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
      id_client: '',
      name_client: '',
      lastname_client: '',
      fkid_municipality: '',
      phone: '',
      created_at: '',
      updated_at: '',
      id: null,
      fkid_state: '' 
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
              <h2>{updateData ? "Actualizar Cliente" : "Registrar Nuevo Cliente"}</h2>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="id_client"
                      name="id_client"
                      label="Cédula"
                      placeholder="Ingrese la cédula del cliente"
                      onChange={handleChange}
                      value={formData.id_client}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="name_client"
                      name="name_client"
                      label="Nombre"
                      placeholder="Ingrese el nombre"
                      onChange={handleChange}
                      value={formData.name_client}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="lastname_client"
                      name="lastname_client"
                      label="Apellido"
                      placeholder="Ingrese el apellido"
                      onChange={handleChange}
                      value={formData.lastname_client}
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
              <h2>Lista de Clientes</h2>
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
                    <CTableHeaderCell>Fecha de Creación</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {clients.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="8">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    clients.map((client) => (
                      <CTableRow key={client.id}>
                        <CTableDataCell>{client.id_client}</CTableDataCell>
                        <CTableDataCell>{client.name_client}</CTableDataCell>
                        <CTableDataCell>{client.lastname_client}</CTableDataCell>
                        <CTableDataCell>{client.phone}</CTableDataCell>
                        <CTableDataCell>{municipalityMap[client.fkid_municipality] || 'N/A'}</CTableDataCell>
                        <CTableDataCell>{new Date(client.created_at).toLocaleDateString()}</CTableDataCell>
                        <CTableDataCell>
                          <CButton className="update" onClick={() => setUpdateData(client)}>
                            <CIcon icon={cilHistory} />
                          </CButton>
                          <CButton className="delete" onClick={() => deleteClient(client.id)}>
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

export default AClients;