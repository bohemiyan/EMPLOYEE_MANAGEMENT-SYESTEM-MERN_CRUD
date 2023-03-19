import React, { useState,useEffect } from 'react';
import { update,getToken,HrName,HrEmail } from '../../services/HrService';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../errormessage/ErrorMessage';
import './hrupdate.css';

function HrUpdate() {
  const navigate = useNavigate();
  const [name, setName] = useState(HrName());
  const [password, setPassword] = useState('');
  const [newpassword, setnewpassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState('');

  const token=getToken();
  const email=HrEmail();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setnewpassword(e.target.value);
  };
  const handleRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value);
  };
  useEffect(() => {
    if(newpassword!==retypePassword)
    setError('Mismatched Password')
    else 
    setError(null)
  }, [retypePassword,newpassword])

  const handleUpdate = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      await update(token,name,password,newpassword);
      setisLoading(false);
      navigate('/home');
    } catch (error) {
      setError(error.message);
      setisLoading(false);
    }
  };

  return (
    <div className="hr-update-container">
      <form className="hr-update-form" onSubmit={handleUpdate}>
        <h2 className="hr-update-heading">{email}</h2>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Current Password:</label>
          <input
            type="Password"
            id="current-password"
            placeholder="Enter your current Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="new-password"
            placeholder="Enter your New password"
            value={newpassword}
            onChange={handleNewPasswordChange}
          
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Retype Password:</label>
          <input
            type="password"
            id="retype-password"
            placeholder="Retype password"
            value={retypePassword}
            onChange={handleRetypePasswordChange}
            required
          />
        </div>
        <div className="buttons">
        {error && <ErrorMessage message={error} />}
          <button type="submit" className="hr-Submit" disabled={error==='Mismatched Password' ? true : false}>
            {isLoading?'Loading..': 'Update'}
          </button>
          <button type="cancel" className="hr-Cancel" onClick={(e)=>{navigate('/home')}}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default HrUpdate