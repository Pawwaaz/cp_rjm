import { useState } from "react";
import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";

const clientId = "fe2f74ac-41bf-4301-8265-ac767faa9523";

// Konfigurasi bot, sesuaikan dengan preferensimu
const configuration = {
  color: "#000", // Kamu bisa sesuaikan warna di sini
  botName: "Customer Care",
  botAvatar:
    "https://files.bpcontent.cloud/2025/05/07/23/20250507234705-MQIJFQ3M.png", // Gambar avatar bot
  composerPlaceholder: "Tuliskan pesan...",
  variant: "soft",
  themeMode: "light",
};

export default function App() {
  const client = getClient({
    clientId,
  });

  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* WebchatProvider adalah komponen pembungkus yang menginisialisasi Botpress Webchat */}
      <WebchatProvider client={client} configuration={configuration}>
        {/* Tombol FAB untuk membuka dan menutup Webchat */}
        <Fab onClick={toggleWebchat} />

        {/* Kondisi untuk menampilkan Webchat */}
        {isWebchatOpen && (
          <div>
            <Webchat />
          </div>
        )}
      </WebchatProvider>
    </div>
  );
}
