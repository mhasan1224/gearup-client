
import type { EquipmentCategory } from "@/types/equipment";

export interface EquipmentCategoryConfig {
  id: EquipmentCategory;
  title: string;
  description: string;
  icon: string;
}

export const equipmentCategories: EquipmentCategoryConfig[] = [
  {
    id: "construction",
    title: "Construction Equipment",
    description: "Equipment for building and construction projects.",
    icon: "hard-hat",
  },
  {
    id: "photography",
    title: "Photography Equipment",
    description: "Cameras and professional photography equipment.",
    icon: "camera",
  },
  {
    id: "vehicles",
    title: "Vehicles & Transportation",
    description: "Vehicles and transportation equipment.",
    icon: "truck",
  },
  {
    id: "agriculture",
    title: "Agriculture Equipment",
    description: "Tools and machinery for agricultural work.",
    icon: "tractor",
  },
  {
    id: "electronics",
    title: "Electronics",
    description: "Electronic devices and professional equipment.",
    icon: "laptop",
  },
  {
    id: "events",
    title: "Event Equipment",
    description: "Equipment for events and special occasions.",
    icon: "party-popper",
  },
];
