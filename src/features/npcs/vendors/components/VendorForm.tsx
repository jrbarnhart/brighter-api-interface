import ComboboxIds from "@/components/combobox/ComboboxIds";
import ComboboxSingleIdId from "@/components/combobox/ComboboxSingleId";
import FeatureForm from "@/components/featureForm/FeatureForm";
import queryKeys from "@/lib/queryKeys";
import { axiosClient } from "@/queries/axiosClient";
import { schemas } from "@/schemas/openapi-zod-schemas";
import { components, paths } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type VendorFormFetchedData = {
  npcs: Data<
    paths["/npcs"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  resourceVariants: Data<
    paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  weaponVariants: Data<
    paths["/items/weapons/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  armorVariants: Data<
    paths["/items/armors/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  consumableVariants: Data<
    paths["/items/consumables/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  miscItems: Data<
    paths["/items/misc"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type VendorFormFields = {
  npcId: number;
  resourceVariantIds: number[];
  weaponVariantIds: number[];
  armorVariantIds: number[];
  consumableVariantIds: number[];
  miscItemIds: number[];
  removeResourceVariantIds: number[];
  removeWeaponVariantIds: number[];
  removeArmorVariantIds: number[];
  removeConsumableVariantIds: number[];
  removeMiscItemIds: number[];
};

const VendorFormContent = ({
  form,
  record,
}: {
  form: UseFormReturn<VendorFormFields>;
  record?: components["schemas"]["VendorEntity"];
}) => {
  const { isLoading, isSuccess, error, data } = useQuery<VendorFormFetchedData>(
    {
      queryKey: [queryKeys.vendorForm],
      queryFn: async (): Promise<VendorFormFetchedData> => {
        try {
          const npcsResponse = await axiosClient.get<
            Data<
              paths["/npcs"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/npcs");

          const resourceVariantsResponse = await axiosClient.get<
            Data<
              paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/resources/variants");

          const weaponVariantsResponse = await axiosClient.get<
            Data<
              paths["/items/weapons/variants"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/weapons/variants");

          const armorVariantsResponse = await axiosClient.get<
            Data<
              paths["/items/armors/variants"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/armors/variants");

          const consumableVariantsResponse = await axiosClient.get<
            Data<
              paths["/items/consumables/variants"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/consumables/variants");

          const miscItemsResponse = await axiosClient.get<
            Data<
              paths["/items/misc"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/misc");

          return {
            npcs: npcsResponse.data,
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
    }
  );

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
    npcs,
    resourceVariants,
    weaponVariants,
    armorVariants,
    consumableVariants,
    miscItems,
  } = data;

  return (
    <>
      {/* Npc Id */}
      <ComboboxSingleIdId
        form={form}
        data={npcs.data.filter((d) => !d.vendor || d.vendor.id === record?.id)}
        fieldName="npcId"
        label="Npc"
        description="Id of the npc that is this vendor."
      />
      {/* Resource Variants */}
      <ComboboxIds
        form={form}
        data={resourceVariants.data}
        fieldName="resourceVariantIds"
        removeFieldName="removeResourceVariantIds"
        label="Resource Variants"
        description="The ids of the resource variants this vendor deals in."
      />
      {/* Weapon Variants */}
      <ComboboxIds
        form={form}
        data={weaponVariants.data}
        fieldName="weaponVariantIds"
        removeFieldName="removeWeaponVariantIds"
        label="Weapon Variants"
        description="The ids of the weapon variants this vendor deals in."
      />
      {/* Armor Variants */}
      <ComboboxIds
        form={form}
        data={armorVariants.data}
        fieldName="armorVariantIds"
        removeFieldName="removeArmorVariantIds"
        label="Armor Variants"
        description="The ids of the armor variants this vendor deals in."
      />
      {/* Consumable Variants */}
      <ComboboxIds
        form={form}
        data={consumableVariants.data}
        fieldName="consumableVariantIds"
        removeFieldName="removeConsumableVariantIds"
        label="Consumable Variants"
        description="The ids of the consumable variants this vendor deals in."
      />
      {/* Misc Items */}
      <ComboboxIds
        form={form}
        data={miscItems.data}
        fieldName="miscItemIds"
        removeFieldName="removeMiscItemIds"
        label="Misc Items"
        description="The ids of the misc items this vendor deals in."
      />
    </>
  );
};

export function CreateVendorForm() {
  const form = useForm<VendorFormFields>({
    resolver: zodResolver(schemas.CreateVendorDtoSchema),
    defaultValues: {
      npcId: 0,
      resourceVariantIds: [],
      weaponVariantIds: [],
      armorVariantIds: [],
      consumableVariantIds: [],
      miscItemIds: [],
      removeResourceVariantIds: [],
      removeWeaponVariantIds: [],
      removeArmorVariantIds: [],
      removeConsumableVariantIds: [],
      removeMiscItemIds: [],
    },
  });

  return (
    <FeatureForm<VendorFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/npcs/vendors`}
      queryKey={queryKeys.vendors}
      recordLabel="Vendor"
    >
      <VendorFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateVendorForm({
  record,
}: {
  record: components["schemas"]["VendorEntity"];
}) {
  const form = useForm<VendorFormFields>({
    resolver: zodResolver(schemas.UpdateVendorDtoSchema),
    defaultValues: {
      npcId: record.npcId,
      resourceVariantIds: record.resourceVariants.map((v) => v.id),
      weaponVariantIds: record.weaponVariants.map((v) => v.id),
      armorVariantIds: record.armorVariants.map((v) => v.id),
      consumableVariantIds: record.consumableVariants.map((v) => v.id),
      miscItemIds: record.miscItems.map((i) => i.id),
      removeResourceVariantIds: [],
      removeWeaponVariantIds: [],
      removeArmorVariantIds: [],
      removeConsumableVariantIds: [],
      removeMiscItemIds: [],
    },
  });

  return (
    <FeatureForm<VendorFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/npcs/vendors`}
      queryKey={queryKeys.vendors}
      recordLabel="Vendor"
    >
      <VendorFormContent form={form} record={record} />
    </FeatureForm>
  );
}
