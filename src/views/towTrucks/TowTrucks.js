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
import { cilPencil, cilTrash } from '@coreui/icons'; 
import { helpFetch } from '/src/components/helpers/helpFetch'; 

const GTowTrucks = () => {
  const api = helpFetch();
  const [towTrucks, setTowTrucks] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [TowToDelete, setTowTrucksToDelete] = useState(null); 

  
  useEffect(() => {
    const fetchTowTrucks = async () => {
      const response = await api.get("tow_truck");
      if (!response.error) setTowTrucks(response);
    };

    fetchTowTrucks();
  }, []);

  const [formData, setFormData] = useState({
    tuition: '',
    model: '',
    type_towtruck: '',
    status: '',
    id: null,
    created_at: '', 
    updated_at: '' 
  });

  useEffect(() => {
    if (updateData != null) {
      setFormData(updateData);
    } else {
      setFormData({
        tuition: '',
        model: '',
        type_towtruck: '',
        status: '',
        id: null,
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
      formData.id = Date.now().toString(); 
      await addTowTruck(formData);
    }
    setFormData({
      tuition: '',
      model: '',
      type_towtruck: '',
      status: '',
      id: null,
      created_at: '',
      updated_at: ''
    });
  };

  const addTowTruck = async (add) => {
    const options = { body: add };
    const response = await api.post("tow_truck", options);
    if (!response.error) {
      setTowTrucks([...towTrucks, response]); 
    }
  };

  const updateTowTruck = async (update) => {
    const options = { body: update };
    const response = await api.put("tow_truck", options, update.id); 
    if (!response.error) {
      const newTowTrucks = towTrucks.map(el => el.id === update.id ? response : el);
      setTowTrucks(newTowTrucks);
      setUpdateData(null);
    }
  };

  const deleteTowTruck = (id) => {
    setTowTrucksToDelete(id); // Guarda el id del cliente a eliminar
    setModalVisible(true); // Muestra el modal
  };

  const confirmDelete = () => {
    if (TowToDelete) {
      api.delet("tow_truck", TowToDelete).then((response) => {
        if (!response.error) {
          const newTowTrucks = towTrucks.filter(el => el.id !== String(TowToDelete));
          setTowTrucks(newTowTrucks);
        }
      });
    }
    setModalVisible(false); // Cierra el modal
    setTowTrucksToDelete(null); // Resetea el cliente a eliminar
  };

  const cancelDelete = () => {
    setModalVisible(false); // Cierra el modal sin hacer nada
    setTowTrucksToDelete(null); // Resetea el cliente a eliminar
  };

  const handleCancel = () => {
    resetForm();
  };
  const resetForm = () => {
    setFormData({
      tuition: '',
      model: '',
      type_towtruck: '',
      status: '',
      id: null,
      created_at: '',
      updated_at: ''
    });
    setUpdateData(null);
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
   };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <h2>{updateData ? "Actualizar Grúa" : "Registrar Nuevo Grúa"}</h2>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormInput
                      type='text'
                      id="tuition"
                      name="tuition"
                      label="Matrícula"
                      placeholder="Ingrese la Matrícula"
                      onChange={handleChange}
                      value={formData.tuition}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="model"
                      name="model"
                      label="Modelo"
                      placeholder="Ingrese el Modelo"
                      onChange={handleChange}
                      value={formData.model}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CFormSelect id="type_towtruck" name="type_towtruck" label="Tipo de Grúa" onChange={handleChange} value={formData.type_towtruck} required>
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
                    <CTableHeaderCell>Matrícula</CTableHeaderCell>
                    <CTableHeaderCell>Modelo</CTableHeaderCell>
                    <CTableHeaderCell>Estatus</CTableHeaderCell>
                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                    <CTableHeaderCell>Fecha de Creación</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {towTrucks.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="7">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    towTrucks.map((towtruck) => (
                      <CTableRow key={towtruck.id}>
                        <CTableDataCell>{towtruck.tuition}</CTableDataCell>
                        <CTableDataCell>{towtruck.model}</CTableDataCell>
                        <CTableDataCell>{towtruck.status}</CTableDataCell>
                        <CTableDataCell>{towtruck.type_towtruck}</CTableDataCell>
                        <CTableDataCell>{new Date(towtruck.created_at).toLocaleDateString()}</CTableDataCell>
                        <CTableDataCell>
                          <CButton className="update" onClick={() => setUpdateData(towtruck)}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton className="delete" onClick={() => deleteTowTruck(towtruck.id)}>
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
        </ CCol>
      </CRow>
      <div className={`modal ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none' }} tabIndex="-1">
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
    </CContainer>
  );
};

export default GTowTrucks;