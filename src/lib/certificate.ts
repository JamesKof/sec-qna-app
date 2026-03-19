export const generateCertificate = (name: string, score: number) => {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="650" viewBox="0 0 800 650">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f0f9f1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e8f5e9;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="650" fill="url(#bg)" rx="8"/>
      <rect x="20" y="20" width="760" height="610" fill="none" stroke="#2e7d32" stroke-width="3" rx="6"/>
      <rect x="30" y="30" width="740" height="590" fill="none" stroke="#2e7d32" stroke-width="1" stroke-dasharray="8,4" rx="4"/>
      
      <!-- Leaf icon -->
      <text x="400" y="85" text-anchor="middle" font-size="36">🌿</text>
      
      <text x="400" y="125" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#1b5e20" font-weight="bold">CERTIFICATE OF COMPLETION</text>
      <text x="400" y="155" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#4caf50" letter-spacing="4">SEC USSD TRAINING MODULE</text>
      
      <line x1="200" y1="175" x2="600" y2="175" stroke="#4caf50" stroke-width="1"/>
      
      <text x="400" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#555">This is to certify that</text>
      <text x="400" y="250" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#1b5e20" font-weight="bold">${escapeXml(name)}</text>
      <line x1="200" y1="265" x2="600" y2="265" stroke="#2e7d32" stroke-width="1"/>
      
      <text x="400" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#555">has successfully completed the Soil Erosion Control (SEC)</text>
      <text x="400" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#555">USSD App Training Module with a score of</text>
      <text x="400" y="365" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#2e7d32" font-weight="bold">${score}%</text>
      
      <text x="400" y="405" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#777">as part of the 125 Rwanda Project</text>
      
      <text x="200" y="470" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#555">${date}</text>
      <line x1="130" y1="455" x2="270" y2="455" stroke="#999" stroke-width="1"/>
      <text x="200" y="485" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#999">Date</text>
      
      <text x="600" y="470" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#2e7d32" font-style="italic">SEC Training Program</text>
      <line x1="500" y1="455" x2="700" y2="455" stroke="#999" stroke-width="1"/>
      <text x="600" y="485" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#999">Authorized Signature</text>

      <!-- Partners & Sponsors -->
      <line x1="80" y1="510" x2="720" y2="510" stroke="#c8e6c9" stroke-width="1"/>
      <text x="400" y="535" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#999" letter-spacing="3">PARTNERS &amp; SPONSORS</text>
      
      <text x="100" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#1565c0" font-weight="bold">RWB</text>
      <text x="100" y="590" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" fill="#999">Client</text>
      
      <text x="230" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#1a237e" font-weight="bold">alinea</text>
      <text x="230" y="590" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" fill="#999">Lead Consultant</text>
      
      <text x="360" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#4fc3f7" font-weight="bold">mek</text>
      <text x="360" y="590" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" fill="#999">Consulting Partner</text>
      
      <text x="490" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#2e7d32" font-weight="bold">Climate Action</text>
      <text x="490" y="590" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" fill="#999">Sponsor</text>
      
      <text x="620" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#0d47a1" font-weight="bold">ECONOLER</text>
      <text x="620" y="590" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" fill="#999">Sponsor</text>
      
      <text x="720" y="575" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#c62828" font-weight="bold">CAA</text>
      <text x="720" y="590" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" fill="#999">Sponsor</text>
    </svg>
  `;

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1300;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, 1600, 1300);
    
    canvas.toBlob((pngBlob) => {
      if (pngBlob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(pngBlob);
        a.download = `SEC_Certificate_${name.replace(/\s+/g, "_")}.png`;
        a.click();
        URL.revokeObjectURL(a.href);
      }
    }, "image/png");
    
    URL.revokeObjectURL(url);
  };
  img.src = url;
};

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
