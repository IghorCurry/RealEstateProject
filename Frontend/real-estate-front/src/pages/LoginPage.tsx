import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Link,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { authService } from '../services/authService';
import { ROUTES } from '../utils/constants';
import { isValidEmail } from '../utils/helpers';
import { FormField, PageContainer } from '../components';

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email')
    .test('is-valid-email', 'Please enter a valid email', (value) => 
      value ? isValidEmail(value) : false
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Password is required'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response) => {
      // Save auth data to localStorage
      authService.setAuthData(response);
      toast.success('Login successful! Welcome back!');
      navigate(ROUTES.HOME);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
    },
  });

  // Handle form field changes
  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
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

  // Handle demo login
  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demo123',
    });
    loginMutation.mutate({
      email: 'demo@example.com',
      password: 'demo123',
    });
  };

  return (
    <PageContainer fullHeight>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to your account to continue
            </Typography>
          </Box>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              {/* Email Field */}
              <FormField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                icon={<EmailIcon color="action" />}
                sx={{ mb: 3 }}
              />

              {/* Password Field */}
              <FormField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                error={!!errors.password}
                helperText={errors.password}
                icon={<LockIcon color="action" />}
                endIcon={
                  <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    sx={{ minWidth: 'auto', p: 0 }}
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
                'Sign In'
              )}
            </Button>

            {/* Demo Login Button */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleDemoLogin}
              disabled={loginMutation.isPending}
              sx={{ mb: 3 }}
            >
              Try Demo Account
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Register Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to={ROUTES.REGISTER}
                  sx={{ textDecoration: 'none', fontWeight: 600 }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                href="#"
                sx={{ textDecoration: 'none', fontWeight: 500 }}
                onClick={(e) => {
                  e.preventDefault();
                  toast.success('Password reset functionality coming soon!');
                }}
              >
                Forgot your password?
              </Link>
            </Box>
          </form>
        </Paper>

        {/* Demo Account Info */}
        <Box sx={{ textAlign: 'center', mt: 3, position: 'absolute', bottom: 20 }}>
          <Typography variant="caption" color="text.secondary">
            Demo Account: demo@example.com / demo123
          </Typography>
        </Box>
      </Box>
    </PageContainer>
  );
}; 