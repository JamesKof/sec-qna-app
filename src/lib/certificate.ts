export const generateCertificate = (name: string, score: number) => {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f0f9f1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e8f5e9;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)" rx="8"/>
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#2e7d32" stroke-width="3" rx="6"/>
      <rect x="30" y="30" width="740" height="540" fill="none" stroke="#2e7d32" stroke-width="1" stroke-dasharray="8,4" rx="4"/>
      
      <!-- Leaf icon -->
      <text x="400" y="90" text-anchor="middle" font-size="40">🌿</text>
      
      <text x="400" y="140" text-anchor="middle" font-family="Georgia, serif" font-size="32" fill="#1b5e20" font-weight="bold">CERTIFICATE OF COMPLETION</text>
      <text x="400" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#4caf50" letter-spacing="4">SEC USSD TRAINING MODULE</text>
      
      <line x1="200" y1="200" x2="600" y2="200" stroke="#4caf50" stroke-width="1"/>
      
      <text x="400" y="240" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#555">This is to certify that</text>
      <text x="400" y="285" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="#1b5e20" font-weight="bold">${escapeXml(name)}</text>
      <line x1="200" y1="300" x2="600" y2="300" stroke="#2e7d32" stroke-width="1"/>
      
      <text x="400" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#555">has successfully completed the Soil Erosion Control (SEC)</text>
      <text x="400" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#555">USSD App Training Module with a score of</text>
      <text x="400" y="410" text-anchor="middle" font-family="Georgia, serif" font-size="48" fill="#2e7d32" font-weight="bold">${score}%</text>
      
      <text x="400" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#777">as part of the 125 Rwanda Project</text>
      
      <text x="200" y="530" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#555">${date}</text>
      <line x1="130" y1="515" x2="270" y2="515" stroke="#999" stroke-width="1"/>
      <text x="200" y="548" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#999">Date</text>
      
      <text x="600" y="530" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#2e7d32" font-style="italic">SEC Training Program</text>
      <line x1="500" y1="515" x2="700" y2="515" stroke="#999" stroke-width="1"/>
      <text x="600" y="548" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#999">Authorized Signature</text>
    </svg>
  `;

  // Convert SVG to canvas then PDF-like download as PNG
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, 1600, 1200);
    
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
