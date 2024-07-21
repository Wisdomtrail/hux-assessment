import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image3 from '../images/image3.jpeg';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!validateEmail(email)) {
      setMessage('Invalid email format');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log({ data });

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred during registration.');
      }

      localStorage.setItem('token', data.token);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/contacts'), 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    formSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    imageSection: {
      flex: 1,
      backgroundImage: `url(${image3})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
    },
    form: {
      width: '100%',
      maxWidth: '400px',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    button: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#7c4dff',
      color: 'white',
      cursor: 'pointer',
    },
    message: {
      marginTop: '20px',
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
    },
    featureBox: {
      backgroundColor: 'rgba(25, 25, 255, 0.2)',
      padding: '20px',
      borderRadius: '10px',
      margin: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formSection}>
        <h1>Unlock your free access today</h1>
        <p>Create an account</p>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            style={styles.input}
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Work email"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" style={styles.button}>
            Continue
          </button>
        </form>
        {message && <div style={styles.message}>{message}</div>}
        <p>
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
      <div style={styles.imageSection}>
        <div style={styles.featureBox}>
          <h2>Easy to manage</h2>
          <p>Simplify your contact organization</p>
        </div>
        <div style={styles.featureBox}>
          <h2>7+ years experience</h2>
          <p>Trusted by professionals worldwide</p>
        </div>
        <div style={styles.featureBox}>
          <h2>Automated Workflows</h2>
          <p>Streamline your contact management process</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
