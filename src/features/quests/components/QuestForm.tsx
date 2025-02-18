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

type QuestFormFields = {
  name: string;
};

const QuestFormContent = ({
  form,
}: {
  form: UseFormReturn<QuestFormFields>;
}) => {
  return (
    <>
      {/* Quest Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Quest Name" {...field} />
            </FormControl>
            <FormDescription>The name of the quest.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export function CreateQuestForm() {
  const form = useForm<QuestFormFields>({
    resolver: zodResolver(schemas.CreateQuestDtoSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <FeatureForm<QuestFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/quests`}
      queryKey={queryKeys.quests}
      recordLabel="Quest"
    >
      <QuestFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateQuestForm({
  record,
}: {
  record: components["schemas"]["QuestEntity"];
}) {
  const form = useForm<QuestFormFields>({
    resolver: zodResolver(schemas.UpdateQuestDtoSchema),
    defaultValues: {
      name: record.name,
    },
  });

  return (
    <FeatureForm<QuestFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/quests`}
      queryKey={queryKeys.quests}
      recordLabel="Quest"
    >
      <QuestFormContent form={form} />
    </FeatureForm>
  );
}
