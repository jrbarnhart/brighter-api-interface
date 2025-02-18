import FeatureForm from "@/components/featureForm/FeatureForm";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import queryKeys from "@/lib/queryKeys";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

type NpcFormFields = {
  name: string;
};

const NpcFormContent = ({ form }: { form: UseFormReturn<NpcFormFields> }) => {
  return (
    <>
      {/* Npc Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Npc Name" {...field} />
            </FormControl>
            <FormDescription>The name of the npc.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export function CreateNpcForm() {
  const form = useForm<NpcFormFields>({
    resolver: zodResolver(schemas.CreateNpcDtoSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <FeatureForm<NpcFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/npcs`}
      queryKey={queryKeys.npcs}
      recordLabel="Npc"
    >
      <NpcFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateNpcForm({
  record,
}: {
  record: components["schemas"]["NpcEntity"];
}) {
  const form = useForm<NpcFormFields>({
    resolver: zodResolver(schemas.UpdateNpcDtoSchema),
    defaultValues: {
      name: record.name,
    },
  });

  return (
    <FeatureForm<NpcFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/npcs`}
      queryKey={queryKeys.npcs}
      recordLabel="Npc"
    >
      <NpcFormContent form={form} />
    </FeatureForm>
  );
}
