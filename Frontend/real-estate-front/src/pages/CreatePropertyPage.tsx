import React from "react";
import { Container } from "@mui/material";
import { CreatePropertyForm } from "../components/property/CreatePropertyForm";
import { SectionHeader } from "../components/common/SectionHeader";
import { useLanguage } from "../contexts/LanguageContext";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";

export const CreatePropertyPage: React.FC = () => {
  const breadcrumbItems = useBreadcrumbs();
  const { t } = useLanguage();

  return (
    <Container maxWidth="lg" sx={{ py: 4, overflow: "hidden" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <SectionHeader
        title={t("createProperty.header.title")}
        subtitle={t("createProperty.header.subtitle")}
      />
      <CreatePropertyForm />
    </Container>
  );
};
