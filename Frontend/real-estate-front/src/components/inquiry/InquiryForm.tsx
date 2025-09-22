import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import {
  Send as SendIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { inquiryService } from "../../services/inquiryService";
import { useAuth } from "../../contexts/AuthContext";
import type { InquiryCreate } from "../../types/inquiry";
import { getUserFullName } from "../../utils/helpers";
import { useLanguage } from "../../contexts/LanguageContext";

interface InquiryFormProps {
  propertyId: string;
  propertyTitle: string;
  onSuccess?: () => void;
}

// Оновлена схема валідації відповідно до API документації
const schema = yup.object({
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
  name: yup.string().when("$isAuthenticated", {
    is: false,
    then: (schema) =>
      schema
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
    otherwise: (schema) => schema.optional(),
  }),
  email: yup.string().when("$isAuthenticated", {
    is: false,
    then: (schema) =>
      schema.email("Invalid email format").required("Email is required"),
    otherwise: (schema) => schema.optional(),
  }),
  phone: yup.string().optional(),
});

export const InquiryForm: React.FC<InquiryFormProps> = ({
  propertyId,
  propertyTitle,
  onSuccess,
}) => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const queryClient = useQueryClient();

  // Форм-значення не включають propertyId (він передається окремо)
  type InquiryFormValues = Omit<InquiryCreate, "propertyId">;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: yupResolver(schema),
    context: { isAuthenticated }, // Контекст для умовної валідації
    defaultValues: {
      message: "",
      // Для автентифікованих користувачів не заповнюємо name/email/phone
      // Для анонімних - заповнюємо з user даних або порожні
      name: isAuthenticated ? undefined : user ? getUserFullName(user) : "",
      email: isAuthenticated ? undefined : user?.email || "",
      phone: isAuthenticated ? undefined : user?.phoneNumber || "",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: (data: InquiryCreate) => inquiryService.createInquiry(data),
    onSuccess: (created) => {
      toast.success(t("inquiries.reply_sent"));
      // Optimistic cache update for "sent" list
      if (user?.id) {
        queryClient.setQueryData(
          ["inquiries", "my", user.id],
          (
            old:
              | { sent?: InquiryCreate[]; received?: InquiryCreate[] }
              | undefined
          ) => {
            if (!old) return old;
            return {
              sent: [created, ...(old.sent || [])],
              received: old.received || [],
            };
          }
        );
        // Also trigger server refetch when available
        queryClient.invalidateQueries({ queryKey: ["inquiries", "my"] });
      }
      setIsSubmitted(true);
      reset();
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || t("inquiries.load.failed");
      toast.error(message);
    },
  });

  const onSubmit = (data: InquiryFormValues) => {
    const inquiryData: InquiryCreate = {
      propertyId,
      message: data.message,
      // Для автентифікованих користувачів не передаємо name/email/phone
      // Для анонімних - передаємо тільки якщо заповнені
      ...(isAuthenticated
        ? {}
        : {
            name: data.name,
            email: data.email,
            phone: data.phone,
          }),
    };
    createInquiryMutation.mutate(inquiryData);
  };

  if (isSubmitted) {
    return (
      <Card sx={{ p: 3 }}>
        <Box sx={{ textAlign: "center" }}>
          <SendIcon sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
          <Typography variant="h6" color="success.main" gutterBottom>
            {t("inquiries.form.sent.title")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t("inquiries.form.sent.desc")}
          </Typography>
          <Button variant="outlined" onClick={() => setIsSubmitted(false)}>
            {t("inquiries.form.sent.again")}
          </Button>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t("inquiries.form.title")}
        </Typography>
        <Chip
          label={propertyTitle}
          color="primary"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary">
          {t("inquiries.form.description")}
        </Typography>
      </Box>

      {!isAuthenticated && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {t("inquiries.form.info.anonymous")}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Показуємо поля name/email/phone тільки для анонімних користувачів */}
          {!isAuthenticated && (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("inquiries.form.name")}
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputProps={{
                        startAdornment: (
                          <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("inquiries.form.email")}
                      type="email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("inquiries.form.phone")}
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      InputProps={{
                        startAdornment: (
                          <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("inquiries.form.message")}
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  placeholder={t("inquiries.form.placeholder")}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={
                createInquiryMutation.isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              disabled={createInquiryMutation.isPending}
              sx={{
                py: 1.5,
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-1px)",
                },
              }}
            >
              {createInquiryMutation.isPending
                ? t("inquiries.form.sending")
                : t("inquiries.send")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};
