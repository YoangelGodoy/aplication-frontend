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

const PaymentsDriver = () => {
  const api = helpFetch();
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    driver_id: '',
    payment_date: '',
    amount: '',
    description: '',
  });
  const [updateData, setUpdateData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Obtener los pagos
    api.get("driverPayments").then((response) => {
      console.log("Pagos:", response);
      if (response && response.payments && response.payments.length) {
        setPayments(response.payments);
      } else {
        setPayments([]);
      }
    }).catch((error) => {
      console.error("Error al obtener los pagos:", error);
      setPayments([]);
    });
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
  }, []);

  const addPayment = (data) => {
    const options = { body: data };
    api.post("driverPaymentCreate", options).then((response) => {
      if (!response.error) {
        setPayments([...payments, response.payment]);
        resetForm();
      }
    });
  };

  const updatePayment = (data) => {
    const options = { body: data };
    api.put("driverPaymentUpdate", options, data.id).then((response) => {
      if (!response.error) {
        const updatedPayments = payments.map(payment => payment.id === data.id ? response.payment : payment);
        setPayments(updatedPayments);
        resetForm();
      }
    });
  };

  const deletePayment = (id) => {
    setPaymentToDelete(id);
    setModalVisible2(true);
  };

  const confirmDelete = () => {
    if (paymentToDelete) {
      api.delet("driverPaymentDelete",paymentToDelete).then((response) => {
        if (!response.error) {
          const newPayments = payments.filter(payment => payment.id !== paymentToDelete);
          setPayments(newPayments);
        }
      });
    }
    setModalVisible2(false);
    setPaymentToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateData) {
      updatePayment({ ...formData, id: updateData.id });
    } else {
      addPayment(formData);
    }
    setModalVisible(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      driver_id: '',
      payment_date: '',
      amount: '',
      description: '',
    });
    setUpdateData(null);
  };

  const filteredPayments = payments.filter(payment => {
    return (
      payment.driver_id.includes(searchTerm) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="text-white bg-primary">
              <h2>Registro de Pagos</h2>
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className='mb-4'>
            <CCardHeader style={{ display: "flex", alignItems: "center" }}>
              <CIcon icon={cilSearch} />
              <CFormInput
                type="text"
                placeholder="Buscar por cédula o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px', marginLeft: "10px", marginRight: "600px" }}
              />
              <CButton color="success" onClick={() => setModalVisible(true)}>
                <CIcon icon={cilUserPlus} />
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Cédula del Chofer</CTableHeaderCell>
                    <CTableHeaderCell>Fecha de Pago</CTableHeaderCell>
                    <CTableHeaderCell>Monto</CTableHeaderCell>
                    <CTableHeaderCell>Descripción</CTableHeaderCell>
                    <CTableHeaderCell style={{display: "flex", justifyContent: "flex-end"}}>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredPayments.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="5">No hay datos</CTableDataCell>
                    </CTableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <CTableRow key={payment.id}>
                        <CTableDataCell>{payment.driver_id}</CTableDataCell>
                        <CTableDataCell>{new Date(payment.payment_date).toLocaleDateString()}</CTableDataCell>
                        <CTableDataCell>${payment.amount}</CTableDataCell>
                        <CTableDataCell>{payment.description}</CTableDataCell>
                        <CTableDataCell style={{ display: "flex", justifyContent: "flex-end" }}>
                          <CButton className="update" onClick={() => { setUpdateData(payment); setFormData(payment); setModalVisible(true); }}>
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton className="delete" onClick={() => deletePayment(payment.id)}>
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

      {/* Modal para Agregar/Actualizar Pago */}
      <div className={`modal ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-white bg-primary">
              <h3 className="modal-title">{updateData ? "Actualizar Pago" : "Registrar Nuevo Pago"}</h3>
              <button type="button" className="btn-close" onClick={() => setModalVisible(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <CForm onSubmit={handleSubmit}>
                <CRow className='mt-3'>
                  <CCol md={6}>
                    <CFormSelect
                      id="driver_id"
                      name="driver_id"
                      label="Chofer"
                      onChange={handleChange}
                      value={formData.driver_id}
                      required
                    >
                      <option value="">Seleccione un Chofer...</option>
                      {drivers.map(driver => (
                        <option key={driver.driver_id} value={driver.driver_id}>{driver.name_driver}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="date"
                      id="payment_date"
                      name="payment_date"
                      label="Fecha de Pago"
                      onChange={handleChange}
                      value={formData.payment_date}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CFormInput
                      type="number"
                      id="amount"
                      name="amount"
                      label="Monto"
                      placeholder="Ingrese el monto"
                      onChange={handleChange}
                      value={formData.amount}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="description"
                      name="description"
                      label="Descripción"
                      placeholder="Ingrese la descripción"
                      onChange={handleChange}
                      value={formData.description}
                      required
                    />
                  </CCol>
                </CRow>
                <CButton type="submit" color="primary" className="mt-3">
                  {updateData ? "Actualizar" : "Registrar"}
                </CButton>
                <CButton type="button" color="secondary" className="mt-3 ms-2" onClick={() => setModalVisible(false)}>
                  Cancelar
                </CButton>
              </CForm>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Confirmar Eliminación */}
      <div className={`modal ${modalVisible2 ? 'show' : ''}`} style={{ display: modalVisible2 ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button type="button" className="btn-close" onClick={() => setModalVisible2(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar este registro?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setModalVisible2(false)}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default PaymentsDriver;