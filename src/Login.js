import React, { useState } from 'react';
import { login } from './api';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

const MicrosoftClientId = process.env.REACT_APP_ENV_ClIENT_ID;
const MicrosoftTenantId = process.env.REACT_APP_ENV_TENANT_ID;
const MicrosoftCallbackURL = process.env.REACT_APP_ENV_CALLBACK_URL;

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      window.location.reload();
      setToken(token);
    } catch (error) {
      setError('Incorrect email or password');
    }
  };

  const MicrosoftLogin = () => {
    window.location.href = `https://login.microsoftonline.com/${MicrosoftTenantId}/oauth2/v2.0/authorize?client_id=${MicrosoftClientId}&redirect_uri=${MicrosoftCallbackURL}&scope=User.Read+openid&response_type=code&state=pdCBLpj6YU6n`;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  if (localStorage.getItem('token')) {
    return (
      <div>
        <p>You are already logged in!</p>
        <Button onClick={handleLogout} variant="primary">Logout</Button>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
        <Button variant="primary" type="submit" onClick={MicrosoftLogin}>Microsoft</Button>
      </Form>
    </div>
  );
};

export default Login;
