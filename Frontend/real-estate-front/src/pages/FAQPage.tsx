import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Fade,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import { SectionHeader } from "../components/common/SectionHeader";
import { useLanguage } from "../contexts/LanguageContext";

const faqItems = [
  {
    questionKey: "faq.search.title",
    answerKey: "faq.search.answer",
  },
  {
    questionKey: "faq.account.title",
    answerKey: "faq.account.answer",
  },
  {
    questionKey: "faq.list.title",
    answerKey: "faq.list.answer",
  },
  {
    questionKey: "faq.favorites.title",
    answerKey: "faq.favorites.answer",
  },
  {
    questionKey: "faq.contact.title",
    answerKey: "faq.contact.answer",
  },
  {
    questionKey: "faq.payment.title",
    answerKey: "faq.payment.answer",
  },
];

export const FAQPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ minHeight: "100vh", py: 2, overflow: "hidden" }}>
      <Container maxWidth="md" sx={{ overflow: "hidden" }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <HelpIcon
              sx={{
                fontSize: 60,
                color: "primary.main",
                mb: 2,
              }}
            />
            <SectionHeader
              title={t("faq.title")}
              subtitle={t("faq.subtitle")}
              variant="page"
            />
          </Box>
        </Box>

        {/* FAQ Items */}
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          {faqItems.map((item, index) => (
            <Fade in={true} timeout={800 + index * 200} key={index}>
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: theme.shadows[2],
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                  },
                  "&:before": {
                    display: "none",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 3,
                    py: 2,
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    {t(item.questionKey)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    px: 3,
                    pb: 3,
                    pt: 0,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: "1rem",
                    }}
                  >
                    {t(item.answerKey)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Fade>
          ))}
        </Box>

        {/* Contact Support */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Fade in={true} timeout={1200}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                bgcolor: "grey.50",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "text.primary",
                }}
              >
                {t("faq.contact.support.title")}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {t("faq.contact.support.description")}
              </Typography>
              <Typography
                variant="body2"
                color="primary.main"
                sx={{
                  fontWeight: 600,
                }}
              >
                {t("faq.contact.support.email")}
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};
