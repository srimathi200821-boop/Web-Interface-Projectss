import React from "react";
import "./App.css";
function App() {
  const contacts = [
    {
      name: "Srima",
      phone: "6380155809",
      email: "srimathi200821@gmail.com",
      location: "Chennai, Tamil Nadu",
      initials: "S",
    },
    {
      name: "Lathi",
      phone: "8925742624",
      email: "lathika967@gmail.com",
      location: "Tambaram, Chennai",
      initials: "R",
    },
    {
      name: "Hema",
      phone: "8610563034",
      email: "hemamalini182007@gmail.com",
      location: "Chromepet, Chennai",
      initials: "G",
    },
    {
      name: "Bhavani",
      phone: "9710284943",
      email: "bhavanisuresh15@gmail.com",
      location: "Velachery, Chennai",
      initials: "S",
    },
    {
      name: "Meena",
      phone: "9003130194",
      email: "meenakshi2007@gmail.com",
      location: "Adyar, Chennai",
      initials: "S",
    },
    {
      name: "Jessica",
      phone: "8610575594",
      email: "jessica162007@gmail.com",
      location: "Guindy, Chennai",
      initials: "J",
    },
    {
      name: "Amma",
      phone: "9841104263",
      email: "chithra1126@gmail.com",
      location: "T Nagar, Chennai",
      initials: "S",
    },
    {
      name: "Appa",
      phone: "9710570411",
      email: "senthilnathan2629@gmail.com",
      location: "Anna Nagar, Chennai",
      initials: "P",
    },
    {
      name: "Divya",
      phone: "6383596430",
      email: "divya123@gmail.com",
      location: "Porur, Chennai",
      initials: "N",
    },
    {
      name: "Kishore",
      phone: "9884264378",
      email: "kishore2928@gmail.com",
      location: "Perungudi, Chennai",
      initials: "M",
    },
    {
      name: "Sharani",
      phone: "9159318150",
      email: "sharani245@gmail.com",
      location: "Mylapore, Chennai",
      initials: "A",
    },
    {
      name: "Gokul",
      phone: "6385274108",
      email: "gokul2719@gmail.com",
      location: "Nungambakkam, Chennai",
      initials: "J",
    },
    {
      name: "Raji",
      phone: "9786251877",
      email: "raji132006@gmail.com",
      location: "Egmore, Chennai",
      initials: "R",
    },
    {
      name: "Sahana",
      phone: "8838514631",
      email: "sahana@gmail.com",
      location: "Kilpauk, Chennai",
      initials: "S",
    },
    {
      name: "DeepaSri",
      phone: "9566184048",
      email: "deepa172008@gmail.com",
      location: "Besant Nagar, Chennai",
      initials: "M",
    },
    {
      name: "Deepika",
      phone: "8807294983",
      email: "deepika@gmail.com",
      location: "Madipakkam, Chennai",
      initials: "D",
    },
    {
      name: "Vanthana",
      phone: "9363083846",
      email: "vanthu222007@gmail.com",
      location: "Avadi, Chennai",
      initials: "L",
    },
    {
      name: "Sanjeetha",
      phone: "8056986916",
      email: "sanjee365@gmail.com",
      location: "Ambattur, Chennai",
      initials: "S",
    },
    {
      name: "Kavya",
      phone: "9890123456",
      email: "kavya@gmail.com",
      location: "Thiruvanmiyur, Chennai",
      initials: "K",
    },
    {
      name: "Ramya",
      phone: "9890123456",
      email: "kavya@gmail.com",
      location: "Thiruvanmiyur, Chennai",
      initials: "K",
    },
  ];
  return (
    <div className="page">
      <div className="header">
        <h1>Professional Contact Directory</h1>
        <p>Connect with our team</p>
      </div>
      <div className="cards-container">
        {contacts.map((contact, index) => {
          const whatsappNumber = `91${contact.phone}`;
          const locationUrl =
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              contact.location
            )}`;
          const gmailUrl =
            `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
              contact.email
            )}`;
          return (
            <div className="contact-card" key={index}>
              <div className="profile">
                <div className="profile-image">
                  {contact.initials}
                </div>
                <h2>{contact.name}</h2>
                <p className="role">
                  {contact.role}
                </p>
              </div>
              <div className="contact-buttons">
                <a
                  href={`tel:+91${contact.phone}`}
                  className="contact-item"
                >
                  <div className="icon call-icon">
                    📞
                  </div>
                  <div className="contact-text">
                    <h3>Call Me</h3>
                    <p>+91 {contact.phone}</p>
                  </div>
                  <div className="arrow">
                    ›
                  </div>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <div className="icon whatsapp-icon">
                    💬
                  </div>
                  <div className="contact-text">
                    <h3>WhatsApp Chat</h3>
                    <p>Chat directly on WhatsApp</p>
                  </div>
                  <div className="arrow">
                    ›
                  </div>
                </a>
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <div className="icon email-icon">
                    ✉️
                  </div>
                  <div className="contact-text">
                    <h3>Email Me</h3>
                    <p>{contact.email}</p>
                  </div>
                  <div className="arrow">
                    ›
                  </div>
                </a>
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <div className="icon location-icon">
                    📍
                  </div>
                  <div className="contact-text">
                    <h3>Location</h3>
                    <p>{contact.location}</p>
                  </div>
                  <div className="arrow">
                    ›
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="main-footer">
        <p>© 2026 Professional Contact Directory</p>
      </div>

    </div>
  );
}
export default App;