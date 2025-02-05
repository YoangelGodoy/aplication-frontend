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
import { cilPencil, cilSearch, cilTrash, cilUserPlus } from '@coreui/icons'; 
import '../../scss/_custom.scss';

const AClients = () => {
  const api = helpFetch();
  const [updateData, setUpdateData] = useState(null);
  const [clients, setClients] = useState([]);
  const [municipalities, setMunicipalities] = useState([]); 
  const [modalVisible2, setModalVisible2] = useState(false); // Estado para el modal2
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [clientToDelete, setClientToDelete] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    api.get("clients").then((response) => {
      if (response && response.clients && response.clients.length) {
        setClients(response.clients);
      } else {
        setClients([]);
      }
    }).catch((error) => {
      console.error("Error al obtener los clients:", error);
      setClients([]);
    });

    api.get("municipality").then((response) => {
      if (response && response.municipality && response.municipality.length) {
        setMunicipalities(response.municipality);
      } else {
        setMunicipalities([]);
      }
    }).catch((error) => {
      console.error("Error al obtener los Municipalities:", error);
      setMunicipalities([]);
    });
  }, []);

  const addClient = (add) => {
    const options = { body: add };
    api.post("clientCreate", options).then((response) => {
      if (!response.error) setClients([...clients, response.client]);
      window.location.reload();
    });
  };

  const updateClient = (add) => {
    const options = { body: { ...add, updated_at: new Date().toISOString() } };
    api.put("clientUpdate", options, add.id).then((response) => {
      if (!response.error) {
        const newClients = clients.map(el => el && el.id === add.id ? response.client : el);
        setClients(newClients);
        setUpdateData(null);
        window.location.reload();
      }
    });
  };

  const deleteClient = (id) => {
    setClientToDelete(id);
    setModalVisible2(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      api.delet("clientDelete", clientToDelete).then((response) => {
        if (!response.error) {
          const newClients = clients.filter(el => el.id !== String(clientToDelete));
          setClients(newClients);
          window.location.reload();
        }
      });
    }
    setModalVisible2(false);
    setClientToDelete(null);
  };

  const cancelDelete = () => {
    setModalVisible2(false);
    setClientToDelete(null);
  };

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    lastname: '',
    municipality_id: '',
    phone: '',
    created_at: '',
    updated_at: '',
  });

  useEffect(() => {
    if (updateData != null) {
      setFormData(updateData);
    } else {
      setFormData({
        id: '',
        name: '',
        lastname: '',
        municipality_id: '',
        phone: '',
        created_at: '',
        updated_at: '',
      });
    }
  }, [updateData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateData != null) {
      updateClient(formData);
    } else {
      const currentDate = new Date().toISOString();
      formData.created_at = currentDate;
      formData.updated_at = currentDate;
      addClient(formData);
      resetForm();
    }
    setModalVisible(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleCancel = () => {
    resetForm();
    setModalVisible(false);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      lastname: '',
      municipality_id: '',
      phone: '',
      created_at: '',
      updated_at: '',
    });
    setUpdateData(null);
  };

  const municipalityMap = municipalities.reduce((acc, municipality) => {
    acc[municipality.id_municipality] = municipality.name;
    return acc;
  }, {});
    
  const filteredClients = clients.filter(client => {
    if(client && client.name) {
      return (
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return false;
  });

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="text-white bg-primary">
            <h2>Lista de Clientes</h2>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className='mb-4'>
          <CCardHeader style={{display:"flex", alignItems:"center"}}>
              <CIcon icon={cilSearch}/>
               <CFormInput
                  type="text"
                  placeholder = "Buscar por nombre o apellido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '300px', marginLeft:"10px",marginRight:"590px"}}
               />
               <CButton color="success" onClick={() => setModalVisible(true)}>
                  <CIcon icon={cilUserPlus} />
                </CButton>
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
                  {filteredClients.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="8">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    filteredClients.map((client) => (
                      <CTableRow key={client.id}>
                        <CTableDataCell>{client.id}</CTableDataCell>
                        <CTableDataCell>{client.name}</CTableDataCell>
                        <CTableDataCell>{client.lastname}</CTableDataCell>
                        <CTableDataCell>{client.phone}</CTableDataCell>
                        <CTableDataCell>{municipalityMap[client.municipality_id] || 'N/A'}</CTableDataCell>
                        <CTableDataCell>{new Date(client.created_at).toLocaleDateString()}</CTableDataCell>
                        <CTableDataCell style={{display:"flex",justifyContent:"flex-end"}}>
                          <CButton className="update" onClick={() => { setUpdateData(client); setModalVisible(true); }}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton className="delete" onClick={() => {deleteClient(client.id); setModalVisible2(true);}}>
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
      <div className={`modal ${modalVisible2 ? 'show' : ''}`} style={{ display: modalVisible2 ? 'block' : 'none' }} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirmar Eliminación</h5>
                    <button type="button" className="btn-close" onClick={cancelDelete} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>¿Estás seguro de que deseas eliminar este registro?</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancelar</button>
                    <button type="button" className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`modal modal-lg modal fade ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none', margin: '0 auto' }} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header text-white bg-primary">
                    <h3 className="modal-title">{updateData ? "Actualizar Cliente" : "Registrar Nuevo Cliente"}</h3>
                    <button type="button" className="btn-close" onClick={handleCancel} aria-label="Close"></button>
                  </div>
                  <div className ="modal-body">
                  <CForm onSubmit={handleSubmit}>
                    <CRow className='mt-3'>
                      <CCol md={6}>
                        <CFormInput
                          type="text"
                          id="id"
                          name="id"
                          label="Cédula"
                          placeholder="Ingrese la cédula del cliente"
                          onChange={handleChange}
                          value={formData.id}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormInput
                          type="text"
                          id="name"
                          name="name"
                          label="Nombre"
                          placeholder="Ingrese el nombre"
                          onChange={handleChange}
                          value={formData.name}
                          required
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                      <CCol md={6}>
                        <CFormInput
                          type="text"
                          id="lastname"
                          name="lastname"
                          label="Apellido"
                          placeholder="Ingrese el apellido"
                          onChange={handleChange}
                          value={formData.lastname}
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormSelect
                          id="municipality_id"
                          name="municipality_id"
                          label="Municipio"
                          onChange={handleChange}
                          value={formData.municipality_id}
                          required
                        >
                          <option value="">Seleccione un municipio...</option>
                          {municipalities.map(municipality => (
                            <option key={municipality.id_municipality} value={municipality.id_municipality}>{municipality.name}</option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3 mb-3">
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
                  </div>
                </div>
              </div>
            </div>
    </CContainer>
  );
};

export default AClients;