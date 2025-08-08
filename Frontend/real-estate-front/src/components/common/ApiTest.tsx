import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { apiClient } from "../../services/api";

export const ApiTest: React.FC = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  const testBackendConnection = async () => {
    setStatus("loading");
    setMessage("Testing backend connection...");

    try {
      // First, test if the backend is reachable with a simple GET request
      const healthCheck = await fetch("http://localhost:5158/api/auth/login", {
        method: "GET",
      });

      if (healthCheck.status === 405) {
        // Method not allowed is expected for GET on login endpoint
        setStatus("success");
        setMessage(
          "✅ Backend is connected! (405 Method Not Allowed is expected for GET on login endpoint)"
        );
        return;
      }

      // Test with POST and invalid credentials
      const response = await fetch("http://localhost:5158/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "test123",
        }),
      });

      const responseText = await response.text();
      console.log("Backend response:", response.status, responseText);

      if (response.ok) {
        setStatus("success");
        setMessage("✅ Backend is connected and responding!");
      } else if (response.status === 400) {
        setStatus("success");
        setMessage(
          "✅ Backend is connected! (400 error expected for invalid credentials)"
        );
      } else if (response.status === 500) {
        setStatus("error");
        setMessage(
          `❌ Backend server error (500). Check backend logs for details. Response: ${responseText.substring(
            0,
            100
          )}...`
        );
      } else {
        setStatus("error");
        setMessage(
          `❌ Backend responded with status: ${
            response.status
          }. Response: ${responseText.substring(0, 100)}...`
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        `❌ Failed to connect to backend: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const testWithAdminCredentials = async () => {
    setStatus("loading");
    setMessage("Testing with admin credentials...");

    try {
      const response = await fetch("http://localhost:5158/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@gmail.com",
          password: "AyA(U8=Fs8h7",
        }),
      });

      const responseText = await response.text();
      console.log("Admin login response:", response.status, responseText);

      if (response.ok) {
        setStatus("success");
        setMessage("✅ Admin login successful! Backend is working perfectly!");
      } else {
        setStatus("error");
        setMessage(
          `❌ Admin login failed: ${
            response.status
          }. Response: ${responseText.substring(0, 100)}...`
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        `❌ Failed to test admin login: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Backend Integration Test
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={testBackendConnection}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>

        <Button
          variant="outlined"
          onClick={testWithAdminCredentials}
          disabled={status === "loading"}
        >
          Test Admin Login
        </Button>
      </Box>

      {status !== "idle" && (
        <Alert
          severity={
            status === "success"
              ? "success"
              : status === "error"
              ? "error"
              : "info"
          }
        >
          {message}
        </Alert>
      )}

      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        Test 1: Basic connection test
        <br />
        Test 2: Admin login with real credentials
      </Typography>
    </Box>
  );
};
