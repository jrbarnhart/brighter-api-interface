import { useForm, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FeatureForm from "@/components/featureForm/FeatureForm";
import { schemas } from "@/schemas/openapi-zod-schemas";
import ComboboxIds from "@/components/combobox/ComboboxIds";
import { useQuery } from "@tanstack/react-query";
import { components, paths } from "@/types/api";
import { axiosClient } from "@/queries/axiosClient";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import queryKeys from "@/lib/queryKeys";
import ComboboxSingleId from "@/components/combobox/ComboboxSingleId";

type DropTableFormFetchedData = {
  monsterVariants: paths["/monsters/variants"]["get"]["responses"]["200"]["content"]["application/json"];

  resourceVariants: paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"];

  weaponVariants: paths["/items/weapons/variants"]["get"]["responses"]["200"]["content"]["application/json"];

  armorVariants: paths["/items/armors/variants"]["get"]["responses"]["200"]["content"]["application/json"];

  consumableVariants: paths["/items/consumables/variants"]["get"]["responses"]["200"]["content"]["application/json"];

  miscItems: paths["/items/misc"]["get"]["responses"]["200"]["content"]["application/json"];
};

type DropTableFormFields = {
  monsterVariantId: number;
  resourceVariantIds: number[];
  weaponVariantIds: number[];
  armorVariantIds: number[];
  consumableVariantIds: number[];
  miscItemIds: number[];
  currency: number | null;
  removeResourceVariantIds: number[];
  removeWeaponVariantIds: number[];
  removeArmorVariantIds: number[];
  removeConsumableVariantIds: number[];
  removeMiscItemIds: number[];
};

const DropTableFormContent = ({
  form,
  record,
}: {
  form: UseFormReturn<DropTableFormFields>;
  record?: components["schemas"]["DropTableEntity"];
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<DropTableFormFetchedData>({
      queryKey: [queryKeys.dropTableForm],
      queryFn: async (): Promise<DropTableFormFetchedData> => {
        try {
          const monsterVariantsResponse = await axiosClient.get<
            paths["/monsters/variants"]["get"]["responses"]["200"]["content"]["application/json"]
          >("/monsters/variants");

          const resourceVariantsResponse = await axiosClient.get<
            paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"]
          >("/items/resources/variants");

          const weaponVariantsResponse = await axiosClient.get<
            paths["/items/weapons/variants"]["get"]["responses"]["200"]["content"]["application/json"]
          >("/items/weapons/variants");

          const armorVariantsResponse = await axiosClient.get<
            paths["/items/armors/variants"]["get"]["responses"]["200"]["content"]["application/json"]
          >("/items/armors/variants");

          const consumableVariantsResponse = await axiosClient.get<
            paths["/items/consumables/variants"]["get"]["responses"]["200"]["content"]["application/json"]
          >("/items/consumables/variants");

          const miscItemsResponse = await axiosClient.get<
            paths["/items/misc"]["get"]["responses"]["200"]["content"]["application/json"]
          >("/items/misc");

          return {
            monsterVariants: monsterVariantsResponse.data,
            resourceVariants: resourceVariantsResponse.data,
            weaponVariants: weaponVariantsResponse.data,
            armorVariants: armorVariantsResponse.data,
            consumableVariants: consumableVariantsResponse.data,
            miscItems: miscItemsResponse.data,
          };
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
  const {
    monsterVariants,
    weaponVariants,
    armorVariants,
    consumableVariants,
    resourceVariants,
    miscItems,
  } = data;

  return (
    <>
      {/* Monster Variant Id */}
      <ComboboxSingleId
        form={form}
        data={monsterVariants.filter(
          (monsterVariant) =>
            !monsterVariant.dropTable ||
            monsterVariant.id === record?.monsterVariantId
        )}
        fieldName="monsterVariantId"
        label="Monster Variant"
        description="Id of the monster variant this drop table belongs to."
      />
      {/* Resource Variant Ids */}
      <ComboboxIds
        form={form}
        data={resourceVariants}
        fieldName="resourceVariantIds"
        removeFieldName="removeResourceVariantIds"
        label="Resource Variants"
        description="Ids of resource variants in this drop table."
      />
      {/* Weapon Variant Ids */}
      <ComboboxIds
        form={form}
        data={weaponVariants}
        fieldName="weaponVariantIds"
        removeFieldName="removeWeaponVariantIds"
        label="Weapon Variants"
        description="Ids of weapon variants in this drop table."
      />
      {/* Armor Variant Ids */}
      <ComboboxIds
        form={form}
        data={armorVariants}
        fieldName="armorVariantIds"
        removeFieldName="removeArmorVariantIds"
        label="Armor Variants"
        description="Ids of armor variants in this drop table."
      />
      {/* Consumable Variant Ids */}
      <ComboboxIds
        form={form}
        data={consumableVariants}
        fieldName="consumableVariantIds"
        removeFieldName="removeConsumableVariantIds"
        label="Consumable Variants"
        description="Ids of consumable variants in this drop table."
      />
      {/* Misc Items */}
      <ComboboxIds
        form={form}
        data={miscItems}
        fieldName="miscItemIds"
        removeFieldName="removeMiscItemIds"
        label="Misc Items"
        description="Ids of misc items in this drop table."
      />
      {/* Currency */}
      <FormField
        control={form.control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Index</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Currency in bronze"
                min={0}
                {...field}
                value={
                  field.value === 0
                    ? ""
                    : field.value === null
                    ? ""
                    : field.value
                } // Show placeholder instead of 0
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  field.onChange(value);
                }}
              />
            </FormControl>
            <FormDescription>
              Index determines the order of step completion.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export function CreateDropTableForm() {
  const form = useForm<DropTableFormFields>({
    resolver: zodResolver(schemas.CreateDropTableDtoSchema),
    defaultValues: {
      monsterVariantId: 0,
      resourceVariantIds: [],
      weaponVariantIds: [],
      armorVariantIds: [],
      consumableVariantIds: [],
      miscItemIds: [],
      currency: null,
      removeResourceVariantIds: [],
      removeWeaponVariantIds: [],
      removeArmorVariantIds: [],
      removeConsumableVariantIds: [],
      removeMiscItemIds: [],
    },
  });

  return (
    <FeatureForm<DropTableFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/monsters/drop-tables`}
      queryKey={queryKeys.dropTables}
      recordLabel="Drop Table"
    >
      <DropTableFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateDropTableForm({
  record,
}: {
  record: components["schemas"]["DropTableEntity"];
}) {
  const form = useForm<DropTableFormFields>({
    resolver: zodResolver(schemas.UpdateDropTableDtoSchema),
    defaultValues: {
      monsterVariantId: record.monsterVariantId,
      resourceVariantIds: record.resourceVariants.map((v) => v.id),
      weaponVariantIds: record.weaponVariants.map((v) => v.id),
      armorVariantIds: record.armorVariants.map((v) => v.id),
      consumableVariantIds: record.consumableVariants.map((v) => v.id),
      miscItemIds: record.miscItems.map((i) => i.id),
      currency: record.currency,
      removeResourceVariantIds: [],
      removeWeaponVariantIds: [],
      removeArmorVariantIds: [],
      removeConsumableVariantIds: [],
      removeMiscItemIds: [],
    },
  });

  return (
    <FeatureForm<DropTableFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/monsters/drop-tables`}
      queryKey={queryKeys.dropTables}
      recordLabel="Drop Table"
    >
      <DropTableFormContent form={form} record={record} />
    </FeatureForm>
  );
}
