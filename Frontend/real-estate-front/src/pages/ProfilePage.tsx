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
import { useLanguage } from "../contexts/LanguageContext";
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
import type { Inquiry } from "../types/inquiry";

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
  const { t } = useLanguage();
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

  // Role helper
  const isAdmin = user?.role === "Admin";

  // Fetch inquiries (align with InquiriesPage)
  const { data: myInquiries, isLoading: inquiriesLoading } = useQuery<
    { sent: Inquiry[]; received: Inquiry[] } | Inquiry[]
  >({
    queryKey: ["inquiries", "my", user?.id],
    queryFn: () =>
      isAdmin ? inquiryService.getAll() : inquiryService.getMyInquiries(),
    enabled: !!user?.id,
  });

  const inquiriesCount = isAdmin
    ? (myInquiries as Inquiry[])?.length || 0
    : ((myInquiries as { sent?: Inquiry[]; received?: Inquiry[] })?.sent
        ?.length || 0) +
      ((myInquiries as { sent?: Inquiry[]; received?: Inquiry[] })?.received
        ?.length || 0);

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
      toast.success(t("profile.toasts.update.success"));
    },
    onError: () => {
      toast.error(t("profile.toasts.update.failed"));
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
        <Alert severity="error">{t("profile.userNotFound")}</Alert>
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
                  {t("profile.memberSince", {
                    date: formatDate(user.createdAt),
                  })}
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
                    label={t("profile.chips.properties", {
                      count: userProperties.length,
                    })}
                    variant="outlined"
                  />
                  <Chip
                    icon={<MessageIcon />}
                    label={t("profile.chips.inquiries", {
                      count: inquiriesCount,
                    })}
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
                    {t("profile.buttons.edit")}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                  >
                    {t("profile.buttons.logout")}
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
                label={t("profile.tabs.overview")}
                icon={<PersonIcon />}
                iconPosition="start"
              />
              <Tab
                label={t("profile.tabs.myProperties")}
                icon={<HomeIcon />}
                iconPosition="start"
              />
              <Tab
                label={t("profile.tabs.myInquiries")}
                icon={<MessageIcon />}
                iconPosition="start"
              />
              <Tab
                label={t("profile.tabs.favorites")}
                icon={<FavoriteIcon />}
                iconPosition="start"
              />
              <Tab
                label={t("profile.tabs.settings")}
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
                        {t("profile.info.personal")}
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
                          {t("profile.memberSince", {
                            date: formatDate(user.createdAt),
                          })}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {t("profile.info.stats")}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <HomeIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          {t("profile.stats.propertiesListed", {
                            count: userProperties.length,
                          })}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <MessageIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          {t("profile.stats.inquiriesSent", {
                            count: inquiriesCount,
                          })}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2">
                          {t("profile.role", { role: user.role })}
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
                title={t("profile.empty.properties.title")}
                description={t("profile.empty.properties.description")}
                actionLabel={t("profile.empty.properties.action")}
                onAction={() => navigate(ROUTES.CREATE_PROPERTY)}
              />
            )}
          </TabPanel>

          {/* My Inquiries Tab */}
          <TabPanel value={tabValue} index={2}>
            {inquiriesLoading ? (
              <LoadingState type="properties" count={5} />
            ) : isAdmin ? (
              ((myInquiries as Inquiry[]) || []).length > 0 ? (
                <List sx={{ p: 0 }}>
                  {(myInquiries as Inquiry[]).map((inquiry) => (
                    <React.Fragment key={inquiry.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            <MessageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={inquiry.message}
                          secondary={t("profile.inquiries.sentOn", {
                            date: formatDate(inquiry.createdAt),
                          })}
                        />
                        {(user?.role === "Admin" ||
                          inquiry.userId === user?.id ||
                          inquiry.propertyOwnerId === user?.id) && (
                          <Chip
                            label={t("inquiries.direction.received")}
                            size="small"
                            color="info"
                          />
                        )}
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <EmptyState
                  title={t("profile.empty.inquiries.title")}
                  description={t("profile.empty.inquiries.description")}
                  actionLabel={t("profile.empty.inquiries.action")}
                  onAction={() => navigate(ROUTES.PROPERTIES)}
                />
              )
            ) : ((myInquiries as { sent?: Inquiry[]; received?: Inquiry[] })
                ?.sent?.length || 0) +
                ((myInquiries as { sent?: Inquiry[]; received?: Inquiry[] })
                  ?.received?.length || 0) >
              0 ? (
              <List sx={{ p: 0 }}>
                {((myInquiries as { sent?: Inquiry[] })?.sent || []).map(
                  (inquiry) => (
                    <React.Fragment key={inquiry.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            <MessageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={inquiry.message}
                          secondary={t("profile.inquiries.sentOn", {
                            date: formatDate(inquiry.createdAt),
                          })}
                        />
                        <Chip
                          label={t("profile.inquiries.sent")}
                          color="success"
                          size="small"
                        />
                        {(user?.role === "Admin" ||
                          inquiry.userId === user?.id ||
                          (inquiry as Inquiry).propertyOwnerId ===
                            user?.id) && (
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              inquiryService
                                .deleteInquiry(inquiry.id)
                                .then(() => {
                                  queryClient.invalidateQueries({
                                    queryKey: ["inquiries", "my", user?.id],
                                  });
                                })
                            }
                          >
                            <LogoutIcon sx={{ display: "none" }} />
                          </IconButton>
                        )}
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  )
                )}
                {(
                  (myInquiries as { received?: Inquiry[] })?.received || []
                ).map((inquiry) => (
                  <React.Fragment key={inquiry.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <MessageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={inquiry.message}
                        secondary={t("profile.inquiries.sentOn", {
                          date: formatDate(inquiry.createdAt),
                        })}
                      />
                      <Chip
                        label={t("inquiries.direction.received")}
                        color="info"
                        size="small"
                      />
                      {(user?.role === "Admin" ||
                        (inquiry as Inquiry).userId === user?.id ||
                        (inquiry as Inquiry).propertyOwnerId === user?.id) && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            inquiryService
                              .deleteInquiry(inquiry.id)
                              .then(() => {
                                queryClient.invalidateQueries({
                                  queryKey: ["inquiries", "my", user?.id],
                                });
                              })
                          }
                        >
                          <LogoutIcon sx={{ display: "none" }} />
                        </IconButton>
                      )}
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <EmptyState
                title={t("profile.empty.inquiries.title")}
                description={t("profile.empty.inquiries.description")}
                actionLabel={t("profile.empty.inquiries.action")}
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
                title={t("profile.empty.properties.title")}
                description={t("profile.empty.inquiries.description")}
                actionLabel={t("profile.empty.inquiries.action")}
                onAction={() => navigate(ROUTES.PROPERTIES)}
              />
            )}
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel value={tabValue} index={4}>
            <EmptyState
              title={t("profile.settings.soon.title")}
              description={t("profile.settings.soon.description")}
              actionLabel={t("profile.settings.soon.action")}
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
            {t("profile.dialog.editTitle")}
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
                    label={t("profile.form.firstName")}
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
                    label={t("profile.form.lastName")}
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
                    label={t("profile.form.email")}
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
                    label={t("profile.form.phone")}
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
              <Button onClick={() => setEditDialogOpen(false)}>
                {t("profile.dialog.cancel")}
              </Button>
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
                {updateProfileMutation.isPending
                  ? t("profile.dialog.saving")
                  : t("profile.dialog.save")}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </PageContainer>
    </ProtectedRoute>
  );
};
