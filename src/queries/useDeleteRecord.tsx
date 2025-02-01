import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function useDeleteRecord({
  redirectPath,
  url,
  queryKeyName,
}: {
  redirectPath: string;
  url: string;
  queryKeyName: string;
}) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const authHeaderValue = `Bearer ${token ?? ""}`;

  return useMutation({
    mutationFn: async (recordToDeleteId: string | number) => {
      const response = await fetch(`${url}/${recordToDeleteId.toString()}`, {
        method: "DELETE",
        headers: {
          Authorization: authHeaderValue,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await queryClient.resetQueries({ queryKey: `all-${queryKeyName}` });

      await navigate(redirectPath);
    },
  });
}
