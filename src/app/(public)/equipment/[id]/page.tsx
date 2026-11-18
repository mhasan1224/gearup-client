
import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/layout/public-layout";
import { equipmentData } from "@/data/equipment";
import { EquipmentDetails } from "@/components/equipment/equipment-details";

interface EquipmentDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EquipmentDetailsPage({
  params,
}: EquipmentDetailsPageProps) {
  const { id } = await params;

  const equipment = equipmentData.find((item) => item.id === id);

  if (!equipment) {
    notFound();
  }

  return (
    <PublicLayout>
      <EquipmentDetails equipment={equipment} />
    </PublicLayout>
  );
}
