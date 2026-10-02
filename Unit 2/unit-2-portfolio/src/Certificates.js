import { useState } from "react";

import "./Certificates.css";

import cert1 from "./assets/certificates/certificate-1.jpg";
import cert2 from "./assets/certificates/certificate-2.jpg";
import cert3 from "./assets/certificates/certificate-3.jpg";
import cert4 from "./assets/certificates/certificate-4.jpg";
import cert5 from "./assets/certificates/certificate-5.jpg";
import cert6 from "./assets/certificates/certificate-6.jpg";
import cert7 from "./assets/certificates/certificate-7.jpg";
import cert8 from "./assets/certificates/certificate-8.jpg";
import cert9 from "./assets/certificates/certificate-9.jpg";
import cert10 from "./assets/certificates/certificate-10.jpg";
import cert11 from "./assets/certificates/certificate-11.jpg";
import cert12 from "./assets/certificates/certificate-12.jpg";
import cert13 from "./assets/certificates/certificate-13.jpg";
import cert14 from "./assets/certificates/certificate-14.jpg";
import cert15 from "./assets/certificates/certificate-15.jpg";
import cert16 from "./assets/certificates/infosys(Java).jpg";
import cert17 from "./assets/certificates/Infosys(python).jpg";

import cert18 from "./assets/certificates/Infosys(python).jpg";

import cert19 from "./assets/certificates/Responsive web design.jpg";

import cert20 from "./assets/certificates/Great learning.jpg";

import cert21 from "./assets/certificates/Java course.jpg";

import cert22 from "./assets/certificates/Javascript course.jpg";

import cert23 from "./assets/certificates/leap.jpg";

import cert24 from "./assets/certificates/Microsoft(secure).jpg";

import cert25 from "./assets/certificates/Tcsion.jpg";

import cert26 from "./assets/certificates/UI UX.jpg";

import cert27 from "./assets/certificates/Microsoft(canvas).jpg";

const CERTS = [

 {

     num: "01",

     title: "Claude Code in Action",

     category: "AI/Claude",

     image: cert1,

     verify: "https://verify.skilljar.com/c/8wn46433tcpg",

 },

 {

     num: "02",

     title: "Claude 101",

     category: "AI/Claude",





    image: cert2,

},

{

    num: "03",

    title: "Introduction to agent skills",

    category: "AI/Claude",

    image: cert13,

},

{

    num: "04",

    title: "Introduction to subagents",

    category: "AI/Claude",

    image: cert14,

},

{

    num: "05",

    title: "Introduction to Claude Cowork",

    category: "AI/Claude",

    image: cert15,

},

{

    num: "06",

    title: "Claude with the Anthropic API",

    category: "AI/Claude",

    image: cert4,

verify: "https://verify.skilljar.com/c/kc9ht2v5xar9",

},

{

    num: "07",

    title: "Claude with Amazon Bedrock",

    category: "AI/Claude",

    image: cert9,

verify: "https://verify.skilljar.com/c/abi29t8vzvwg",

},

{

    num: "08",

    title: "Claude with Google Vertex AI",

    category: "AI/Claude",

    image: cert10,

    verify: "https://verify.skilljar.com/c/cfpo6xwbxa3z",

},

{

    num: "09",

    title: "Introduction to Model Context Protocol",

    category: "AI/Claude",

    image: cert5,

verify: "https://verify.skilljar.com/c/vx3ta39y5wn8",

},

{

    num: "10",

    title: "Model Context Protocol: Advanced Topics",

    category: "AI/Claude",

    image: cert8,

    verify: "https://verify.skilljar.com/c/2qosfnky6rr9",

},

{

    num: "11",

    title: "AI Fluency: Framework & Foundations",

    category: "AI/Claude",

    image: cert3,

    },

{

    num: "12",

    title: "AI Fluency for educators",

    category: "AI/Claude",

    image: cert6,

},

{

    num: "13",

    title: "AI Fluency for students",





    category: "AI/Claude",

    image: cert7,

},

{

    num: "14",

    title: "Teaching the AI Fluency Framework",

    category: "AI/Claude",

    image: cert11,

},

{

    num: "15",

    title: "AI Fluency for nonprofits",

    category: "AI/Claude",

    image: cert12,

},

{

    num: "16",

    title: "Java Programming Fundamentals",

    category: "Java",

    image: cert16,

    verify: "https://validate.onwingspan.com",

},

{

    num: "17",

    title: "Python Fundamentals",

    category: "Python",

    image: cert17,

     verify: "https://verify.onwingspan.com",

},

{

    num: "18",

    title: "Legacy Responsive Web Design V8",

    category: "Web Dev",

    image: cert18,

      verify: "https://freecodecamp.org/certification/sri_mathi/responsive-web-design",

},

{

    num: "19",

    title: "Responsive Web Design",

    category: "Web Dev",

    image: cert19,

    verify: "https://freecodecamp.org/certification/sri_mathi/responsive-web-design-v9",

},

{

    num: "20",

    title: "Student Report Card Management System in Java",

    category: "Java",

    image: cert20,

},

{

    num: "21",

    title: "Java Course - Mastering the Fundamentals",

    category: "Java",

    image: cert21,

    },

{

    num: "22",

    title: "JavaScript Course: Unlocking the Power of JavaScript",

    category: "JavaScript",

    image: cert22,

     },

{

    num: "23",

    title: "Automation with Arduino Bootcamp",

    category: "Other",

    image: cert23,



},

{

    num: "24",





     title: "Microsoft Applied Skills: Secure Storage for Azure Files and Blob Storage",

     category: "Cloud",

     image: cert24,



     verify: "Credential ID: FCC91E8FCC44AE18",

 },

 {

     num: "25",

     title: "Communication Skills",

     category: "Soft Skills",

     image: cert25,



     verify: "Cert ID: 91306-29500749-1016",

 },

 {

     num: "26",

     title: "Digital Skills: User Experience",

     category: "Design",

     image: cert26,



 },

 {

     num: "27",

     title: "Microsoft Applied Skills: Create and Manage Canvas Apps with Power Apps",

     category: "Cloud",

     image: cert27,



     verify: "Credential ID: E24C7450A7B4DA32",

 },

];

