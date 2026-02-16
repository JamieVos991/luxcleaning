// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer configuratie (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Jamievos100@gmail.com',
    pass: 'mlka zvcl pvym llht' // App-wachtwoord
  }
});

// POST endpoint voor e-mails
app.post('/send-email', (req, res) => {
  const {
    naam, email, telefoon, bedrijf,
    adres, postcode, gemeente,
    doel, diensten, bericht
  } = req.body;

  // Diensten in HTML lijst
  const dienstenLijstHtml = diensten && diensten.length > 0
    ? diensten.map(d => `<li>${d}</li>`).join('')
    : "<li>Geen specifieke diensten geselecteerd</li>";

  const mailOptions = {
    from: 'Jamievos100@gmail.com',
    to: 'Jamievos100@gmail.com',
    subject: `Nieuwe Offerteaanvraag: ${naam}`,
    html: `
      <h2>Nieuwe aanvraag via de website</h2>

      <h3>Klantgegevens:</h3>
      <ul>
        <li><strong>Naam:</strong> ${naam}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Telefoon:</strong> ${telefoon}</li>
        <li><strong>Type aanvraag:</strong> ${doel}</li>
        <li><strong>Bedrijf:</strong> ${bedrijf || 'Niet opgegeven'}</li>
      </ul>

      <h3>Locatie:</h3>
      <ul>
        <li><strong>Adres:</strong> ${adres}</li>
        <li><strong>Postcode:</strong> ${postcode}</li>
        <li><strong>Gemeente:</strong> ${gemeente}</li>
      </ul>

      <h3>Gewenste diensten:</h3>
      <ul>${dienstenLijstHtml}</ul>

      <h3>Extra opmerkingen:</h3>
      <p>${bericht || 'Geen extra opmerkingen.'}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Fout bij verzenden:', error);
      return res.status(500).send({ success: false, error: error.toString() });
    }
    console.log('Email succesvol verzonden!');
    res.status(200).send({ success: true, message: 'Email verzonden!' });
  });
});

// Server starten
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
