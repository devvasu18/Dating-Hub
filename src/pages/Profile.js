import React, { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    bio: "",
    age: "",
    gender: "",
    interests: "",
  });

  const [preview, setPreview] = useState(null);

  // 🔄 Load from localStorage on mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    const savedImage = localStorage.getItem("userImage");

    if (savedProfile) setProfile(savedProfile);
    if (savedImage) setPreview(savedImage);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    if (preview) localStorage.setItem("userImage", preview);
    alert("✅ Profile saved!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
        
        <div className="mb-3 text-center">
          {preview && <img src={preview} alt="Preview" className="img-thumbnail mb-2" width="150" />}
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea name="bio" className="form-control" rows="3" value={profile.bio} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" name="age" className="form-control" value={profile.age} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select name="gender" className="form-select" value={profile.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Interests</label>
          <input type="text" name="interests" className="form-control" value={profile.interests} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success w-100" style={{ backgroundColor: "#ff1540ff", borderColor: "#ff69b4" }}>Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;
