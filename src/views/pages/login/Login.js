import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import '../../../scss/_custom.scss';
import { helpFetch } from '../../../components/helpers/helpFetch';

const api = helpFetch();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const options = {
        body: { email, password },
      };
      console.log("Sending login request with data:", options.body); // Agregar depuración
      const response = await api.post("login", options);
      console.log("Response from server:", response); // Agregar depuración para ver la respuesta completa

      if (response && response.token) {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token); // Almacenar el token en el localStorage
        localStorage.setItem('user', JSON.stringify(response));
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="login-background d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <InputGroup
                      icon={cilUser}
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputGroup
                      icon={cilLockLocked}
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' id="login" color="primary" className="px-4" style={{ backgroundColor: '#003c7c', border: 'none' }} >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white" style={{ backgroundColor: '#003c7c', width: '44%', border: 'none' }}>
                <CCardBody className="text-center">
                  <div>
            
                    
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

const InputGroup = ({ icon, placeholder, value, onChange, type = 'text' }) => (
  <CInputGroup className="mb-3">
    <CInputGroupText>
      <CIcon icon={icon} />
    </CInputGroupText>
    <CFormInput
      type={type}
      placeholder={placeholder}
      autoComplete={type === 'password' ? 'current-password' : 'username'}
      value={value}
      onChange={onChange}
    />
  </CInputGroup>
);

export default Login;