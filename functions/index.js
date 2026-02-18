import * as functions from "firebase-functions";
import nodemailer from "nodemailer";
import cors from "cors";

// Telenet transporter
const transporter = nodemailer.createTransport({
  host: "smtp.telenet.be",
  port: 587,
  secure: false,
  auth: {
    user: "luxcleaning@telenet.be",
    pass: "yljs uttz pzvl abut",
  },
});

// CORS handler
const corsHandler = cors({ origin: true });

// ES Module export
export const sendEmail = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).send({ success: false, message: "Only POST allowed" });
    }

    const {
      naam,
      email,
      telefoon,
      bedrijf,
      adres,
      postcode,
      gemeente,
      doel,
      diensten,
      bericht,
    } = req.body;

    const dienstenLijstHtml = diensten?.length ?
    diensten.map((d) => `<li>${d}</li>`).join("") :
    "<li>Geen specifieke diensten geselecteerd</li>";


    const mailOptions = {
      from: "luxcleaning@telenet.be",
      to: "luxcleaning@telenet.be",
      replyTo: email,
      subject: `Nieuwe Offerteaanvraag: ${naam}`,
      html: `
        <h2>Nieuwe aanvraag via de website</h2>
        <h3>Klantgegevens:</h3>
        <ul>
          <li><strong>Naam:</strong> ${naam}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telefoon:</strong> ${telefoon}</li>
          <li><strong>Type aanvraag:</strong> ${doel}</li>
          <li><strong>Bedrijf:</strong> ${bedrijf || "Niet opgegeven"}</li>
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
        <p>${bericht || "Geen extra opmerkingen."}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email succesvol verzonden!");
      return res.status(200).send({ success: true, message: "Email verzonden!" });
    } catch (error) {
      console.error("Fout bij verzenden:", error);
      return res.status(500).send({ success: false, error: error.toString() });
    }
  });
});
