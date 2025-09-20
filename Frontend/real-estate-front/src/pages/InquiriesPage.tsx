import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Message as MessageIcon,
  Reply as ReplyIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { inquiryService } from "../services/inquiryService";
import { propertyService } from "../services/propertyService";
import { SectionHeader } from "../components/common/SectionHeader";
import { ROUTES } from "../utils/constants";
import { formatDate } from "../utils/helpers";
import type { Inquiry } from "../types/inquiry";

export const InquiriesPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, isAdmin } = useAuth();
  const { t } = useLanguage();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const {
    data: inquiries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["inquiries", isAdmin ? "admin" : "user"],
    queryFn: () =>
      isAdmin ? inquiryService.getAll() : inquiryService.getUserInquiries(),
    enabled: isAuthenticated,
  });

  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: () => propertyService.getAll(),
    enabled: isAdmin,
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: (inquiryId: string) => inquiryService.deleteInquiry(inquiryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success(t("inquiries.toasts.delete.success"));
    },
    onError: () => {
      toast.error(t("inquiries.toasts.delete.failed"));
    },
  });

  const handleDeleteInquiry = (inquiryId: string) => {
    if (window.confirm(t("inquiries.confirm.delete"))) {
      deleteInquiryMutation.mutate(inquiryId);
    }
  };

  const handleReplyClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyDialogOpen(true);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error(t("inquiries.toasts.reply.empty"));
      return;
    }

    toast.success(t("inquiries.toasts.reply.sent"));
    setReplyDialogOpen(false);
    setReplyMessage("");
    setSelectedInquiry(null);
  };

  const getPropertyTitle = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    return property?.title || `Property ${propertyId}`;
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {t("inquiries.load.failed")}
        </Alert>
        <Button variant="contained" onClick={() => navigate(ROUTES.HOME)}>
          {t("notFound.actions.home")}
        </Button>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          {t("inquiries.auth.required")}
        </Alert>
        <Button variant="contained" onClick={() => navigate(ROUTES.LOGIN)}>
          {t("auth.login.submit")}
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 4, overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ overflow: "hidden" }}>
        <SectionHeader
          title={isAdmin ? t("inquiries.admin.title") : t("inquiries.title")}
          subtitle={
            isAdmin ? t("inquiries.admin.subtitle") : t("inquiries.subtitle")
          }
        />

        {inquiries.length === 0 ? (
          <Card sx={{ p: 4, textAlign: "center" }}>
            <MessageIcon
              sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {isAdmin
                ? t("inquiries.empty.title")
                : t("inquiries.empty.title")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {isAdmin
                ? t("inquiries.subtitle")
                : t("inquiries.empty.description")}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate(ROUTES.PROPERTIES)}
            >
              {t("inquiries.empty.browse")}
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {inquiries.map((inquiry) => (
              <Grid item xs={12} key={inquiry.id}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {inquiry.name}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                          <Chip
                            icon={<EmailIcon />}
                            label={inquiry.email}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            icon={<PhoneIcon />}
                            label={inquiry.phone}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {isAdmin && (
                          <IconButton
                            size="small"
                            onClick={() => handleReplyClick(inquiry)}
                            color="primary"
                          >
                            <ReplyIcon />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    {isAdmin && (
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          icon={<BusinessIcon />}
                          label={getPropertyTitle(inquiry.propertyId || "")}
                          color="primary"
                          size="small"
                          onClick={() =>
                            navigate(`/properties/${inquiry.propertyId || ""}`)
                          }
                          sx={{ cursor: "pointer" }}
                        />
                      </Box>
                    )}

                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {inquiry.message}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Sent on {formatDate(inquiry.createdAt)}
                      </Typography>
                      {isAdmin && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<ReplyIcon />}
                          onClick={() => handleReplyClick(inquiry)}
                        >
                          Reply
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Reply Dialog */}
        <Dialog
          open={replyDialogOpen}
          onClose={() => setReplyDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {t("inquiries.dialog.replyTo", {
              name: selectedInquiry?.name || "",
            })}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t("inquiries.dialog.contact")} {selectedInquiry?.email} |{" "}
                {selectedInquiry?.phone}
              </Typography>
            </Box>
            <TextField
              label={t("inquiries.dialog.messageLabel")}
              multiline
              rows={4}
              fullWidth
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={t("inquiries.dialog.messagePlaceholder")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReplyDialogOpen(false)}>
              {t("inquiries.dialog.cancel")}
            </Button>
            <Button
              onClick={handleSendReply}
              variant="contained"
              startIcon={<ReplyIcon />}
            >
              {t("inquiries.dialog.send")}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};
