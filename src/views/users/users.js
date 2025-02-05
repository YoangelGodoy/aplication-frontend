import React, { useEffect, useState } from 'react';
import { helpFetch } from '/src/components/helpers/helpFetch';
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
import { cilPencil, cilTrash, cilUserPlus, cilSearch } from '@coreui/icons'; 

const AUsers = () => {
  const api = helpFetch();
  const [updateData, setUpdateData] = useState(null);
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [modalVisible2, setModalVisible2] = useState(false); // Estado para el modal de eliminación
  const [userToDelete, setUsersToDelete] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    // Fetch users
    api.get("users").then((response) => {
      if (response && response.users && response.users.length) {
        setUsers(response.users);
      } else {
        setUsers([]);
      }
      
    }).catch((error) => {
      console.error("Error al obtener los users:", error);
      setUsers([]);
    });
  }, []);

  const addUser  = (user) => {
    const options = { body: user };
  
    api.post("register", options).then((response) => {
      if (!response.error) {
        setUsers([...users, response]);
        window.location.reload()
      } else {
        console.error("Error en la respuesta del servidor:", response.error);
      }
    }).catch((error) => {
      console.error("Error al agregar usuario:", error);
    });
  };

  const updateUser  = (user) => {
    const options = { body: { ...user, updated_at: new Date().toISOString() } };

    // Eliminar campos de contraseña y preguntas de seguridad si están vacíos
    if (!user.password) delete options.body.password;
    if (!user.question1) delete options.body.question1;
    if (!user.answer1) delete options.body.answer1;
    if (!user.question2) delete options.body.question2;
    if (!user.answer2) delete options.body.answer2;

    api.put("userUpdate", options, user.id).then((response) => {
      if (!response.error) {
        const newUsers = users.map(el => el.id === user.id ? response : el);
        setUsers(newUsers);
        setUpdateData(null);
        window.location.reload()
      }
    });
  };

  const deleteUser  = (id) => {
    setUsersToDelete(id); // Guarda el id del cliente a eliminar
    setModalVisible2(true); // Muestra el modal de eliminación
  };

  const confirmDelete = () => {
    if (userToDelete) {
      api.delet("delete", userToDelete).then((response) => {
        if (!response.error) {
          const newUsers = users.filter(el => el.id !== String(userToDelete));
          setUsers(newUsers);
          window.location.reload()
        }
      });
    }
    setModalVisible2(false); // Cierra el modal de eliminación
    setUsersToDelete(null); // Resetea el cliente a eliminar
  };

  const cancelDelete = () => {
    setModalVisible2(false); // Cierra el modal de eliminación sin hacer nada
    setUsersToDelete(null); // Resetea el cliente a eliminar
  };

  const [formData, setFormData] = useState({
    id_user: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    rol_id: '',
    phone: '',
    created_at: '',
    updated_at: ''
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
    // Validar que el correo electrónico no esté duplicado
    const emailExists = users.some(user => user.email === formData.email && user.id !== formData.id);
    if (emailExists) {
      alert('El correo electrónico ya está registrado.');
      return;
    }
    if (updateData != null) {
      updateUser (formData);
    } else {
      formData.id = Date.now().toString();
      addUser (formData);
      resetForm();
    }
    setModalVisible(false); // Cierra el modal después de agregar o actualizar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Validar que solo se permitan 11 números
      const phoneRegex = /^[0-9]{0,11}$/;
      if (phoneRegex.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCancel = () => {
    resetForm();
    setModalVisible(false); // Cierra el modal al cancelar
  };

  const resetForm = () => {
    setFormData({
      id_user: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      question1: '',
      answer1: '',
      question2: '',
      answer2: '',
      rol_id: '',
      phone: '',
      created_at: '',
      updated_at: ''
    });
    setUpdateData(null);
  };

  // Filtrar usuarios por cédula y nombre
  const filteredUsers = users.filter(user => {
    if(user.name && user.lastname && user.id_user){return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id_user.includes(searchTerm)
    );}
  });

  return (
    <CContainer>
      <CCard>
        <CCardHeader className='bg-primary text-white'>
          <h2>Lista de Usuarios</h2>
        </CCardHeader>
      </CCard>
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
                    <CTableHeaderCell>Correo Electrónico</CTableHeaderCell>
                    <CTableHeaderCell>Rol</CTableHeaderCell>
                    <CTableHeaderCell>Teléfono</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredUsers.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="7">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <CTableRow key={user.id}>
                        <CTableDataCell>{user.id_user}</CTableDataCell>
                        <CTableDataCell>{user.name}</CTableDataCell>
                        <CTableDataCell>{user.lastname}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>{user.rol_id}</CTableDataCell>
                        <CTableDataCell>{user.phone}</CTableDataCell>
                        <CTableDataCell style={{display:"flex",justifyContent:"flex-end"}}>
                            <CButton className="update" onClick={() => { setUpdateData(user); setModalVisible(true); }}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton className="delete" onClick={() => deleteUser(user.id)}>
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
      <div className={`modal modal-lg ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none', margin: '0 auto' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-white bg-primary">
              <h3 className="modal-title">{updateData ? "Actualizar Usuario" : "Registrar Nuevo Usuario"}</h3>
              <button type="button" className="btn-close" onClick={handleCancel} aria-label="Close"></button>
            </div>
            <div className ="modal-body">
              <CForm onSubmit={handleSubmit}>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="id_user"
                      name="id_user"
                      label="Cédula"
                      placeholder="Ingrese la cédula del usuario"
                      onChange={handleChange}
                      value={formData.id_user}
                      required
                      autoComplete="id_user" 
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
                      autoComplete="name"
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
                      autoComplete="lastname" 
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
                      autoComplete="phone"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3 mb-3">
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
                      autoComplete="email"
                    />
                  </CCol>
                  {!updateData && (
                    <>
                      <CCol md={6}>
                        <CFormInput
                          type="password"
                          id="password"
                          name="password"
                          label="Contraseña"
                          placeholder="Ingrese la contraseña" 
                          onChange={handleChange}
                          value={formData.password}
                          autoComplete="current-password"
                        />
                      </CCol>
                      <CRow className="mt-3 mb-3">
                        <CCol md={6}>
                          <CFormInput
                            type="text"
                            id="question1"
                            name="question1"
                            label="Pregunta de Seguridad 1"
                            placeholder="Ingrese la pregunta de seguridad 1"
                            onChange={handleChange}
                            value={formData.question1}
                            autoComplete="question1"
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormInput
                            type="text"
                            id="answer1"
                            name="answer1"
                            label="Respuesta 1"
                            placeholder="Ingrese la respuesta 1"
                            onChange={handleChange}
                            value={formData.answer1}
                            autoComplete="answer1"
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mt-3 mb-3">
                        <CCol md={6}>
                          <CFormInput
                            type="text"
                            id="question2"
                            name="question2"
                            label="Pregunta de Seguridad 2"
                            placeholder="Ingrese la pregunta de seguridad 2"
                            onChange={handleChange}
                            value={formData.question2}
                            autoComplete="question2"
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormInput
                            type="text"
                            id="answer2"
                            name="answer2"
                            label="Respuesta 2"
                            placeholder="Ingrese la respuesta 2"
                            onChange={handleChange}
                            value={formData.answer2}
                            autoComplete="answer2"
                          />
                        </CCol>
                      </CRow>
                    </>
                  )}
                </CRow>
                <CRow className="mt-3 mb-3">
                  <CCol md={6}>
                    <CFormSelect
                      id="rol_id"
                      name="rol_id"
                      label="Rol"
                      onChange={handleChange}
                      value={formData.rol_id}
                      required
                    >
                      <option value="">Seleccione un rol...</option>
                      <option value="6">Administrador</option>
                      <option value="7">Assitente</option>
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

export default AUsers;