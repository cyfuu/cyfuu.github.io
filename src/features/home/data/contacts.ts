import { Mail, Phone, MapPin } from "lucide-react";

export interface Contact {
  icon: typeof Mail | typeof Phone | typeof MapPin;
  label: string;
  value: string;
  copyable: boolean;
}

export const contacts: Contact[] = [
  { icon: Mail, label: "Email", value: "cyfuu.dev@gmail.com", copyable: true },
  { icon: Phone, label: "Phone", value: "+63 991 432 7202", copyable: true },
  { icon: MapPin, label: "Location", value: "Cebu, Philippines", copyable: false },
];