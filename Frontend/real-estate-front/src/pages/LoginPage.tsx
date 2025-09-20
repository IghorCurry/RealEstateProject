import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Link,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useLanguage } from "../contexts/LanguageContext";

import { authService } from "../services/authService";
import { ROUTES } from "../utils/constants";
import { isValidEmail, getUserFullName } from "../utils/helpers";
import { FormField, PageContainer } from "../components";
import { useAuth } from "../contexts/AuthContext";

// Validation schema
let loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .test("is-valid-email", "Please enter a valid email", (value) =>
      value ? isValidEmail(value) : false
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(1, "Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response, variables) => {
      // Use AuthContext login function with original credentials
      login(variables.email, variables.password);
      toast.success(
        t("auth.login.success", { name: getUserFullName(response.user) })
      );

      // Navigate to intended destination or home
      const from = location.state?.from?.pathname || ROUTES.HOME;
      navigate(from);
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || t("auth.login.failed");
      toast.error(message);
    },
  });

  // Handle form field changes
  const handleInputChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      // Rebuild localized validation schema (не змінюючи логіку коду)
      loginSchema = yup.object({
        email: yup
          .string()
          .required(t("validation.auth.email.required"))
          .email(t("validation.auth.email.format"))
          .test("is-valid-email", t("validation.auth.email.format"), (value) =>
            value ? isValidEmail(value) : false
          ),
        password: yup
          .string()
          .required(t("validation.auth.password.required"))
          .min(1, t("validation.auth.password.required")),
      });

      await loginSchema.validate(formData, { abortEarly: false });

      // Clear any existing errors
      setErrors({});

      // Submit login
      loginMutation.mutate(formData);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle demo admin login
  const handleDemoAdminLogin = () => {
    const demoCredentials = {
      email: "admin@gmail.com",
      password: "AyA(U8=Fs8h7",
    };

    setFormData(demoCredentials);

    // Clear any existing errors
    setErrors({});

    // Submit demo login
    loginMutation.mutate(demoCredentials);
  };

  // Handle demo user login
  const handleDemoUserLogin = () => {
    const demoCredentials = {
      email: "user1@gmail.com",
      password: "PassUser1",
    };

    setFormData(demoCredentials);

    // Clear any existing errors
    setErrors({});

    // Submit demo login
    loginMutation.mutate(demoCredentials);
  };

  return (
    <PageContainer fullHeight>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            width: "100%",
            maxWidth: 400,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {t("auth.login.title")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t("auth.login.subtitle")}
            </Typography>
          </Box>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              {/* Email Field */}
              <FormField
                label={t("auth.login.email")}
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                icon={<EmailIcon color="action" />}
                sx={{ mb: 3 }}
              />

              {/* Password Field */}
              <FormField
                label={t("auth.login.password")}
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                error={!!errors.password}
                helperText={errors.password}
                icon={<LockIcon color="action" />}
                endIcon={
                  <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    sx={{ minWidth: "auto", p: 0 }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                }
                sx={{ mb: 3 }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loginMutation.isPending}
              sx={{ mb: 3 }}
            >
              {loginMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("auth.login.submit")
              )}
            </Button>

            {/* Demo Login Buttons */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleDemoAdminLogin}
                disabled={loginMutation.isPending}
                sx={{ flex: 1 }}
              >
                {t("auth.login.demoAdmin")}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleDemoUserLogin}
                disabled={loginMutation.isPending}
                sx={{ flex: 1 }}
              >
                {t("auth.login.demoUser")}
              </Button>
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Register Link */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                {t("auth.login.no.account")}{" "}
                <Link
                  component={RouterLink}
                  to={ROUTES.REGISTER}
                  sx={{ textDecoration: "none", fontWeight: 600 }}
                >
                  {t("auth.register.title")}
                </Link>
              </Typography>
            </Box>

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link
                href="#"
                sx={{ textDecoration: "none", fontWeight: 500 }}
                onClick={(e) => {
                  e.preventDefault();
                  toast.success(t("toasts.login.resetSoon"));
                }}
              >
                {t("auth.login.forgot")}
              </Link>
            </Box>
          </form>
        </Paper>

        {/* Demo Account Info */}
        <Box
          sx={{ textAlign: "center", mt: 3, position: "absolute", bottom: 20 }}
        >
        </Box>
      </Box>
    </PageContainer>
  );
};
