import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Person as PersonIcon,
  Home as HomeIcon,
  Message as MessageIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { propertyService } from "../services/propertyService";
import { inquiryService } from "../services/inquiryService";
import { useFavorites } from "../hooks/useFavorites";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { ROUTES } from "../utils/constants";
import { formatDate, getUserFullName } from "../utils/helpers";
import {
  LoadingState,
  EmptyState,
  FormField,
  PageContainer,
  TabPanel,
} from "../components";
import { PropertyCard } from "../components/property/PropertyCard";

import type { User } from "../types/user";
import type { Property } from "../types/property";

// Validation schema for profile update
const profileUpdateSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  phoneNumber: yup.string().required("Phone number is required"),
});

type ProfileUpdateData = yup.InferType<typeof profileUpdateSchema>;

export const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<ProfileUpdateData>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Використовуємо useAuth замість authService для централізованого стану авторизації
  const { user, logout, updateUser } = useAuth();

  // Використовуємо хук для улюблених
  const { favorites, isLoadingFavorites, refetchFavorites } = useFavorites();
  const favoritesList = favorites as Property[];

  // Fetch user's properties
  const { data: userProperties = [], isLoading: propertiesLoading } = useQuery({
    queryKey: ["user-properties", user?.id],
    queryFn: () =>
      user ? propertyService.getByUserId(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  // Fetch user's inquiries
  const { data: userInquiries = [], isLoading: inquiriesLoading } = useQuery({
    queryKey: ["user-inquiries", user?.id],
    queryFn: () => inquiryService.getUserInquiries(),
    enabled: !!user,
  });

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileUpdateData) => {
      // For now, simulate API call
      return new Promise<User>((resolve) => {
        setTimeout(() => {
          const updatedUser: User = {
            ...user!,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            updatedAt: new Date().toISOString(),
          };
          resolve(updatedUser);
        }, 1000);
      });
    },
    onSuccess: (updatedUser) => {
      // Update global auth state + storage
      updateUser(updatedUser);
      // Refresh dependent data
      queryClient.invalidateQueries({ queryKey: ["user-properties"] });
      queryClient.invalidateQueries({ queryKey: ["user-inquiries"] });
      // Close dialog and notify
      setEditDialogOpen(false);
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (user) {
      setEditForm({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
      setEditDialogOpen(true);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate form data
      await profileUpdateSchema.validate(editForm, { abortEarly: false });

      // Clear any existing errors
      setErrors({});

      // Submit profile update
      updateProfileMutation.mutate(editForm);
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

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  if (!user) {
    return (
      <PageContainer>
        <Alert severity="error">User not found</Alert>
      </PageContainer>
    );
  }

  return (
    <ProtectedRoute>
      <PageContainer>
        {/* Profile Header */}
        <Card sx={{ mb: 3, overflow: "hidden" }}>
          <CardContent sx={{ overflow: "hidden" }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "primary.main",
                    fontSize: "2rem",
                  }}
                >
                  {getUserFullName(user).charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    wordBreak: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {getUserFullName(user)}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Member since {formatDate(user.createdAt)}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    icon={<PersonIcon />}
                    label={user.role}
                    color={user.role === "Admin" ? "error" : "primary"}
                    variant="outlined"
                  />
                  <Chip
                    icon={<HomeIcon />}
                    label={`${userProperties.length} Properties`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<MessageIcon />}
                    label={`${userInquiries.length} Inquiries`}
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEditToggle}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
            >
              <Tab
                label="Overview"
                icon={<PersonIcon />}
                iconPosition="start"
              />
              <Tab
                label="My Properties"
                icon={<HomeIcon />}
                iconPosition="start"
              />
              <Tab
                label="My Inquiries"
                icon={<MessageIcon />}
                iconPosition="start"
              />
              <Tab
                label="Favorites"
                icon={<FavoriteIcon />}
                iconPosition="start"
              />
              <Tab
                label="Settings"
                icon={<SettingsIcon />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* Overview Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Personal Information
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">{user.email}</Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          {user.phoneNumber}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          Joined {formatDate(user.createdAt)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Account Statistics
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <HomeIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          {userProperties.length} Properties Listed
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <MessageIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          {userInquiries.length} Inquiries Sent
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          Role: {user.role}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* My Properties Tab */}
          <TabPanel value={tabValue} index={1}>
            {propertiesLoading ? (
              <LoadingState type="properties" count={4} />
            ) : userProperties.length > 0 ? (
              <Grid container spacing={3} sx={{ p: 3 }}>
                {userProperties.map((property) => (
                  <Grid item xs={12} sm={6} md={4} key={property.id}>
                    <Box sx={{ height: "100%" }}>
                      <PropertyCard
                        property={property}
                        showOwnerActions={true}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyState
                title="No properties listed yet"
                description="Start by creating your first property listing."
                actionLabel="Add Property"
                onAction={() => navigate(ROUTES.CREATE_PROPERTY)}
              />
            )}
          </TabPanel>

          {/* My Inquiries Tab */}
          <TabPanel value={tabValue} index={2}>
            {inquiriesLoading ? (
              <LoadingState type="properties" count={5} />
            ) : userInquiries.length > 0 ? (
              <List sx={{ p: 0 }}>
                {userInquiries.map((inquiry) => (
                  <React.Fragment key={inquiry.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <MessageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={inquiry.message}
                        secondary={`Sent on ${formatDate(inquiry.createdAt)}`}
                      />
                      <Chip label="Sent" color="success" size="small" />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <EmptyState
                title="No inquiries sent yet"
                description="Start by browsing properties and sending inquiries to property owners."
                actionLabel="Browse Properties"
                onAction={() => navigate(ROUTES.PROPERTIES)}
              />
            )}
          </TabPanel>

          {/* Favorites Tab */}
          <TabPanel value={tabValue} index={3}>
            {isLoadingFavorites ? (
              <LoadingState type="properties" count={4} />
            ) : favoritesList.length > 0 ? (
              <Grid container spacing={3} sx={{ p: 3 }}>
                {favoritesList.map((property: Property) => (
                  <Grid item xs={12} sm={6} md={4} key={property.id}>
                    <Box sx={{ height: "100%" }}>
                      <PropertyCard
                        property={property}
                        showOwnerActions={false}
                        onFavoriteToggle={refetchFavorites}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyState
                title="No favorites yet"
                description="Start browsing properties and add them to your favorites to see them here."
                actionLabel="Browse Properties"
                onAction={() => navigate(ROUTES.PROPERTIES)}
              />
            )}
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel value={tabValue} index={4}>
            <EmptyState
              title="Account settings functionality coming soon!"
              description="You'll be able to manage your account settings and preferences here."
              actionLabel="Edit Profile"
              onAction={handleEditToggle}
            />
          </TabPanel>
        </Card>

        {/* Edit Profile Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Edit Profile
            <IconButton
              aria-label="close"
              onClick={() => setEditDialogOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CancelIcon />
            </IconButton>
          </DialogTitle>
          <form onSubmit={handleProfileUpdate}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormField
                    label="First Name"
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    label="Last Name"
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    label="Email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    label="Phone Number"
                    value={editForm.phoneNumber}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    required
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  updateProfileMutation.isPending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SaveIcon />
                  )
                }
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </PageContainer>
    </ProtectedRoute>
  );
};
