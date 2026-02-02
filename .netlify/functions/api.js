// Netlify serverless function for API
const { addInquiry, listInquiries } = require("../../db");

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  const path = event.path.replace("/.netlify/functions/api", "");

  // Health check
  if (path === "/health" && event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "ok" }),
    };
  }

  // Save inquiry
  if (path === "/inquiries" && event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body);
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
      } = body;

      if (!name || !email) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Name and email are required." }),
        };
      }

      return new Promise((resolve) => {
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
              resolve({
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: "Failed to save inquiry." }),
              });
            } else {
              resolve({
                statusCode: 201,
                headers,
                body: JSON.stringify({
                  message: "Inquiry saved successfully.",
                  id: result.id,
                  created_at: result.created_at,
                }),
              });
            }
          }
        );
      });
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid request body." }),
      };
    }
  }

  // List inquiries
  if (path === "/inquiries" && event.httpMethod === "GET") {
    return new Promise((resolve) => {
      listInquiries((err, rows) => {
        if (err) {
          resolve({
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to fetch inquiries." }),
          });
        } else {
          resolve({
            statusCode: 200,
            headers,
            body: JSON.stringify(rows),
          });
        }
      });
    });
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: "Not found" }),
  };
};

