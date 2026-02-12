export type CompanySnapshot = {
  id?: string;
  name: string;
  logoUrl?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  gst?: string | null;
  signatory?: string | null;
  signatureUrl?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  defaultFont?: string | null;
};

export type EditorVariable = "{{recipient_name}}" | "{{date}}" | "{{reference_no}}";
