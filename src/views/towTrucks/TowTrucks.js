import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react'; 
import { cilPencil, cilPlus, cilSearch, cilTrash } from '@coreui/icons'; 
import { helpFetch } from '/src/components/helpers/helpFetch';

const GTowTrucks = () => {
  const api = helpFetch();
  const [towTrucks, setTowTrucks] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [TowToDelete, setTowTrucksToDelete] = useState(null); 
  const [modalVisible2, setModalVisible2] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [models, setModels] = useState([]); 

  useEffect(() => {
    const fetchTowTrucks = async () => {
      const response = await api.get("Towtrucks");
      if (!response.error) setTowTrucks(response.trucks);
    };

    fetchTowTrucks();

    // Fetch Models
    api.get("models").then((response) => {
      console.log("models:", response)
      if (response && response.trucks && response.trucks.length) {
        setModels(response.trucks);
      } else {
        setModels([]);
      }
      
    }).catch((error) => {
      console.error("Error al obtener los Models:", error);
      setModels([]);
    });
  }, []);

  const [formData, setFormData] = useState({
    id: '',
    model_id: '',
    status: '',
    type: '',
    created_at: '', 
    updated_at: '' 
  });

  useEffect(() => {
    if (updateData != null) {
      setFormData(updateData);
    } else {
      setFormData({
        id: '',
        model_id: '',
        status: '',
        type: '',
        created_at: '',
        updated_at: ''
      });
    }
  }, [updateData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    if (updateData != null) {
      formData.updated_at = currentDate; 
      await updateTowTruck(formData);
    } else {
      formData.created_at = currentDate; 
      formData.updated_at = currentDate; 
      await addTowTruck(formData);
    }
    resetForm();
    setModalVisible(false);
  };

  const addTowTruck = async (add) => {
    const options = { body: add };
    const response = await api.post("towTruckCreate", options);
    if (!response.error) {
      setTowTrucks([...towTrucks, response.truck ]); 
      window.location.reload();
    }
  };

  const updateTowTruck = async (update) => {
    const options = { body: update };
    const response = await api.put("towTruckUpdate", options, update.id); 
    if (!response.error) {
      const newTowTrucks = towTrucks.map(el => el.id === update.id ? response.truck : el);
      setTowTrucks(newTowTrucks);
      setUpdateData(null);
      window.location.reload();
    }
  };

  const deleteTowTruck = (id) => {
    setTowTrucksToDelete(id);
    setModalVisible2(true);
  };

  const confirmDelete = () => {
    if (TowToDelete) {
      api.delet("towTruckDelete", TowToDelete).then((response) => {
        if (!response.error) {
          const newTowTrucks = towTrucks.filter(el => el.id !== String(TowToDelete));
          setTowTrucks(newTowTrucks);
        }
      });
    }
    setModalVisible2(false);
    setTowTrucksToDelete(null);
    window.location.reload();
  };

  const cancelDelete = () => {
    setModalVisible2(false);
    setTowTrucksToDelete(null);
  };

  const handleCancel = () => {
    resetForm();
    setModalVisible(false);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      model_id: '',
      status: '',
      type: '',
      created_at: '',
      updated_at: ''
    });
    setUpdateData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const modelMap = models.reduce((acc, model) => {
    acc[model.id_model] = model.name_model;
    return acc;
  }, {});

  const filteredTowTrucks = towTrucks.filter(tow => {
    if (tow && tow.type) {
      return (
        String(tow.model_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        tow.type.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h2>Lista de Grúas</h2>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader style={{ display: "flex", alignItems: "center" }}>
              <CIcon icon={cilSearch} />
              <CFormInput
                type="text"
                placeholder="Buscar por ID, modelo o tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '350px', marginLeft: "10px", marginRight: "550px" }}
              />
              <CButton color="success" onClick={() => setModalVisible(true)}>
                <CIcon icon={cilPlus} />
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Modelo</CTableHeaderCell>
                    <CTableHeaderCell>Estatus</CTableHeaderCell>
                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                    <CTableHeaderCell>Fecha de Creación</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredTowTrucks.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="6">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    filteredTowTrucks.map((towtruck) => (
                      <CTableRow key={towtruck.id}>
                        <CTableDataCell>{towtruck.id}</CTableDataCell>
                        <CTableDataCell>{modelMap[towtruck.model_id] || 'N/A'}</CTableDataCell>
                        <CTableDataCell>{towtruck.status}</CTableDataCell>
                        <CTableDataCell>{towtruck.type}</CTableDataCell>
                        <CTableDataCell>{new Date(towtruck.created_at).toLocaleDateString()}</CTableDataCell>
                        <CTableDataCell style={{ height:"60px",display: "flex", justifyContent: "flex-end" }}>
                          <CButton className="update" onClick={() => { setUpdateData(towtruck); setModalVisible(true) }}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton className="delete" onClick={() => { deleteTowTruck(towtruck.id); setModalVisible2(true) }}>
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
              <button type="button" className="btn btn-danger" id="ConfirmDelete" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal modal-lg ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none', margin: '0 auto' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-white bg-primary">
              <h3 className="modal-title">{updateData ? "Actualizar Grúa" : "Registrar Nueva Grúa"}</h3>
              <button type="button" className="btn-close" onClick={handleCancel} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <CForm onSubmit={handleSubmit}>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormInput
                      type='text'
                      id="id"
                      name="id"
                      label="ID"
                      placeholder="Ingrese el ID"
                      onChange={handleChange}
                      value={formData.id}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                     <CFormSelect
                        id="model_id"
                        name="model_id"
                        label="Modelo"
                        onChange={handleChange}
                        value={formData.model_id}
                        required
                      >
                        <option value="">Seleccione un modelo...</option>
                        {models.map(model => (
                          <option key={model.id_model} value={model.id_model}>{model.name_model}</option>
                        ))}
                      </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mt-3 mb-3">
                  <CCol md={6}>
                    <CFormSelect id="type" name="type" label="Tipo de Grúa" onChange={handleChange} value={formData.type} required>
                      <option value="">Seleccione...</option>
                      <option value="gancho">Gancho</option>
                      <option value="plataforma">Plataforma</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormSelect id="status" name="status" label="Status" onChange={handleChange} value={formData.status} required>
                      <option value="">Seleccione...</option>
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

export default GTowTrucks;