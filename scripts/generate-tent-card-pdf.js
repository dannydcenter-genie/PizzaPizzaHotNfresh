import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTentCard() {
  console.log('Generating Table Tent Card PDF...');

  // Standard A4 Portrait (210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const halfHeight = pageHeight / 2; // 148.5mm per side

  // Customer App Download URL
  const appDownloadUrl = 'https://github.com/dannydcenter-genie/PizzaPizzaHotNfresh/releases/download/v1.0.0/PizzaPizza-Customer.apk';

  // Generate QR Code as Data URL
  const qrDataUrl = await QRCode.toDataURL(appDownloadUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 400,
    color: {
      dark: '#11141E',
      light: '#FFFFFF'
    }
  });

  // Helper to render one side of the tent card
  // yOffset is starting Y position (0 for top side, halfHeight for bottom side)
  function renderTentSide(yOffset, isRotated = false) {
    const cardTop = yOffset + 5;
    const cardBottom = yOffset + halfHeight - 5;
    const cardLeft = 8;
    const cardRight = pageWidth - 8;
    const cardWidth = cardRight - cardLeft;
    const cardHeight = halfHeight - 10;
    const centerX = pageWidth / 2;

    // Dark sleek container with neon border
    doc.setFillColor(15, 18, 28); // #0F121C
    doc.roundedRect(cardLeft, cardTop, cardWidth, cardHeight, 6, 6, 'F');

    // Gradient accent top bar (Scarlet Red & Molten Gold)
    doc.setFillColor(255, 42, 59); // Pizza Red #FF2A3B
    doc.rect(cardLeft, cardTop, cardWidth / 2, 3, 'F');
    doc.setFillColor(255, 174, 0); // Cheese Gold #FFAE00
    doc.rect(cardLeft + cardWidth / 2, cardTop, cardWidth / 2, 3, 'F');

    // Title / Brand Header
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('PIZZA PIZZA', centerX, cardTop + 14, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(255, 174, 0);
    doc.text('(HOT & FRESH)', centerX, cardTop + 19, { align: 'center' });

    // Badges: Pure Veg & 4.9 Rating
    doc.setFillColor(20, 80, 40);
    doc.roundedRect(centerX - 46, cardTop + 22, 42, 6, 2, 2, 'F');
    doc.setTextColor(100, 255, 140);
    doc.setFontSize(8);
    doc.text('100% PURE VEG', centerX - 25, cardTop + 26.2, { align: 'center' });

    doc.setFillColor(50, 40, 10);
    doc.roundedRect(centerX + 4, cardTop + 22, 42, 6, 2, 2, 'F');
    doc.setTextColor(255, 215, 0);
    doc.text('4.9  (24 GOOGLE REVIEWS)', centerX + 25, cardTop + 26.2, { align: 'center' });

    // Center QR Code White Container
    const qrBoxSize = 52;
    const qrBoxX = centerX - qrBoxSize / 2;
    const qrBoxY = cardTop + 32;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 4, 4, 'F');
    doc.addImage(qrDataUrl, 'PNG', qrBoxX + 2, qrBoxY + 2, qrBoxSize - 4, qrBoxSize - 4);

    // Call to action below QR
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('SCAN TO ORDER & GET VIP DEALS', centerX, qrBoxY + qrBoxSize + 7, { align: 'center' });

    doc.setFontSize(9);
    doc.setTextColor(200, 205, 220);
    doc.setFont('helvetica', 'normal');
    doc.text('Instantly opens customer ordering app on your phone', centerX, qrBoxY + qrBoxSize + 11.5, { align: 'center' });

    // Offer Box
    const offerBoxY = qrBoxY + qrBoxSize + 15;
    doc.setFillColor(28, 22, 18);
    doc.roundedRect(centerX - 68, offerBoxY, 136, 15, 3, 3, 'F');
    doc.setDrawColor(255, 174, 0);
    doc.setLineWidth(0.3);
    doc.roundedRect(centerX - 68, offerBoxY, 136, 15, 3, 3, 'S');

    doc.setTextColor(255, 174, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Use Coupon: HOTFRESH50 for Rs.50 OFF', centerX, offerBoxY + 5.5, { align: 'center' });

    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('FREE HOME DELIVERY on Orders Rs.500 & Above!', centerX, offerBoxY + 11, { align: 'center' });

    // Store Info & Phone
    doc.setTextColor(170, 180, 200);
    doc.setFontSize(7.5);
    doc.text('Body Guard, 1D, Canal Rd, Saundhon wali, Chironwali, Dehradun', centerX, cardBottom - 11, { align: 'center' });
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('WhatsApp / Phone: +91 6398454240 | +91 7051386137', centerX, cardBottom - 6.5, { align: 'center' });

    // Required Footer Credit
    doc.setFontSize(6.5);
    doc.setTextColor(120, 130, 150);
    doc.setFont('helvetica', 'normal');
    doc.text('Site is built and managed by Stella Merkatus', centerX, cardBottom - 2, { align: 'center' });
  }

  // Render Top Panel
  renderTentSide(0);

  // Render Fold Line along the middle
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([3, 3], 0);
  doc.line(8, halfHeight, pageWidth - 8, halfHeight);

  // Center fold indicator text
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text('--- FOLD HERE ALONG DASHED LINE TO STAND ON TABLE ---', pageWidth / 2, halfHeight - 1.5, { align: 'center' });
  doc.text('--- FOLD HERE ALONG DASHED LINE TO STAND ON TABLE ---', pageWidth / 2, halfHeight + 3.5, { align: 'center' });

  // Render Bottom Panel (faces other side of table)
  renderTentSide(halfHeight);

  // Output directories
  const publicDownloads = path.join(__dirname, '..', 'public', 'downloads');
  const releaseApks = path.join(__dirname, '..', 'release-apks');

  if (!fs.existsSync(publicDownloads)) fs.mkdirSync(publicDownloads, { recursive: true });
  if (!fs.existsSync(releaseApks)) fs.mkdirSync(releaseApks, { recursive: true });

  const pdfOutputPublic = path.join(publicDownloads, 'PizzaPizza-CustomerApp-TentCard.pdf');
  const pdfOutputRelease = path.join(releaseApks, 'PizzaPizza-CustomerApp-TentCard.pdf');

  const pdfBytes = doc.output('arraybuffer');
  fs.writeFileSync(pdfOutputPublic, Buffer.from(pdfBytes));
  fs.writeFileSync(pdfOutputRelease, Buffer.from(pdfBytes));

  console.log('Successfully generated Table Tent Card PDF:');
  console.log(' ->', pdfOutputPublic);
  console.log(' ->', pdfOutputRelease);
}

generateTentCard().catch(err => {
  console.error('Error generating tent card:', err);
  process.exit(1);
});
