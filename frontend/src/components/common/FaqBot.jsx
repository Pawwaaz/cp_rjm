import React, { useState } from "react";
import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";

const clientId = "fe2f74ac-41bf-4301-8265-ac767faa9523";

const client = getClient({
  clientId,
});

// Nonaktifkan speech recognition (blokir fungsi native)
window.SpeechRecognition = undefined;
window.webkitSpeechRecognition = undefined;

const configuration = {
  botAvatar: "https://imgur.com/x1REkL5.png",
  botName: "Customer Care",
  composerPlaceholder: "Tuliskan Pesan Disini",
  botDescription: "Selamat Datang Di Website PT Raffi Jasa Mandiri",
  color: "#5eb1ef",
  variant: "soft",
  themeMode: "light",
  fontFamily: "inter",
  radius: 1,
  showVoice: false,
  enableVoice: false,
};

const FaqBot = () => {
  const [isOpen, setIsOpen] = useState(
    sessionStorage.getItem("chatOpen") === "true"
  );
  const toggleChatbot = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    sessionStorage.setItem("chatOpen", newState.toString());
  };
  return (
    <div
      className=" faq position-fixed bottom-0 end-0 mb-4 me-4"
      style={{ zIndex: 1000 }}
    >
      <div className="card-body overflow-auto p-3">
        {isOpen ? (
          <div
            className="card shadow chatbot-card "
            style={{ width: "400px", height: "490px" }}
          >
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Customer Support</h3>
              <button
                onClick={toggleChatbot}
                className="btn btn-sm btn-light text-primary"
              >
                ×
              </button>
            </div>
            <WebchatProvider client={client} configuration={configuration}>
              <Webchat />
            </WebchatProvider>
          </div>
        ) : (
          <button
            onClick={toggleChatbot}
            className="btn btn-primary rounded-circle p-3 shadow"
            style={{ width: "60px", height: "60px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default FaqBot;