const FILTERS = [

 "All",

 "AI/Claude",

 "Java",

 "Python",

 "JavaScript",

 "Web Dev",

 "Cloud",

 "Design",

 "Soft Skills",

 "Other",

];

function Certificates() {

 const [filter, setFilter] = useState("All");

 const [active, setActive] = useState(null); // for the lightbox

 const visible = CERTS.filter((c) => filter === "All" || c.category === filter);

 return (

     <section id="certificates">

      <div className="section-header reveal">

       <h2>

           Certificates I've <span>Earned</span>

       </h2>

       <div className="divider"></div>

       <p

      style={{

      color: "black",

      margin: "0 auto 2rem",

      maxWidth: "700px",

      fontSize: "0.95rem",

      textAlign: "center",

      }}

       >

           certificates from hands-on courses and bootcamps —

           spanning AI/Claude, Java, Python, JavaScript, web development, cloud,

           design, and soft skills.

       </p>

      </div>

      <div className="proj-filters reveal">

       {FILTERS.map((f) => (

           <button key={f} className="filter-btn" onClick={() => setFilter(f)}>





   {f}

  </button>

 ))}

</div>

<div className="projects-grid">

 {visible.map((cert) => (

  <div

   key={cert.num}

   className={`proj-card${cert.featured ? " has-badge" : ""}`}

  >

   {cert.featured && (

       <span className="proj-featured-badge">Featured</span>

   )}

   <div

       className="proj-thumb-placeholder proj-thumb-cert"

       onClick={() => setActive(cert)}

   >

       <img

        src={cert.image}

        alt={cert.title}

        className="cert-thumb-img"

       />

   </div>

   <div className="proj-body">

       <div style={{ display: "flex", justifyContent: "space-between" }}>

        <span className="proj-num">{cert.num}</span>

        <span className="proj-lang">{cert.category}</span>

       </div>

       <div className="proj-title">{cert.title}</div>

       {cert.issued && (

        <p className="proj-desc">Issued {cert.issued}</p>

       )}

       <div className="proj-tags">

        <span className="proj-tag">{cert.category}</span>

       </div>

                <button

                 className="proj-link"

                 onClick={() => setActive(cert)}

                 style={{ background: "none", border: "none", cursor: "pointer" }}

                >

                 View Certificate

                </button>

               </div>

              </div>

          ))}

         </div>

         {active && (

          <div className="cert-lightbox" onClick={() => setActive(null)}>

              <div className="cert-lightbox-inner" onClick={(e) => e.stopPropagation()}>

               <button className="cert-lightbox-close" onClick={() => setActive(null)}>

                ✕

               </button>

               <img src={active.image} alt={active.title} />

               <div className="cert-lightbox-caption">

                <strong>{active.title}</strong>

                {active.issued && <span> — Issued {active.issued}</span>}

                {active.verify && (

                 <a href={active.verify} target="_blank" rel="noreferrer">

                     Verify certificate

                 </a>

                )}

               </div>

              </div>

          </div>

         )}

     </section>

    );

}

export default Certificates;
