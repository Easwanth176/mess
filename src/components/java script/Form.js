import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/form.css';

export default function Form() {
  const [newRegistrationNumber, setNewRegistrationNumber] = useState('');
  const [personName, setPersonName] = useState('');
  const [hostel, setHostel] = useState('');
  const [Mess, setMess] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitUserRegistration = () => {
    setIsSubmitting(true);
    setError('');

    try {
      if (!newRegistrationNumber || !personName || !hostel) {
        setError('Please fill in all fields.');
      } else {
        // Redirect to the home page with user input values as URL parameters
        navigate(`/home/${newRegistrationNumber}/${personName}/${Mess}/${hostel}`);
      }
    } catch (error) {
      console.error('Error submitting user registration:', error);
      setError('An error occurred while submitting the user registration form.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className="form1">
        <h1>Mess Pass</h1>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={(e) => { e.preventDefault(); submitUserRegistration(); }} className="my-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label>Registration Number:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newRegistrationNumber}
                  onChange={(e) => setNewRegistrationNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Name of the Person:</label>
                <input
                  type="text"
                  className="form-control"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Select Hostel:</label>
                <select
                  className="form-control"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="Boys Hostel 1">Boys Hostel 1</option>
                  <option value="Boys Hostel 2">Boys Hostel 2</option>
                  <option value="Boys Hostel 3">Boys Hostel 3</option>
                  <option value="Boys Hostel 4">Boys Hostel 4</option>
                  <option value="Boys Hostel 5">Boys Hostel 5</option>
                  <option value="Boys Hostel 6">Boys Hostel 6</option>
                </select>
              </div>
              <div className="form-group">
                <label>Select Mess:</label>
                <select
                  className="form-control"
                  value={Mess}
                  onChange={(e) => setMess(e.target.value)}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                {isSubmitting ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
