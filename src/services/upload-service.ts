
import { apiRequest } from "@/lib/api-client";

export async function uploadEquipmentImage(
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const result = await apiRequest<{
    success: boolean;
    message: string;
    data: {
      image: string;
    };
  }>("uploads/equipment-image", {
    method: "POST",
    body: formData,
  });

  return result.data.image;
}
