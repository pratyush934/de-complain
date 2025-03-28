import React, { useState } from "react";
// import "./../styles/accordion.css"; // Separate styles
import "./../styles/Accordion.css"
const faqData = [
  {
    question: "How does De-Complaint work?",
    answer:
      "De-Complaint is a decentralized platform where users can submit complaints anonymously, track their progress, and engage with authorities securely.",
  },
  {
    question: "Is my complaint anonymous?",
    answer:
      "Yes, all complaints are encrypted and stored on the blockchain, ensuring anonymity and security.",
  },
  {
    question: "What types of complaints can be submitted?",
    answer:
      "You can submit complaints related to infrastructure, corruption, public services, and more.",
  },
  {
    question: "How can I support a complaint?",
    answer:
      "You can upvote complaints to increase their visibility and impact decision-making.",
  },
];

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`accordion-item ${activeIndex === index ? "active" : ""}`}
        >
          <button
            className="accordion-header"
            onClick={() => toggleAccordion(index)}
          >
            ❓ {item.question} {activeIndex === index ? "▼" : "▶"}
          </button>
          {activeIndex === index && (
            <p className="accordion-content">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
