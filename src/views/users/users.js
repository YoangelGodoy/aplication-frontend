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
  CTableDataCell
} from '@coreui/react';
import { CIcon } from '@coreui/icons-react'; 
import { cilPencil, cilTrash } from '@coreui/icons'; 

const AUsers = () => {
  const api = helpFetch();
  const [updateData, setUpdateData] = useState(null);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [userToDelete, setUsersToDelete] = useState(null); 

  useEffect(() => {
    api.get("users").then((response) => {
      if (!response.error) setUsers(response);
    });
  }, []);

  const addUser  = (user) => {
    const options = { body: user };

    api.post("users", options).then((response) => {
      if (!response.error) setUsers([...users, response]);
    });
  };

  const updateUser  = (user) => {
    const options = { body: { ...user, updated_at: new Date().toISOString() } };

    api.put("users", options, user.id).then((response) => {
      if (!response.error) {
        const newUsers = users.map(el => el.id === user.id ? response : el);
        setUsers(newUsers);
        setUpdateData(null);
      }
    });
  };

  const deleteUser = (id) => {
    setUsersToDelete(id); // Guarda el id del cliente a eliminar
    setModalVisible(true); // Muestra el modal
  };

  const confirmDelete = () => {
    if (userToDelete) {
      api.delet("users", userToDelete).then((response) => {
        if (!response.error) {
          const newUsers = users.filter(el => el.id !== String(userToDelete));
          setUsers(newUsers);
        }
      });
    }
    setModalVisible(false); // Cierra el modal
    setUsersToDelete(null); // Resetea el cliente a eliminar
  };

  const cancelDelete = () => {
    setModalVisible(false); // Cierra el modal sin hacer nada
    setUsersToDelete(null); // Resetea el cliente a eliminar
  };

  const [formData, setFormData] = useState({
    id: '',
    idCard: '',
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (updateData != null) {
      setFormData(updateData);
    } else {
      resetForm();
    }
  }, [updateData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateData != null) {
      updateUser (formData);
    } else {
      formData.id = Date.now().toString();
      addUser (formData);
      resetForm();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: '',
      idCard: '',
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
    });
    setUpdateData(null);
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard className='mb-4'>
            <CCardHeader>
              <h2>{updateData ? "Actualizar Usuario" : "Registrar Nuevo Usuario"}</h2>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="idCard"
                      name="idCard"
                      label="Cédula"
                      placeholder="Ingrese la cédula del usuario"
                      onChange={handleChange}
                      value={formData.idCard}
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
                      id="lastName"
                      name="lastName"
                      label="Apellido"
                      placeholder="Ingrese el apellido"
                      onChange={handleChange}
                      value={formData.lastName}
                      required
                    />
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
                    <CFormInput
                      type="email"
                      id="email"
                      name="email"
                      label="Correo Electrónico"
                      placeholder="Ingrese el correo electrónico"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="password"
                      id="password"
                      name="password"
                      label="Contraseña"
                      placeholder="Ingrese la contraseña"
                      onChange={handleChange}
                      value={formData.password}
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
              <h2>Lista de Usuarios</h2>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Cédula</CTableHeaderCell>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Apellido</CTableHeaderCell>
                    <CTableHeaderCell>Teléfono</CTableHeaderCell>
                    <CTableHeaderCell>Correo Electrónico</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="7">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    users.map((user) => (
                      <CTableRow key={user.id}>
                        <CTableDataCell>{user.idCard}</CTableDataCell>
                        <CTableDataCell>{user.name}</CTableDataCell>
                        <CTableDataCell>{user.lastName}</CTableDataCell>
                        <CTableDataCell>{user.phone}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>
                          <CButton className="update" onClick={() => setUpdateData(user)}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton className="delete" onClick={() => deleteUser (user.id)}>
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

export default AUsers;