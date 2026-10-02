import "./Contact.css";

function Contact() {

    const handleSubmit = () => {

        window.location.reload();

    };

    return (

        <>

         <section id="contact">

          <div className="reveal">

             <h2 className="section-title">

              <span>Get In Touch</span>

             </h2>

             <div className="divider"></div>

          </div>

          <div className="contact-grid">

             <div className="contact-info-panel reveal">

              <p className="contact-intro">

               Open to internships, collaborations, and cybersecurity

               discussions. I respond within 24 hours — let's build something

               secure together.

              </p>

              <div className="contact-detail-list">

               <div className="contact-detail">





 <div>

  <div className="contact-detail-label">Email</div>

  <a

   href="mailto:srimathi200821@gmail.com"

   className="contact-detail-value"

  >

   srimathi200821@gmail.com

  </a>

 </div>

</div>

<div className="contact-detail">

 <div>

  <div className="contact-detail-label">LinkedIn</div>

  <a

   href="https://www.linkedin.com/in/sri-mathi-90b062387"

   target="_blank"

   rel="noreferrer"

   className="contact-detail-value"

  >

   sri-mathi-90b062387

  </a>

 </div>

</div>

<div className="contact-detail">

 <div>

  <div className="contact-detail-label">GitHub</div>

  <a

   href="https://github.com/srimathi200821-boop"

   target="_blank"

   rel="noreferrer"

   className="contact-detail-value"

  >

   srimathi200821-boop

  </a>

 </div>

  </div>

  <div className="contact-detail">

   <div>

       <div className="contact-detail-label">Location</div>

       <span className="contact-detail-value">

        Chennai, Tamil Nadu, India

       </span>

   </div>

  </div>

 </div>

 <div className="availability-badge">

 <span className="avail-dot"></span>

  Available for Opportunities

 </div>

</div>

<div className="contact-form-panel reveal">

 <div className="cf-group">

  <label className="cf-label">Your Name</label>

  <input

   className="cf-input"

   type="text"

   placeholder="John Doe"

  />

 </div>

 <div className="cf-group">

  <label className="cf-label">Email Address</label>

  <input

   className="cf-input"

   type="email"

   placeholder="john@example.com"

  />

 </div>

 <div className="cf-group">

  <label className="cf-label">Subject</label>

  <input





                className="cf-input"

                type="text"

                placeholder="Internship Opportunity / Collaboration"

             />

            </div>

            <div className="cf-group">

             <label className="cf-label">Message</label>

             <textarea

                className="cf-input cf-textarea"

                placeholder="Hi Srimathi, I'd like to discuss..."

             ></textarea>

            </div>

            <button

             className="btn cf-submit"

             onClick={handleSubmit}

            >

             Send Message

            </button>

           </div>

          </div>

         </section>

         <footer>

          <p>&copy; 2026 Srimathi. All Rights Reserved.</p>

         </footer>

     </>

    );

}

export default Contact;
