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
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { t } = useLanguage();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [inquiryIdToDelete, setInquiryIdToDelete] = useState<string | null>(
    null
  );

  const {
    data: myInquiries,
    isLoading,
    error,
  } = useQuery<{ sent: Inquiry[]; received: Inquiry[] } | Inquiry[]>({
    queryKey: isAdmin
      ? ["inquiries", "admin", "all"]
      : ["inquiries", "my", user?.id],
    queryFn: () =>
      isAdmin ? inquiryService.getAll() : inquiryService.getMyInquiries(),
    enabled: isAuthenticated && !!user?.id,
  });

  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: () => propertyService.getAll(),
    enabled: isAdmin,
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: (inquiryId: string) => inquiryService.deleteInquiry(inquiryId),
    onMutate: async (inquiryId: string) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["inquiries", "my", user?.id] }),
        queryClient.cancelQueries({ queryKey: ["inquiries", "admin", "all"] }),
      ]);
      const previous = queryClient.getQueryData(["inquiries", "my", user?.id]);

      const updater = (
        data: { sent?: Inquiry[]; received?: Inquiry[] } | Inquiry[] | undefined
      ) => {
        if (!data) return data;
        if (Array.isArray(data)) {
          return data.filter((i) => i.id !== inquiryId);
        }
        return {
          sent: (data.sent || []).filter((i) => i.id !== inquiryId),
          received: (data.received || []).filter((i) => i.id !== inquiryId),
        };
      };

      if (isAdmin) {
        queryClient.setQueryData(
          ["inquiries", "admin", "all"],
          updater as unknown as Inquiry[]
        );
      } else {
        queryClient.setQueryData(
          ["inquiries", "my", user?.id],
          updater as unknown as
            | { sent?: Inquiry[]; received?: Inquiry[] }
            | Inquiry[]
        );
      }
      return { previous } as {
        previous:
          | { sent?: Inquiry[]; received?: Inquiry[] }
          | Inquiry[]
          | undefined;
      };
    },
    onError: (err: unknown, _id, context) => {
      if (context?.previous) {
        if (isAdmin) {
          queryClient.setQueryData(
            ["inquiries", "admin", "all"],
            context.previous
          );
        } else {
          queryClient.setQueryData(
            ["inquiries", "my", user?.id],
            context.previous
          );
        }
      }
      const status =
        (err as { statusCode?: number; response?: { status?: number } })
          ?.statusCode ||
        (err as { statusCode?: number; response?: { status?: number } })
          ?.response?.status;
      toast.error(
        status === 403
          ? t("inquiries.toasts.delete.forbidden")
          : t("inquiries.toasts.delete.failed")
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["inquiries", "my", user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["inquiries", "admin", "all"],
      });
    },
    onSuccess: () => {
      toast.success(t("inquiries.toasts.delete.success"));
    },
  });

  const handleDeleteInquiry = (inquiryId: string) => {
    setInquiryIdToDelete(inquiryId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (inquiryIdToDelete) {
      deleteInquiryMutation.mutate(inquiryIdToDelete);
    }
    setDeleteDialogOpen(false);
    setInquiryIdToDelete(null);
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

        {(() => {
          if (isAdmin) {
            const adminCount = Array.isArray(myInquiries)
              ? (myInquiries as Inquiry[]).length
              : 0;
            return adminCount === 0;
          }
          const sentLen =
            (myInquiries as { sent?: Inquiry[]; received?: Inquiry[] })?.sent
              ?.length || 0;
          const receivedLen =
            (myInquiries as { sent?: Inquiry[]; received?: Inquiry[] })
              ?.received?.length || 0;
          return sentLen + receivedLen === 0;
        })() ? (
          <Card sx={{ p: 4, textAlign: "center" }}>
            <MessageIcon
              sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t("inquiries.empty.title")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {t("inquiries.empty.description")}
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
            {/* Sent */}
            {!isAdmin &&
              ((myInquiries as { sent?: Inquiry[] })?.sent || []).map(
                (inquiry: Inquiry) => (
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
                              {/* Sent: show property owner and title */}
                              {inquiry.propertyTitle
                                ? `${inquiry.propertyOwnerName || ""} • ${
                                    inquiry.propertyTitle
                                  }`.trim()
                                : user?.firstName + " " + user?.lastName}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                              {inquiry.email && inquiry.email !== "string" && (
                                <Chip
                                  icon={<EmailIcon />}
                                  label={inquiry.email}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                              {inquiry.phone && inquiry.phone !== "string" && (
                                <Chip
                                  icon={<PhoneIcon />}
                                  label={inquiry.phone}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Chip
                              label={t("inquiries.direction.sent")}
                              color="success"
                              size="small"
                              variant="outlined"
                            />
                            {isAdmin && (
                              <IconButton
                                size="small"
                                onClick={() => handleReplyClick(inquiry)}
                                color="primary"
                              >
                                <ReplyIcon />
                              </IconButton>
                            )}
                            {(isAdmin ||
                              inquiry.userId === user?.id ||
                              inquiry.propertyOwnerId === user?.id) && (
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteInquiry(inquiry.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
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
                                navigate(
                                  `/properties/${inquiry.propertyId || ""}`
                                )
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
                )
              )}

            {/* Received (admin also can see all) */}
            {isAdmin
              ? (Array.isArray(myInquiries)
                  ? (myInquiries as Inquiry[])
                  : []
                ).map((inquiry: Inquiry) => (
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
                              {/* Received: show sender's name */}
                              {inquiry.senderName &&
                              inquiry.senderName !== "string"
                                ? inquiry.senderName
                                : t("inquiries.anonymous")}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                              {inquiry.email && inquiry.email !== "string" && (
                                <Chip
                                  icon={<EmailIcon />}
                                  label={inquiry.email}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                              {inquiry.phone && inquiry.phone !== "string" && (
                                <Chip
                                  icon={<PhoneIcon />}
                                  label={inquiry.phone}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Chip
                              label={t("inquiries.direction.received")}
                              color="info"
                              size="small"
                              variant="outlined"
                            />
                            {(isAdmin ||
                              inquiry.userId === user?.id ||
                              inquiry.propertyOwnerId === user?.id) && (
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteInquiry(inquiry.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>
                        </Box>

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
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : ((myInquiries as { received?: Inquiry[] })?.received || []).map(
                  (inquiry: Inquiry) => (
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
                              <Chip
                                label={t("inquiries.direction.received")}
                                color="info"
                                size="small"
                                variant="outlined"
                              />
                              {(isAdmin ||
                                inquiry.userId === user?.id ||
                                inquiry.propertyOwnerId === user?.id) && (
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() =>
                                    handleDeleteInquiry(inquiry.id)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </Box>
                          </Box>

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
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Sent on {formatDate(inquiry.createdAt)}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                )}
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

        {/* Delete confirm */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>{t("dialogs.confirm.title")}</DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              {t("dialogs.confirm.delete")}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              {t("dialogs.cancel")}
            </Button>
            <Button color="error" variant="contained" onClick={confirmDelete}>
              {t("dialogs.delete")}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};
