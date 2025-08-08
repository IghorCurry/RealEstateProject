import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Home as HomeIcon,
  Message as MessageIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import * as yup from "yup";

import { authService } from "../services/authService";
import { propertyService } from "../services/propertyService";
import { inquiryService } from "../services/inquiryService";
import { PropertyCard } from "../components/property/PropertyCard";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { ROUTES } from "../utils/constants";
import { formatDate } from "../utils/helpers";
import {
  LoadingState,
  EmptyState,
  TabPanel,
  PageContainer,
  FormField,
} from "../components";
import type { User, UserUpdate } from "../types/user";

// Validation schema for profile update
const profileUpdateSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  phoneNumber: yup.string().required("Phone number is required"),
});

type ProfileUpdateData = yup.InferType<typeof profileUpdateSchema>;

export const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<ProfileUpdateData>({
    email: "",
    fullName: "",
    phoneNumber: "",
  });

  const user = authService.getStoredUser();

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
    queryFn: () => inquiryService.getInquiries(),
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
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            updatedAt: new Date().toISOString(),
          };
          resolve(updatedUser);
        }, 1000);
      });
    },
    onSuccess: (updatedUser) => {
      // Update stored user data
      localStorage.setItem("user", JSON.stringify(updatedUser));
      queryClient.invalidateQueries({ queryKey: ["user-properties"] });
      queryClient.invalidateQueries({ queryKey: ["user-inquiries"] });

      setEditMode(false);
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
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
      });
      setEditDialogOpen(true);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await profileUpdateSchema.validate(editForm, { abortEarly: false });
      updateProfileMutation.mutate(editForm);
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        toast.error(validationError.errors[0]);
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    toast.success("Logged out successfully");
    navigate(ROUTES.HOME);
  };

  if (!user) {
    return (
      <PageContainer>
        <Alert severity="error">User not found. Please log in again.</Alert>
      </PageContainer>
    );
  }

  return (
    <ProtectedRoute>
      <PageContainer>
        {/* Profile Header */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
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
                  {user.fullName.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {user.fullName}
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Personal Information
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            <EmailIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email" secondary={user.email} />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            <PhoneIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Phone"
                          secondary={user.phoneNumber}
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            <CalendarIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Member Since"
                          secondary={formatDate(user.createdAt)}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Account Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: "center", p: 2 }}>
                          <Typography
                            variant="h4"
                            color="primary"
                            sx={{ fontWeight: 700 }}
                          >
                            {userProperties.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Properties Listed
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: "center", p: 2 }}>
                          <Typography
                            variant="h4"
                            color="primary"
                            sx={{ fontWeight: 700 }}
                          >
                            {userInquiries.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Inquiries Sent
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* My Properties Tab */}
          <TabPanel value={tabValue} index={1}>
            {propertiesLoading ? (
              <LoadingState message="Loading properties..." />
            ) : userProperties.length > 0 ? (
              <Grid container spacing={3}>
                {userProperties.map((property) => (
                  <Grid item xs={12} sm={6} md={4} key={property.id}>
                    <PropertyCard
                      property={property}
                      onFavoriteToggle={() => {}}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyState
                title="No properties listed yet"
                description="Start by browsing our properties and listing your own."
                actionLabel="Browse Properties"
                onAction={() => navigate(ROUTES.PROPERTIES)}
              />
            )}
          </TabPanel>

          {/* My Inquiries Tab */}
          <TabPanel value={tabValue} index={2}>
            {inquiriesLoading ? (
              <LoadingState message="Loading inquiries..." />
            ) : userInquiries.length > 0 ? (
              <List>
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
                      <Chip
                        label={inquiry.status}
                        color={
                          inquiry.status === "Pending" ? "warning" : "success"
                        }
                        size="small"
                      />
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
            <EmptyState
              title="Favorite properties functionality coming soon!"
              description="You'll be able to save and manage your favorite properties here."
              actionLabel="Browse Properties"
              onAction={() => navigate(ROUTES.PROPERTIES)}
            />
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
                    label="Full Name"
                    value={editForm.fullName}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    required
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
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={updateProfileMutation.isPending}
                startIcon={
                  updateProfileMutation.isPending ? (
                    <CircularProgress size={20} />
                  ) : (
                    <SaveIcon />
                  )
                }
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
