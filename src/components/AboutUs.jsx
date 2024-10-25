import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faWhatsapp, faTwitter } from "@fortawesome/free-brands-svg-icons";
//import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // for email icon

import helitha1 from '../assets/image/helitha1.jpg'; 
import gimhani from '../assets/image/gimhani.jpg';
import pathumi from '../assets/image/pathumi.jpg';
import bodhika from '../assets/image/bodhika.jpg';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const members = [
    {
      name: "Helitha Kavinda",
      role: "Frontend & Backend Developer",
      image: helitha1, 
      bio: "Helitha focuses on backend development with Spring Boot and 3D model generation & Frontend development with React vite."
    },
    {
      name: "Gimhani Sandeepani",
      role: "Frontend & Backend Developer",
      image: gimhani, 
      bio: "Gimhani focuses on backend development with Spring Boot & Frontend development with React vite."
    },
    {
      name: "Pathumi Jayasiri",
      role: "Frontend & Backend Developer",
      image: pathumi, 
      bio: "Pathumi focuses on backend development with Spring Boot and & Frontend development with React vite."
    },
    {
      name: "Bodhika Nishadhi",
      role: "Frontend & Backend Developer",
      image: bodhika,
      bio: "Bodhika focuses on backend development with Spring Boot and & Frontend development with React vite."
    }
  ];

  return (
    <div className="about-us">
      <h1>About Us</h1>
      <div className="members">
        {members.map((member, index) => (
          <div key={index} className="member-card">
            <img src={member.image} alt={member.name} className="member-image" />
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>

      <div className="about-system">
        <h2>3D Customization Footwear Ordering System</h2>
        <p>
          Our 3D customization footwear ordering system allows customers to design their perfect pair of shoes, choosing from a variety of styles, colors, and materials. 
          With advanced 3D modeling, customers can visualize their creations in real-time, ensuring they get the exact design they envision. 
          Once satisfied, the custom footwear is crafted with precision and delivered straight to the customer’s doorstep. 
          This system not only provides a unique and personalized shopping experience but also combines cutting-edge technology with quality craftsmanship to meet the highest expectations of our customers.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="contact-us">
        <h2>Contact Us</h2>
        <div className="contact-icons">
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
          <a href="mailto:info@example.com">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </a>
          <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
