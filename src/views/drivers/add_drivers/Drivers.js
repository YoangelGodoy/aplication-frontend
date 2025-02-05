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
import { cilPencil, cilTrash, cilUserPlus, cilSearch } from '@coreui/icons'; 

const ADrivers = () => {
  const api = helpFetch();
  const [updateData, setUpdateData] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [states, setStates] = useState([]); 
  const [municipalities, setMunicipalities] = useState([]); 
  const [filteredMunicipalities, setFilteredMunicipalities] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [modalVisible2, setModalVisible2] = useState(false); // Estado para el modal2
  const [driverToDelete, setDriverToDelete] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    // Fetch drivers
    api.get("drivers").then((response) => {
      if (response && response.drivers && response.drivers.length) {
        setDrivers(response.drivers);
      } else {
        setDrivers([]);
      }
      
    }).catch((error) => {
      console.error("Error al obtener los drivers:", error);
      setDrivers([]);
    });

    // Fetch states
    api.get("states").then((response) => {

      if (response && response.states && response.states.length) {
        setStates(response.states);
      } else {
        setStates([]);
      }
      
    }).catch((error) => {
      console.error("Error al obtener los States:", error);
      setStates([]);
    });

    // Fetch municipalities
    api.get("municipality").then((response) => {
      console.log("municipalities:", response)
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

  const addDriver = (add) => {
    const options = { body: add };

    api.post("drivercreate", options).then((response) => {
      if (!response.error) setDrivers([...drivers, response]); 
      // Refrescar la página
      window.location.reload();
    });
  };

  const updateDriver = (add) => {
    const options = { body: { ...add, updated_at: new Date().toISOString() } };
  
    api.put("driverUpdate", options, add.id_driver).then((response) => {
      if (!response.error) {
        const newDrivers = drivers.map(el => el.id === add.id ? response : el);
        setDrivers(newDrivers);
        setUpdateData(null);
        // Refrescar la página
        window.location.reload();
      }
    });
  };
  
  const deleteDriver = (id) => {
    setDriverToDelete(id); // Guarda el id del cliente a eliminar
    setModalVisible2(true); // Muestra el modal
  };

  const confirmDelete = () => {
    if (driverToDelete) {
      api.delet("driverDelete", driverToDelete).then((response) => {
        if (!response.error) {
          const newDrivers = drivers.filter(el => el.id !== String(driverToDelete));
          setDrivers(newDrivers);
        }
      });
    }
    setModalVisible2(false); // Cierra el modal
    setDriverToDelete(null); // Resetea el cliente a eliminar
    // // Refrescar la página
    window.location.reload();
  };

  const cancelDelete = () => {
    setModalVisible2(false); // Cierra el modal sin hacer nada
    setDriverToDelete(null); // Resetea el cliente a eliminar
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
      addDriver(formData);
      resetForm();
    }
    setModalVisible(false);
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
    setModalVisible(false);
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
    });
    setUpdateData(null);
    setFilteredMunicipalities([]);
  };

  const municipalityMap = municipalities.reduce((acc, municipality) => {
    acc[municipality.id_municipality] = municipality.name;
    return acc;
  }, {});

  const filteredDrivers = drivers.filter(driver => {
    if(driver.name_driver && driver.lastname_driver && driver.id_driver){
      return (
      driver.name_driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.lastname_driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.id_driver.includes(searchTerm)
    );
    }
  });

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="text-white bg-primary">
            <h2>Lista de Choferes</h2> 
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
                    placeholder = "Buscar por cédula o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '300px', marginLeft:"10px",marginRight:"600px"}} // Ajusta el ancho según sea necesario
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
                    <CTableHeaderCell>Licencia</CTableHeaderCell>
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
                    filteredDrivers.map((driver) => (
                      <CTableRow key={driver.id_driver}>
                        <CTableDataCell>{driver.id_driver}</CTableDataCell>
                        <CTableDataCell>{driver.name_driver}</CTableDataCell>
                        <CTableDataCell>{driver.lastname_driver}</CTableDataCell>
                        <CTableDataCell>{driver.phone}</CTableDataCell>
                        <CTableDataCell>{municipalityMap[driver.fkid_municipality] || 'N/A'}</CTableDataCell>
                        <CTableDataCell>{driver.license}</CTableDataCell>
                        <CTableDataCell>{driver.status_driver}</CTableDataCell>
                        <CTableDataCell>{new Date(driver.created_at).toLocaleDateString()}</CTableDataCell>
                        <CTableDataCell style={{display:"flex",justifyContent:"flex-end"}}>
                          <CButton className="update" onClick={() => {setUpdateData(driver); setModalVisible(true);}}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton className="delete" onClick={() => {deleteDriver(driver.id_driver); setModalVisible2(true);}}>
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
        <div className="modal-dialog modal-dialog modal-dialog-centered">
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
              <button type="button" className="btn btn-danger" id="ConfirmDelete" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal modal-lg ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none', margin: '0 auto' }} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header text-white bg-primary">
                    <h3 className="modal-title">{updateData ? "Actualizar Chofer" : "Registrar Nuevo Chofer"}</h3>
                    <button type="button" className="btn-close" onClick={handleCancel} aria-label="Close"></button>
                  </div>
                  <div className ="modal-body">
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
                          {municipalities.map(municipality => (
                            <option key={municipality.id_municipality} value={municipality.id_municipality}>{municipality.name}</option>
                          ))}
                        </CFormSelect>
                      </CCol>
                      <CCol>
                        <CFormSelect
                          id="license"
                          name="license"
                          label="Licencia"
                          onChange={handleChange}
                          value={formData.license}
                          required
                        >
                          <option value="">Seleccione una licencia...</option>
                          <option value="4ta">4ta</option>
                          <option value="5ta">5ta</option>
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
                  </div>
                </div>
              </div>
            </div>
    </CContainer>
  );
};

export default ADrivers;