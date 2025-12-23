const path = require("path");
const express = require("express");
const cors = require("cors");
const { addInquiry, listInquiries } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (front-end)
app.use(express.static(path.join(__dirname)));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Save a new inquiry
app.post("/api/inquiries", (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    service,
    project,
    message,
    type,
    projectType,
    budget,
    timeline,
    topic,
    preferredTime,
    description,
  } = req.body || {};

  // Validation based on form type
  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required.",
    });
  }

  // For contact form, project is required
  if (!type && !project && !description && !message) {
    return res.status(400).json({
      error: "Project details or message is required.",
    });
  }

  // For consultation form, message is required
  if (type === "free_consultation" && !message) {
    return res.status(400).json({
      error: "Please describe your challenge or goal.",
    });
  }

  // For project form, description is required
  if (type === "project_discussion" && !description) {
    return res.status(400).json({
      error: "Project description is required.",
    });
  }

  addInquiry(
    {
      name,
      email,
      phone,
      company,
      service,
      project,
      message,
      type,
      projectType,
      budget,
      timeline,
      topic,
      preferredTime,
      description,
    },
    (err, result) => {
      if (err) {
        console.error("Error saving inquiry:", err);
        return res.status(500).json({ error: "Failed to save inquiry." });
      }
      return res.status(201).json({
        message: "Inquiry saved successfully.",
        id: result.id,
        created_at: result.created_at,
      });
    }
  );
});

// List inquiries (simple JSON view for you; protect in production)
app.get("/api/inquiries", (req, res) => {
  listInquiries((err, rows) => {
    if (err) {
      console.error("Error fetching inquiries:", err);
      return res.status(500).json({ error: "Failed to fetch inquiries." });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`TechMunda server listening on http://localhost:${PORT}`);
});


