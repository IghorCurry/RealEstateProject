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
      toast.success("Inquiry deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete inquiry");
    },
  });

  const handleDeleteInquiry = (inquiryId: string) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      deleteInquiryMutation.mutate(inquiryId);
    }
  };

  const handleReplyClick = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyDialogOpen(true);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    toast.success("Reply sent successfully!");
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
          Failed to load inquiries. Please try again.
        </Alert>
        <Button variant="contained" onClick={() => navigate(ROUTES.HOME)}>
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Please sign in to view your inquiries.
        </Alert>
        <Button variant="contained" onClick={() => navigate(ROUTES.LOGIN)}>
          Sign In
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 4, overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ overflow: "hidden" }}>
        <SectionHeader
          title={isAdmin ? "All Inquiries" : "My Inquiries"}
          subtitle={
            isAdmin
              ? "Manage property inquiries from users"
              : "Track your property inquiries"
          }
        />

        {inquiries.length === 0 ? (
          <Card sx={{ p: 4, textAlign: "center" }}>
            <MessageIcon
              sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {isAdmin ? "No inquiries yet" : "No inquiries sent yet"}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {isAdmin
                ? "When users send inquiries about properties, they will appear here."
                : "Start browsing properties and send inquiries to see them here."}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate(ROUTES.PROPERTIES)}
            >
              Browse Properties
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
                          label={getPropertyTitle(inquiry.propertyId)}
                          color="primary"
                          size="small"
                          onClick={() =>
                            navigate(`/properties/${inquiry.propertyId}`)
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
          <DialogTitle>Reply to {selectedInquiry?.name}</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Contact: {selectedInquiry?.email} | {selectedInquiry?.phone}
              </Typography>
            </Box>
            <TextField
              label="Reply Message"
              multiline
              rows={4}
              fullWidth
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply message..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReplyDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSendReply}
              variant="contained"
              startIcon={<ReplyIcon />}
            >
              Send Reply
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};
