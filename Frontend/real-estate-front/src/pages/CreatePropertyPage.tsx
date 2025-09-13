import React from "react";
import { Container } from "@mui/material";
import { CreatePropertyForm } from "../components/property/CreatePropertyForm";
import { SectionHeader } from "../components/common/SectionHeader";
import { Breadcrumbs, useBreadcrumbs } from "../components/common/Breadcrumbs";

export const CreatePropertyPage: React.FC = () => {
  const breadcrumbItems = useBreadcrumbs();

  return (
    <Container maxWidth="lg" sx={{ py: 4, overflow: "hidden" }}>
      <Breadcrumbs items={breadcrumbItems} />
      <SectionHeader
        title="Create Property"
        subtitle="Add a new property to our listings"
      />
      <CreatePropertyForm />
    </Container>
  );
};
