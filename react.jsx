import React, { useState, useEffect } from 'react';
import './style.css'; 
function ClashOfBangApp() {
 
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);
  
  const [members, setMembers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    favTroop: '',
    reason: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
      isValid = false;
    }

    const emailVal = formData.email.trim();
    if (!emailVal) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else {
      const atIndex = emailVal.indexOf("@");
      const dotIndex = emailVal.lastIndexOf(".");
      if (atIndex < 1 || dotIndex <= atIndex + 1 || dotIndex === emailVal.length - 1) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender.";
      isValid = false;
    }

    const ageVal = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = "Age is required.";
      isValid = false;
    } else if (isNaN(ageVal) || ageVal < 12 || ageVal > 100) {
      newErrors.age = "Age must be between 12 and 100.";
      isValid = false;
    }

    if (!formData.favTroop.trim()) {
      newErrors.troop = "Please enter your favorite troop.";
      isValid = false;
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please specify your reason to join.";
      isValid = false;
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = "Reason must be at least 10 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editIndex !== null) {
      const updatedMembers = [...members];
      updatedMembers[editIndex] = formData;
      setMembers(updatedMembers);
      setEditIndex(null);
      alert("Registration updated successfully!");
    } else {
      setMembers([...members, formData]);
      alert("Registration successful! Welcome to the Clash of BaNG Clan!");
    }

    setFormData({ name: '', email: '', gender: '', age: '', favTroop: '', reason: '' });
    setErrors({});
  };

  const handleDelete = (index) => {
    const filtered = members.filter((_, i) => i !== index);
    setMembers(filtered);
    if (editIndex === index) setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(members[index]);
    setEditIndex(index);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="clash-app-container">
      {/* HEADER */}
      <header>
        <a href="#home" className="logo">Clash of BaNG</a>
        <nav>
          <a href="#home">Home</a>
          <a href="#gallery">Gallery</a>
          <a href="#troops">Troops</a>
          <a href="#about">About</a>
          <a href="#register" className="active">Register</a>
        </nav>
      </header>

      <main className="container">
        <h1 className="section-title">
          {editIndex !== null ? 'Edit Clan Registration' : 'Join The Clan'}
        </h1>

        <div className="form-container">
          <form id="clanRegisterForm" onSubmit={handleSubmit} noValidate>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                className="form-control" 
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="form-control" 
                placeholder="Example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="gender" value="Man" checked={formData.gender === 'Man'} onChange={handleChange} /> Man
                </label>
                <label className="radio-option">
                  <input type="radio" name="gender" value="Woman" checked={formData.gender === 'Woman'} onChange={handleChange} /> Woman
                </label>
                <label className="radio-option">
                  <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
                </label>
              </div>
              {errors.gender && <div className="error-message">{errors.gender}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input 
                type="number" 
                id="age" 
                name="age"
                className="form-control" 
                placeholder="Your Age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <div className="error-message">{errors.age}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="favTroop">Favorite Troop</label>
              <input 
                type="text" 
                id="favTroop" 
                name="favTroop"
                className="form-control" 
                placeholder="e.g. Barbarian"
                value={formData.favTroop}
                onChange={handleChange}
              />
              {errors.troop && <div className="error-message">{errors.troop}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason To Join</label>
              <input 
                type="text" 
                id="reason" 
                name="reason"
                className="form-control" 
                placeholder="Why do you want to join?"
                value={formData.reason}
                onChange={handleChange}
              />
              {errors.reason && <div className="error-message">{errors.reason}</div>}
            </div>

            <button type="submit" className="btn-submit">
              {editIndex !== null ? 'Update Registration' : 'Register'}
            </button>
          </form>
        </div>

        <section className="members-section" style={{ marginTop: '40px' }}>
          <h2>Registered Clan Members ({members.length})</h2>
          {members.length === 0 ? (
            <p>No members registered yet.</p>
          ) : (
            <ul className="members-list" style={{ listStyle: 'none', padding: 0 }}>
              {members.map((member, index) => (
                <li key={index} className="member-card" style={{ background: '#f9f9f9', padding: '15px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                  <div>
                    <strong>{member.name}</strong> ({member.gender}, {member.age} y/o) - <em>{member.email}</em>
                    <p style={{ margin: '5px 0' }}>Favorite Troop: {member.favTroop}</p>
                    <p style={{ margin: '5px 0' }}>Reason: {member.reason}</p>
                  </div>
                  <div className="action-buttons" style={{ marginTop: '10px' }}>
                    <button onClick={() => handleEdit(index)} className="edit-btn" style={{ marginRight: '10px', padding: '5px 10px', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(index)} className="delete-btn" style={{ padding: '5px 10px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-left">Dyah Ayu Puspaningrum</div>
          <div className="footer-right"><span>Jakarta</span><span>Bandung</span><span>Sanur</span></div>
        </div>
      </footer>
    </div>
  );
}

export default ClashOfBangApp;