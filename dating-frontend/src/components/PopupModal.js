import React, { useEffect } from "react";
import Modal from "bootstrap/js/dist/modal";
import "bootstrap/dist/css/bootstrap.min.css";

const PopupModal = () => {
useEffect(() => {
  const isFilled = localStorage.getItem("popupFilled");
  const modalEl = document.getElementById("genderModal");

  if (!isFilled && modalEl) {
    const modal = new Modal(modalEl, {
      backdrop: "static",
      keyboard: false
    });
    modal.show();

    modalEl.addEventListener("hidden.bs.modal", () => {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "auto";
      }
    });
  }
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const age = e.target.age.value;
    const gender = e.target.gender.value;
    const preference = e.target.preference.value;

    console.log({ age, gender, preference });

    // ✅ Save to localStorage
    localStorage.setItem("popupFilled", "true");

    const modalEl = document.getElementById("genderModal");
    const modal = Modal.getInstance(modalEl);
    if (modal) modal.hide();
  };

  return (
    <div
      className="modal fade"
      id="genderModal"
      tabIndex="-1"
      aria-labelledby="genderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-popup text-white">
          <div className="modal-body text-center">
            <h5 className="mb-3">Let’s Get Started </h5>
           <form onSubmit={handleSubmit}>
  <div className="mb-3 d-flex align-items-center gap-3">
  <label htmlFor="age" className="form-label mb-0" style={{ minWidth: "100px" }}>
    Your Age :
  </label>
  <input
    type="number"
    style={{ backgroundColor: "#f7c8d1f6", borderColor: "#f33457" }}
    className="form-control"
    id="age"
    name="age"
    required
  />
</div>


 {/* You Are Section */}
<div className="mb-3 d-flex align-items-center gap-3">
  <label className="form-label mb-0" style={{ minWidth: "100px" }}>
    You Are :
  </label>
  <div className="btn-group" role="group">
    <input type="radio" className="btn-check" name="gender" id="male" value="Male" required />
    <label className="btn custom-radio-label" htmlFor="male">Male</label>

    <input type="radio" className="btn-check" name="gender" id="female" value="Female" />
    <label className="btn custom-radio-label" htmlFor="female">Female</label>
  </div>
</div>

{/* You Prefer Section */}
<div className="mb-3 d-flex align-items-center gap-3">
  <label className="form-label mb-0" style={{ minWidth: "100px" }}>
    You Prefer :
  </label>
  <div className="btn-group" role="group">
    <input type="radio" className="btn-check" name="preference" id="prefer-male" value="Male" required />
    <label className="btn custom-radio-label" htmlFor="prefer-male">Male</label>

    <input type="radio" className="btn-check" name="preference" id="prefer-female" value="Female" />
    <label className="btn custom-radio-label" htmlFor="prefer-female">Female</label>

    <input type="radio" className="btn-check" name="preference" id="prefer-both" value="Both" />
    <label className="btn custom-radio-label" htmlFor="prefer-both">Both</label>
  </div>
</div>


  <button type="submit" style={{ backgroundColor: "#f3143d", borderColor: "#f33457" }} className="btn  w-100 mt-3">Continue</button>
</form>

          </div>
        </div>
      </div>
    </div>
  );
  
};


export default PopupModal;
