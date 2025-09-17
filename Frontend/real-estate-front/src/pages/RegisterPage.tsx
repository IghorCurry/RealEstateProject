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
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import * as yup from "yup";

import { authService } from "../services/authService";
import { ROUTES } from "../utils/constants";
import { isValidEmail, isValidPhone, getUserFullName } from "../utils/helpers";
import { FormField, PageContainer } from "../components";
import { useAuth } from "../contexts/AuthContext";

// Validation schema
const registerSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .matches(/^[\p{L}\s]+$/u, "First name can contain only letters and spaces"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .matches(/^[\p{L}\s]+$/u, "Last name can contain only letters and spaces"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .max(50, "Email must be at most 50 characters")
    .test("is-valid-email", "Please enter a valid email", (value) =>
      value ? isValidEmail(value) : false
    ),
  phone: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Phone must be in format +380XXXXXXXXX", (value) =>
      value ? isValidPhone(value) : false
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
      "Password must include uppercase, lowercase, number and special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) =>
      authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phone,
        password: data.password,
      }),
    onSuccess: (response) => {
      // Використовуємо дані з API відповіді для встановлення користувача
      authService.setAuthData(response);
      // Оновлюємо контекст аутентифікації
      setUser(response.user);
      toast.success(
        `Registration successful! Welcome to Real Estate, ${getUserFullName(
          response.user
        )}!`
      );
      navigate(ROUTES.HOME);
    },
    onError: (error: unknown) => {
      const apiMessage = (
        error as {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        }
      )?.response?.data?.message;
      const fieldErrors = (
        error as { response?: { data?: { errors?: Record<string, string[]> } } }
      )?.response?.data?.errors;

      if (fieldErrors) {
        const firstField = Object.keys(fieldErrors)[0];
        const firstMsg = fieldErrors[firstField]?.[0];
        toast.error(
          firstMsg || "Registration failed. Please check your input."
        );
        return;
      }

      const message =
        apiMessage ||
        "Registration failed. Ensure: unique email, +380XXXXXXXXX phone, and strong password.";
      toast.error(message);
    },
  });

  // Handle form field changes
  const handleInputChange =
    (field: keyof RegisterFormData) =>
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
      await registerSchema.validate(formData, { abortEarly: false });

      // Clear any existing errors
      setErrors({});

      // Submit registration
      registerMutation.mutate(formData);
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
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
            maxWidth: 500,
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
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join us and start your real estate journey
            </Typography>
          </Box>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              {/* Name Fields */}
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <FormField
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  icon={<PersonIcon color="action" />}
                />
                <FormField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  icon={<PersonIcon color="action" />}
                />
              </Box>

              {/* Email Field */}
              <FormField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                icon={<EmailIcon color="action" />}
                sx={{ mb: 3 }}
              />

              {/* Phone Field */}
              <FormField
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                error={!!errors.phone}
                helperText={errors.phone}
                icon={<PhoneIcon color="action" />}
                sx={{ mb: 3 }}
              />

              {/* Password Field */}
              <FormField
                label="Password"
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

              {/* Confirm Password Field */}
              <FormField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                icon={<LockIcon color="action" />}
                endIcon={
                  <Button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    sx={{ minWidth: "auto", p: 0 }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
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
              disabled={registerMutation.isPending}
              sx={{ mb: 3 }}
            >
              {registerMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Login Link */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to={ROUTES.LOGIN}
                  sx={{ textDecoration: "none", fontWeight: 600 }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </PageContainer>
  );
};
