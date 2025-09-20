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
  Fade,
  Container,
  Alert,
} from "@mui/material";
import {
  Home as HomeIcon,
  Message as MessageIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { userService } from "../services/userService";
import { LoadingState } from "../components/common/LoadingState";
import { EmptyState } from "../components/common/EmptyState";
import { formatDate, getUserFullName, getInitials } from "../utils/helpers";
import { ROUTES } from "../utils/constants";
import { SectionHeader } from "../components";
import { useLanguage } from "../contexts/LanguageContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [tabValue, setTabValue] = useState(0);
  const { t } = useLanguage();

  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    enabled: isAdmin,
  });

  if (!isAdmin) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{t("adminPage.accessDenied")}</Alert>
      </Container>
    );
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const adminFeatures = [
    {
      title: t("adminPage.features.manageProperties.title"),
      description: t("adminPage.features.manageProperties.description"),
      icon: <BusinessIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      action: () => navigate(ROUTES.PROPERTIES),
    },
    {
      title: t("adminPage.features.manageInquiries.title"),
      description: t("adminPage.features.manageInquiries.description"),
      icon: <MessageIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      action: () => navigate(ROUTES.INQUIRIES),
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", py: 4, overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ overflow: "hidden" }}>
        <SectionHeader
          title={t("adminPage.header.title")}
          subtitle={t("adminPage.header.subtitle")}
        />

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="admin tabs"
          >
            <Tab label={t("adminPage.tabs.dashboard")} />
            <Tab label={t("adminPage.tabs.users")} />
          </Tabs>
        </Box>

        {/* Dashboard Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {adminFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                  onClick={feature.action}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {feature.description}
                    </Typography>
                    <Button variant="outlined" size="small">
                      {t("adminPage.actions.access")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate(ROUTES.HOME)}
            >
              {t("adminPage.actions.backHome")}
            </Button>
          </Box>
        </TabPanel>

        {/* Users Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {t("adminPage.users.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("adminPage.users.subtitle", { count: users.length })}
            </Typography>
          </Box>

          {usersLoading ? (
            <LoadingState type="properties" count={6} />
          ) : usersError ? (
            <Alert severity="error">{t("adminPage.users.loadError")}</Alert>
          ) : users.length === 0 ? (
            <EmptyState
              title={t("adminPage.users.empty.title")}
              description={t("adminPage.users.empty.description")}
              variant="properties"
            />
          ) : (
            <Grid container spacing={3}>
              {users.map((userItem) => (
                <Grid item xs={12} sm={6} md={4} key={userItem.id}>
                  <Fade in={true} timeout={300}>
                    <Card
                      sx={{
                        height: "100%",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              bgcolor:
                                userItem.role === "Admin"
                                  ? "secondary.main"
                                  : "primary.main",
                            }}
                          >
                            {getInitials(userItem)}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {getUserFullName(userItem)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {userItem.email}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Chip
                            icon={
                              userItem.role === "Admin" ? (
                                <AdminIcon />
                              ) : (
                                <PersonIcon />
                              )
                            }
                            label={userItem.role}
                            color={
                              userItem.role === "Admin"
                                ? "secondary"
                                : "primary"
                            }
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          {userItem.id === user?.id && (
                            <Chip
                              label={t("adminPage.userCard.current")}
                              color="success"
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {t("adminPage.userCard.phone")}{" "}
                          {userItem.phoneNumber ||
                            t("adminPage.userCard.notProvided")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t("adminPage.userCard.joined")}{" "}
                          {formatDate(userItem.createdAt)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
      </Container>
    </Box>
  );
};
