import ComboboxIds from "@/components/combobox/ComboboxIds";
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

type CraftingRecipeFormFetchedData = {
  resourceVariants: Data<
    paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  miscItems: Data<
    paths["/items/misc"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  consumableVariants: Data<
    paths["/items/consumables/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  weaponVariants: Data<
    paths["/items/weapons/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
  armorVariants: Data<
    paths["/items/armors/variants"]["get"]["responses"]["200"]["content"]["application/json"]
  >;
};

type CraftingRecipeFormFields = {
  name: string;
  inputResourceVariantIds: number[];
  removeInputResourceVariantIds: number[];
  inputItemIds: number[];
  removeInputItemIds: number[];
  outputConsumableVariantId: number | null;
  outputWeaponVariantId: number | null;
  outputArmorVariantId: number | null;
};

const CraftingRecipeFormContent = ({
  form,
}: {
  form: UseFormReturn<CraftingRecipeFormFields>;
}) => {
  const { isLoading, isSuccess, error, data } =
    useQuery<CraftingRecipeFormFetchedData>({
      queryKey: [queryKeys.craftingRecipeForm],
      queryFn: async (): Promise<CraftingRecipeFormFetchedData> => {
        try {
          const resourceVariantsResponse = await axiosClient.get<
            Data<
              paths["/items/resources/variants"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/resources/variants");

          const miscItemsResponse = await axiosClient.get<
            Data<
              paths["/items/misc"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/misc");

          const consumableVariantsResponse = await axiosClient.get<
            Data<
              paths["/items/consumables/variants"]["get"]["responses"]["200"]["content"]["application/json"]
            >
          >("/items/consumables/variants");

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

          return {
            resourceVariants: resourceVariantsResponse.data,
            miscItems: miscItemsResponse.data,
            consumableVariants: consumableVariantsResponse.data,
            weaponVariants: weaponVariantsResponse.data,
            armorVariants: armorVariantsResponse.data,
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
    resourceVariants,
    miscItems,
    consumableVariants,
    weaponVariants,
    armorVariants,
  } = data;

  return (
    <>
      {/* Room Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Recipe Name" {...field} />
            </FormControl>
            <FormDescription>The name of the recipe.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Input Resource Variant Ids */}
      <ComboboxIds
        form={form}
        data={resourceVariants.data}
        description="Id's of resource variants used in this recipe."
        fieldName="inputResourceVariantIds"
        removeFieldName="removeInputResourceVariantIds"
        label="Resource Variants"
      />
      {/* Input Misc Item Ids */}
      <ComboboxIds
        form={form}
        data={miscItems.data}
        description="Id's of misc items used in this recipe."
        fieldName="inputItemIds"
        removeFieldName="removeInputItemIds"
        label="Input Misc Items"
      />
      {/* Output Consumable Variant Id */}
      <ComboboxSingleIdId
        form={form}
        data={consumableVariants.data}
        description="Id of consumable variant created by this recipe."
        fieldName="outputConsumableVariantId"
        label="Consumable Variant"
        nullable
      />
      {/* Output Weapon Variant Id */}
      <ComboboxSingleIdId
        form={form}
        data={weaponVariants.data}
        description="Id of weapon variant created by this recipe."
        fieldName="outputWeaponVariantId"
        label="Weapon Variant"
        nullable
      />
      {/* Output Armor Variant Id */}
      <ComboboxSingleIdId
        form={form}
        data={armorVariants.data}
        description="Id of armor variant created by this recipe."
        fieldName="outputArmorVariantId"
        label="Armor Variant"
        nullable
      />
    </>
  );
};

export function CreateCraftingRecipeForm() {
  const form = useForm<CraftingRecipeFormFields>({
    resolver: zodResolver(schemas.CreateCraftingRecipeDtoSchema),
    defaultValues: {
      name: "",
      inputResourceVariantIds: [],
      removeInputResourceVariantIds: [],
      inputItemIds: [],
      removeInputItemIds: [],
      outputConsumableVariantId: null,
      outputWeaponVariantId: null,
      outputArmorVariantId: null,
    },
  });

  return (
    <FeatureForm<CraftingRecipeFormFields>
      form={form}
      method="POST"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/recipes`}
      queryKey={queryKeys.craftingRecipes}
      recordLabel="Crafting Recipe"
    >
      <CraftingRecipeFormContent form={form} />
    </FeatureForm>
  );
}

export function UpdateCraftingRecipeForm({
  record,
}: {
  record: components["schemas"]["CraftingRecipeEntity"];
}) {
  const form = useForm<CraftingRecipeFormFields>({
    resolver: zodResolver(schemas.UpdateCraftingRecipeDtoSchema),
    defaultValues: {
      name: record.name,
      inputResourceVariantIds: record.inputResourceVariants.map(
        (variant) => variant.id
      ),
      removeInputResourceVariantIds: [],
      inputItemIds: record.inputItems.map((item) => item.id),
      removeInputItemIds: [],
      outputConsumableVariantId: record.outputConsumableVariantId,
      outputWeaponVariantId: record.outputWeaponVariantId,
      outputArmorVariantId: record.outputArmorVariantId,
    },
  });

  return (
    <FeatureForm<CraftingRecipeFormFields>
      form={form}
      method="PATCH"
      url={`${import.meta.env.VITE_API_URL}/skills/crafting/recipes`}
      queryKey={queryKeys.craftingRecipes}
      recordLabel="Crafting Recipe"
    >
      <CraftingRecipeFormContent form={form} />
    </FeatureForm>
  );
}
