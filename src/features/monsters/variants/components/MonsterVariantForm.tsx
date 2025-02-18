import ComboboxSingleIdId from "@/components/combobox/ComboboxSingleId";
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
import { axiosClient } from "@/queries/axiosClient";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components, paths } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type MonsterVariantFormFetchedData = {
  monsters: Data<
    paths["/monsters"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type MonsterVariantFormFields = {
  name: string;
  monsterId: number;
};

const MonsterVariantFormContent = ({
  form,
}: {
  form: UseFormReturn<MonsterVariantFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<MonsterVariantFormFetchedData>({
      queryKey: [queryKeys.monsterVariantForm],
      queryFn: async (): Promise<MonsterVariantFormFetchedData> => {
        try {
          const monstersResponse = await axiosClient.get<
            Data<
              paths["/monsters"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/monsters");
          return { monsters: monstersResponse.data };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.message);
          } else {
            console.error(error);
            throw new Error(
              "An unexpected error occurred while fetching data for form."
            );
          }
        }
      },
    });

  // Reset the form after data is fetched so defaults show up
  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [form, isSuccess]);

  // Render skeleton/error here
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!isSuccess) {
    return (
      <div>
        <p>There was a problem fetching the data.</p>
      </div>
    );
  }

  // Render the form
  const { monsters } = data;

  return (
    <>
      {/* Monster Variant Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Monster Variant Name" {...field} />
            </FormControl>
            <FormDescription>The name of the variant.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Monster Id */}
      <ComboboxSingleIdId
        form={form}
        data={monsters.data}
        fieldName="monsterId"
        label="Monster"
        description="Id of the monster this is a variant of."
      />
    </>
  );
};

export function CreateMonsterVariantForm() {
  const form = useForm<MonsterVariantFormFields>({
    resolver: zodResolver(schemas.CreateMonsterVariantDtoSchema),
    defaultValues: {
      name: "",
      monsterId: 0,
    },
  });

  return (
    <FeatureForm<MonsterVariantFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/monsters/variants`}
      queryKey={queryKeys.monsterVariants}
      recordLabel="Monster Variant"
    >
      <MonsterVariantFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateMonsterVariantForm({
  record,
}: {
  record: components["schemas"]["MonsterVariantEntity"];
}) {
  const form = useForm<MonsterVariantFormFields>({
    resolver: zodResolver(schemas.UpdateMonsterVariantDtoSchema),
    defaultValues: {
      name: record.name,
      monsterId: record.monsterId,
    },
  });

  return (
    <FeatureForm<MonsterVariantFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/monsters/variants`}
      queryKey={queryKeys.monsterVariants}
      recordLabel="Monster Variant"
    >
      <MonsterVariantFormContent form={form} />
    </FeatureForm>
  );
}
