const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = path.join(__dirname, "techmunda.db");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database at", DB_PATH);
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      service TEXT,
      project TEXT,
      message TEXT,
      type TEXT,
      projectType TEXT,
      budget TEXT,
      timeline TEXT,
      topic TEXT,
      preferredTime TEXT,
      description TEXT,
      created_at TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Failed to create inquiries table:", err.message);
      } else {
        console.log("Ensured inquiries table exists.");
        // Add new columns if they don't exist (for existing databases)
        db.run(`ALTER TABLE inquiries ADD COLUMN company TEXT`, () => {});
        db.run(`ALTER TABLE inquiries ADD COLUMN type TEXT`, () => {});
        db.run(`ALTER TABLE inquiries ADD COLUMN projectType TEXT`, () => {});
        db.run(`ALTER TABLE inquiries ADD COLUMN budget TEXT`, () => {});
        db.run(`ALTER TABLE inquiries ADD COLUMN timeline TEXT`, () => {});
        db.run(`ALTER TABLE inquiries ADD COLUMN topic TEXT`, () => {});
        db.run(`ALTER TABLE inquiries ADD COLUMN preferredTime TEXT`, () => {});
        db.run(`ALTER TABLE inquiries ADD COLUMN description TEXT`, () => {});
      }
    }
  );
});

function addInquiry(payload, callback) {
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
  } = payload;
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(
    `INSERT INTO inquiries (
      name, email, phone, company, service, project, message, type,
      projectType, budget, timeline, topic, preferredTime, description, created_at
    )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  stmt.run(
    name,
    email,
    phone || null,
    company || null,
    service || null,
    project || null,
    message || null,
    type || null,
    projectType || null,
    budget || null,
    timeline || null,
    topic || null,
    preferredTime || null,
    description || null,
    createdAt,
    function (err) {
      stmt.finalize();
      if (err) {
        callback(err);
      } else {
        callback(null, { id: this.lastID, created_at: createdAt });
      }
    }
  );
}

function listInquiries(callback) {
  db.all(
    `SELECT id, name, email, phone, company, service, project, message, type,
            projectType, budget, timeline, topic, preferredTime, description, created_at
     FROM inquiries
     ORDER BY created_at DESC`,
    callback
  );
}

module.exports = {
  addInquiry,
  listInquiries,
};


