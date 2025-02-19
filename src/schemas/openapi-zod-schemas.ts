import { z } from "zod";

const SignInDto = z
  .object({ username: z.string(), password: z.string() })
  .passthrough();
const JwtEntity = z.object({ access_token: z.string() }).passthrough();
const CreateRegionDto = z
  .object({ name: z.string().min(1).max(256) })
  .passthrough();
const RegionBaseEntity = z
  .object({ id: z.number().gte(1), name: z.string().min(1).max(256) })
  .passthrough();
const RoomBaseEntity = z
  .object({
    banks: z.array(
      z.enum([
        "BONES",
        "BUILDING",
        "CAPES",
        "EXPLOSIVES",
        "BAIT",
        "HIDES",
        "INGREDIENTS",
        "LEATHERS",
        "LUMBER",
        "MONUMENT",
        "ORE",
        "REAGENTS",
        "POTIONS",
        "QUARTERMASTER",
        "STONE",
        "TIMBER",
      ])
    ),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    regionId: z.number().gte(1),
    portal: z.boolean(),
    obelisk: z.boolean(),
  })
  .passthrough();
const CombatSkillBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    regionId: z.number().gte(1),
  })
  .passthrough();
const GatheringSkillBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    regionId: z.number().gte(1),
  })
  .passthrough();
const CraftingSkillBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    regionId: z.number().gte(1),
  })
  .passthrough();
const RegionEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    rooms: z.array(RoomBaseEntity),
    combatSkills: z.array(CombatSkillBaseEntity),
    gatheringSkills: z.array(GatheringSkillBaseEntity),
    craftingSkills: z.array(CraftingSkillBaseEntity),
  })
  .passthrough();
const UpdateRegionDto = z
  .object({ name: z.string().min(1).max(256) })
  .partial()
  .passthrough();
const CreateRoomDto = z
  .object({
    banks: z
      .array(
        z.enum([
          "BONES",
          "BUILDING",
          "CAPES",
          "EXPLOSIVES",
          "BAIT",
          "HIDES",
          "INGREDIENTS",
          "LEATHERS",
          "LUMBER",
          "MONUMENT",
          "ORE",
          "REAGENTS",
          "POTIONS",
          "QUARTERMASTER",
          "STONE",
          "TIMBER",
        ])
      )
      .optional(),
    name: z.string().min(1).max(256),
    regionId: z.number().gte(1),
    portal: z.boolean(),
    obelisk: z.boolean(),
    craftingSkillIds: z.array(z.number().gte(1)).optional(),
    monsterIds: z.array(z.number().gte(1)).optional(),
    npcIds: z.array(z.number().gte(1)).optional(),
    resourceIds: z.array(z.number().gte(1)).optional(),
    questStepIds: z.array(z.number().gte(1)).optional(),
  })
  .passthrough();
const MonsterBaseEntity = z
  .object({
    attackElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    immuneElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    vulnerableElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1),
    passive: z.boolean(),
  })
  .passthrough();
const NpcBaseEntity = z
  .object({ id: z.number().gte(1), name: z.string().min(1).max(256) })
  .passthrough();
const ResourceBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1),
    passive: z.boolean(),
  })
  .passthrough();
const QuestStepBaseEntity = z
  .object({
    id: z.number().gte(1),
    index: z.number().gte(1),
    description: z.string().max(400),
    questId: z.number().gte(1),
    roomId: z.number().gte(1).nullable(),
    npcId: z.number().gte(1).nullable(),
  })
  .passthrough();
const RoomEntity = z
  .object({
    banks: z.array(
      z.enum([
        "BONES",
        "BUILDING",
        "CAPES",
        "EXPLOSIVES",
        "BAIT",
        "HIDES",
        "INGREDIENTS",
        "LEATHERS",
        "LUMBER",
        "MONUMENT",
        "ORE",
        "REAGENTS",
        "POTIONS",
        "QUARTERMASTER",
        "STONE",
        "TIMBER",
      ])
    ),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    region: RegionBaseEntity,
    regionId: z.number().gte(1),
    portal: z.boolean(),
    obelisk: z.boolean(),
    craftingSkills: z.array(CraftingSkillBaseEntity),
    monsters: z.array(MonsterBaseEntity),
    npcs: z.array(NpcBaseEntity),
    resources: z.array(ResourceBaseEntity),
    questSteps: z.array(QuestStepBaseEntity),
  })
  .passthrough();
const UpdateRoomDto = z
  .object({
    banks: z.array(
      z.enum([
        "BONES",
        "BUILDING",
        "CAPES",
        "EXPLOSIVES",
        "BAIT",
        "HIDES",
        "INGREDIENTS",
        "LEATHERS",
        "LUMBER",
        "MONUMENT",
        "ORE",
        "REAGENTS",
        "POTIONS",
        "QUARTERMASTER",
        "STONE",
        "TIMBER",
      ])
    ),
    name: z.string().min(1).max(256),
    regionId: z.number().gte(1),
    portal: z.boolean(),
    obelisk: z.boolean(),
    craftingSkillIds: z.array(z.number().gte(1)),
    monsterIds: z.array(z.number().gte(1)),
    npcIds: z.array(z.number().gte(1)),
    resourceIds: z.array(z.number().gte(1)),
    questStepIds: z.array(z.number().gte(1)),
    removeCraftingSkillIds: z.array(z.number().gte(1)),
    removeMonsterIds: z.array(z.number().gte(1)),
    removeNpcIds: z.array(z.number().gte(1)),
    removeResourceIds: z.array(z.number().gte(1)),
    removeQuestStepIds: z.array(z.number().gte(1)),
  })
  .partial()
  .passthrough();
const CreateGatheringSkillRequirementDto = z
  .object({
    skillId: z.number().gte(1),
    unlockLevel: z.number().gte(1),
    description: z.string().max(400).optional(),
    resourceVariantId: z.number().gte(1).nullish(),
  })
  .passthrough();
const GatheringSkillRequirementBaseEntity = z
  .object({
    id: z.number().gte(1),
    description: z.string().max(400).optional(),
    skillId: z.number().gte(1),
    resourceVariantId: z.number().gte(1).nullable(),
    unlockLevel: z.number().gte(1),
  })
  .passthrough();
const GatheringSkillEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    region: RegionBaseEntity,
    regionId: z.number().gte(1),
    requirements: z.array(GatheringSkillRequirementBaseEntity),
    resources: z.array(ResourceBaseEntity),
  })
  .passthrough();
const ResourceVariantBaseWithResourceEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    resourceId: z.number().gte(1),
    resource: ResourceBaseEntity,
  })
  .passthrough();
const GatheringSkillRequirementEntity = z
  .object({
    id: z.number().gte(1),
    description: z.string().max(400).optional(),
    skill: GatheringSkillEntity,
    skillId: z.number().gte(1),
    resourceVariant: ResourceVariantBaseWithResourceEntity.optional(),
    resourceVariantId: z.number().gte(1).nullable(),
    unlockLevel: z.number().gte(1),
  })
  .passthrough();
const UpdateGatheringSkillRequirementDto = z
  .object({
    skillId: z.number().gte(1),
    unlockLevel: z.number().gte(1),
    description: z.string().max(400),
    resourceVariantId: z.number().gte(1).nullable(),
  })
  .partial()
  .passthrough();
const CreateGatheringSkillDto = z
  .object({ name: z.string().min(1).max(256), regionId: z.number().gte(1) })
  .passthrough();
const UpdateGatheringSkillDto = z
  .object({ name: z.string().min(1).max(256), regionId: z.number().gte(1) })
  .partial()
  .passthrough();
const CreateCraftingSkillRequirementDto = z
  .object({
    skillId: z.number().gte(1),
    unlockLevel: z.number().gte(1),
    description: z.string().max(400).optional(),
    recipeId: z.number().gte(1).nullish(),
  })
  .passthrough();
const CraftingSkillRequirementBaseEntity = z
  .object({
    id: z.number().gte(1),
    description: z.string().max(400).optional(),
    skillId: z.number().gte(1),
    recipeId: z.number().gte(1).nullable(),
    unlockLevel: z.number().gte(1),
  })
  .passthrough();
const CraftingRecipeBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    outputConsumableVariantId: z.number().gte(1).nullable(),
    outputWeaponVariantId: z.number().gte(1).nullable(),
    outputArmorVariantId: z.number().gte(1).nullable(),
  })
  .passthrough();
const CraftingSkillRequirementEntity = z
  .object({
    id: z.number().gte(1),
    description: z.string().max(400).optional(),
    skill: CraftingSkillBaseEntity,
    skillId: z.number().gte(1),
    recipe: CraftingRecipeBaseEntity.optional(),
    recipeId: z.number().gte(1).nullable(),
    unlockLevel: z.number().gte(1),
  })
  .passthrough();
const UpdateCraftingSkillRequirementDto = z
  .object({
    skillId: z.number().gte(1),
    unlockLevel: z.number().gte(1),
    description: z.string().max(400),
    recipeId: z.number().gte(1).nullable(),
  })
  .partial()
  .passthrough();
const CreateCraftingRecipeDto = z
  .object({
    name: z.string().min(1).max(256),
    inputResourceVariantIds: z.array(z.number().gte(1)).optional(),
    inputItemIds: z.array(z.number().gte(1)).optional(),
    outputConsumableVariantId: z.number().gte(1).nullish(),
    outputWeaponVariantId: z.number().gte(1).nullish(),
    outputArmorVariantId: z.number().gte(1).nullish(),
  })
  .passthrough();
const CraftingSkillRequirementBaseWithSkillEntity = z
  .object({
    id: z.number().gte(1),
    description: z.string().max(400).optional(),
    skillId: z.number().gte(1),
    skill: CraftingSkillBaseEntity,
    recipeId: z.number().gte(1).nullable(),
    unlockLevel: z.number().gte(1),
  })
  .passthrough();
const MiscItemBaseEntity = z
  .object({ id: z.number().gte(1), name: z.string().min(1).max(256) })
  .passthrough();
const ConsumableBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1).nullable(),
  })
  .passthrough();
const ConsumableVariantBaseWithConsumableEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    consumableId: z.number().gte(1),
    consumable: ConsumableBaseEntity,
  })
  .passthrough();
const WeaponBaseEntity = z
  .object({
    faction: z.enum(["CRYOKNIGHT", "GUARDIAN", "HAMMERMAGE", "NONE"]),
    element: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    isRanged: z.boolean(),
    isTwoHanded: z.boolean(),
  })
  .passthrough();
const WeaponVariantBaseWithWeaponEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    weaponId: z.number().gte(1),
    weapon: WeaponBaseEntity,
  })
  .passthrough();
const ArmorBaseEntity = z
  .object({
    faction: z.enum(["CRYOKNIGHT", "GUARDIAN", "HAMMERMAGE", "NONE"]),
    slot: z.enum([
      "HEAD",
      "NECK",
      "TORSO",
      "BACK",
      "HANDS",
      "SHIELD",
      "LEGS",
      "FEET",
    ]),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
  })
  .passthrough();
const ArmorVariantBaseWithArmorEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    armorId: z.number().gte(1),
    armor: ArmorBaseEntity,
  })
  .passthrough();
const CraftingRecipeEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    requirement: CraftingSkillRequirementBaseWithSkillEntity.optional(),
    inputResourceVariants: z.array(ResourceVariantBaseWithResourceEntity),
    inputItems: z.array(MiscItemBaseEntity),
    outputConsumableVariant:
      ConsumableVariantBaseWithConsumableEntity.optional(),
    outputConsumableVariantId: z.number().gte(1).nullable(),
    outputWeaponVariant: WeaponVariantBaseWithWeaponEntity.optional(),
    outputWeaponVariantId: z.number().gte(1).nullable(),
    outputArmorVariant: ArmorVariantBaseWithArmorEntity.optional(),
    outputArmorVariantId: z.number().gte(1).nullable(),
  })
  .passthrough();
const UpdateCraftingRecipeDto = z
  .object({
    name: z.string().min(1).max(256),
    inputResourceVariantIds: z.array(z.number().gte(1)),
    removeInputResourceVariantIds: z.array(z.number().gte(1)),
    inputItemIds: z.array(z.number().gte(1)),
    removeInputItemIds: z.array(z.number().gte(1)),
    outputConsumableVariantId: z.number().gte(1).nullable(),
    outputWeaponVariantId: z.number().gte(1).nullable(),
    outputArmorVariantId: z.number().gte(1).nullable(),
  })
  .partial()
  .passthrough();
const CreateCraftingSkillDto = z
  .object({ name: z.string().min(1).max(256), regionId: z.number().gte(1) })
  .passthrough();
const CraftingSkillEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    region: RegionBaseEntity,
    regionId: z.number().gte(1),
    requirements: z.array(CraftingSkillRequirementBaseEntity),
    rooms: z.array(RoomBaseEntity),
    consumables: z.array(ConsumableBaseEntity),
  })
  .passthrough();
const UpdateCraftingSkillDto = z
  .object({ name: z.string().min(1).max(256), regionId: z.number().gte(1) })
  .partial()
  .passthrough();
const CreateCombatSkillRequirementDto = z
  .object({
    skillId: z.number().gte(1),
    unlockLevel: z.number().gte(1),
    description: z.string().max(400).optional(),
    monsterVariantId: z.number().gte(1).nullish(),
  })
  .passthrough();
const CombatSkillRequirementBaseEntity = z
  .object({
    id: z.number().gte(1),
    description: z.string().max(400).optional(),
    skillId: z.number().gte(1),
    monsterVariantId: z.number().gte(1).nullish(),
    unlockLevel: z.number().gte(1),
  })
  .passthrough();
const MonsterVariantBaseWithMonsterEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    monsterId: z.number().gte(1),
    monster: MonsterBaseEntity,
  })
  .passthrough();
const CombatSkillRequirementEntity = z
  .object({
    id: z.number().gte(1),
    description: z.string().max(400).optional(),
    skill: CombatSkillBaseEntity,
    skillId: z.number().gte(1),
    monsterVariant: MonsterVariantBaseWithMonsterEntity.optional(),
    monsterVariantId: z.number().gte(1).nullish(),
    unlockLevel: z.number().gte(1),
  })
  .passthrough();
const UpdateCombatSkillRequirementDto = z
  .object({
    skillId: z.number().gte(1),
    unlockLevel: z.number().gte(1),
    description: z.string().max(400),
    monsterVariantId: z.number().gte(1).nullable(),
  })
  .partial()
  .passthrough();
const CreateCombatSkillDto = z
  .object({ name: z.string().min(1).max(256), regionId: z.number().gte(1) })
  .passthrough();
const CombatSkillEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    region: RegionBaseEntity,
    regionId: z.number().gte(1),
    requirements: z.array(CombatSkillRequirementBaseEntity),
    monsters: z.array(MonsterBaseEntity),
  })
  .passthrough();
const UpdateCombatSkillDto = z
  .object({ name: z.string().min(1).max(256), regionId: z.number().gte(1) })
  .partial()
  .passthrough();
const CreateResourceVariantDto = z
  .object({ name: z.string().min(1).max(256), resourceId: z.number().gte(1) })
  .passthrough();
const ResourceVariantBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    resourceId: z.number().gte(1),
  })
  .passthrough();
const ResourceBaseWithSkillEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1),
    skill: GatheringSkillBaseEntity,
    passive: z.boolean(),
  })
  .passthrough();
const VendorBaseEntity = z
  .object({ id: z.number().gte(1), npcId: z.number().gte(1) })
  .passthrough();
const DropTableBaseEntity = z
  .object({
    id: z.number().gte(1),
    monsterVariantId: z.number().gte(1),
    currency: z.number().gte(1).nullable(),
  })
  .passthrough();
const ResourceVariantEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    resource: ResourceBaseWithSkillEntity,
    resourceId: z.number().gte(1),
    requirement: GatheringSkillRequirementBaseEntity.optional(),
    inRecipes: z.array(CraftingRecipeBaseEntity),
    vendors: z.array(VendorBaseEntity),
    dropTables: z.array(DropTableBaseEntity),
  })
  .passthrough();
const UpdateResourceVariantDto = z
  .object({ name: z.string().min(1).max(256), resourceId: z.number().gte(1) })
  .partial()
  .passthrough();
const CreateResourceDto = z
  .object({
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1),
    passive: z.boolean(),
  })
  .passthrough();
const ResourceEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skill: GatheringSkillBaseEntity,
    skillId: z.number().gte(1),
    rooms: z.array(RoomBaseEntity),
    passive: z.boolean(),
    variants: z.array(ResourceVariantBaseEntity),
  })
  .passthrough();
const UpdateResourceDto = z
  .object({
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1),
    passive: z.boolean(),
  })
  .partial()
  .passthrough();
const CreateConsumableVariantDto = z
  .object({ name: z.string().min(1).max(256), consumableId: z.number().gte(1) })
  .passthrough();
const ConsumableVariantBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    consumableId: z.number().gte(1),
  })
  .passthrough();
const ConsumableBaseWithSkillEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1).nullable(),
    skill: CraftingSkillBaseEntity.optional(),
  })
  .passthrough();
const ConsumableVariantEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    consumable: ConsumableBaseWithSkillEntity,
    consumableId: z.number().gte(1),
    recipe: CraftingRecipeBaseEntity.optional(),
    vendors: z.array(VendorBaseEntity),
    dropTables: z.array(DropTableBaseEntity),
  })
  .passthrough();
const UpdateConsumableVariantDto = z
  .object({ name: z.string().min(1).max(256), consumableId: z.number().gte(1) })
  .partial()
  .passthrough();
const CreateConsumableDto = z
  .object({
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1).nullish(),
  })
  .passthrough();
const ConsumableEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skill: CraftingSkillBaseEntity.optional(),
    skillId: z.number().gte(1).nullable(),
    variants: z.array(ConsumableVariantBaseEntity),
  })
  .passthrough();
const UpdateConsumableDto = z
  .object({
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1).nullable(),
  })
  .partial()
  .passthrough();
const CreateWeaponVariantDto = z
  .object({ name: z.string().min(1).max(256), weaponId: z.number().gte(1) })
  .passthrough();
const WeaponVariantBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    weaponId: z.number().gte(1),
  })
  .passthrough();
const WeaponVariantEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    weapon: WeaponBaseEntity,
    weaponId: z.number().gte(1),
    recipe: CraftingRecipeBaseEntity.optional(),
    vendors: z.array(VendorBaseEntity),
    dropTables: z.array(DropTableBaseEntity),
  })
  .passthrough();
const UpdateWeaponVariantDto = z
  .object({ name: z.string().min(1).max(256), weaponId: z.number().gte(1) })
  .partial()
  .passthrough();
const CreateWeaponDto = z
  .object({
    faction: z.enum(["CRYOKNIGHT", "GUARDIAN", "HAMMERMAGE", "NONE"]),
    element: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    name: z.string().min(1).max(256),
    isRanged: z.boolean(),
    isTwoHanded: z.boolean(),
  })
  .passthrough();
const WeaponEntity = z
  .object({
    faction: z.enum(["CRYOKNIGHT", "GUARDIAN", "HAMMERMAGE", "NONE"]),
    element: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    isRanged: z.boolean(),
    isTwoHanded: z.boolean(),
    variants: z.array(WeaponVariantBaseEntity),
  })
  .passthrough();
const UpdateWeaponDto = z
  .object({
    faction: z.enum(["CRYOKNIGHT", "GUARDIAN", "HAMMERMAGE", "NONE"]),
    element: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    name: z.string().min(1).max(256),
    isRanged: z.boolean(),
    isTwoHanded: z.boolean(),
  })
  .partial()
  .passthrough();
const CreateArmorVariantDto = z
  .object({ name: z.string().min(1).max(256), armorId: z.number().gte(1) })
  .passthrough();
const ArmorVariantBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    armorId: z.number().gte(1),
  })
  .passthrough();
const ArmorVariantEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    armor: ArmorBaseEntity,
    armorId: z.number().gte(1),
    recipe: CraftingRecipeBaseEntity.optional(),
    vendors: z.array(VendorBaseEntity),
    dropTables: z.array(DropTableBaseEntity),
  })
  .passthrough();
const UpdateArmorVariantDto = z
  .object({ name: z.string().min(1).max(256), armorId: z.number().gte(1) })
  .partial()
  .passthrough();
const CreateArmorDto = z
  .object({
    faction: z.enum(["CRYOKNIGHT", "GUARDIAN", "HAMMERMAGE", "NONE"]),
    slot: z.enum([
      "HEAD",
      "NECK",
      "TORSO",
      "BACK",
      "HANDS",
      "SHIELD",
      "LEGS",
      "FEET",
    ]),
    name: z.string().min(1).max(256),
  })
  .passthrough();
const ArmorEntity = z
  .object({
    faction: z.enum(["CRYOKNIGHT", "GUARDIAN", "HAMMERMAGE", "NONE"]),
    slot: z.enum([
      "HEAD",
      "NECK",
      "TORSO",
      "BACK",
      "HANDS",
      "SHIELD",
      "LEGS",
      "FEET",
    ]),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    variants: z.array(ArmorVariantBaseEntity),
  })
  .passthrough();
const UpdateArmorDto = z
  .object({
    faction: z.enum(["CRYOKNIGHT", "GUARDIAN", "HAMMERMAGE", "NONE"]),
    slot: z.enum([
      "HEAD",
      "NECK",
      "TORSO",
      "BACK",
      "HANDS",
      "SHIELD",
      "LEGS",
      "FEET",
    ]),
    name: z.string().min(1).max(256),
  })
  .partial()
  .passthrough();
const CreateMiscItemDto = z
  .object({ name: z.string().min(1).max(256) })
  .passthrough();
const MiscItemEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    vendors: z.array(VendorBaseEntity),
    inRecipes: z.array(CraftingRecipeBaseEntity),
    dropTables: z.array(DropTableBaseEntity),
  })
  .passthrough();
const UpdateMiscItemDto = z
  .object({ name: z.string().min(1).max(256) })
  .partial()
  .passthrough();
const CreateDropTableDto = z
  .object({
    monsterVariantId: z.number().gte(1),
    resourceVariantIds: z.array(z.number().gte(1)).optional(),
    weaponVariantIds: z.array(z.number().gte(1)).optional(),
    armorVariantIds: z.array(z.number().gte(1)).optional(),
    consumableVariantIds: z.array(z.number().gte(1)).optional(),
    miscItemIds: z.array(z.number().gte(1)).optional(),
    currency: z.number().gte(1).optional(),
  })
  .passthrough();
const DropTableEntity = z
  .object({
    id: z.number().gte(1),
    monsterVariant: MonsterVariantBaseWithMonsterEntity,
    monsterVariantId: z.number().gte(1),
    resourceVariants: z.array(ResourceVariantBaseEntity),
    weaponVariants: z.array(WeaponVariantBaseEntity),
    armorVariants: z.array(ArmorVariantBaseEntity),
    consumableVariants: z.array(ConsumableVariantBaseEntity),
    miscItems: z.array(MiscItemBaseEntity),
    currency: z.number().gte(1).nullable(),
  })
  .passthrough();
const UpdateDropTableDto = z
  .object({
    monsterVariantId: z.number().gte(1),
    resourceVariantIds: z.array(z.number().gte(1)),
    weaponVariantIds: z.array(z.number().gte(1)),
    armorVariantIds: z.array(z.number().gte(1)),
    consumableVariantIds: z.array(z.number().gte(1)),
    miscItemIds: z.array(z.number().gte(1)),
    currency: z.number().gte(1),
  })
  .partial()
  .passthrough();
const CreateMonsterVariantDto = z
  .object({ name: z.string().min(1).max(256), monsterId: z.number().gte(1) })
  .passthrough();
const MonsterVariantBaseEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    monsterId: z.number().gte(1),
  })
  .passthrough();
const MonsterBaseWithSkillEntity = z
  .object({
    attackElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    immuneElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    vulnerableElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1),
    skill: CombatSkillBaseEntity,
    passive: z.boolean(),
  })
  .passthrough();
const MonsterVariantEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    monster: MonsterBaseWithSkillEntity,
    monsterId: z.number().gte(1),
    requirement: CombatSkillRequirementBaseEntity.optional(),
    dropTable: DropTableBaseEntity.optional(),
  })
  .passthrough();
const UpdateMonsterVariantDto = z
  .object({ name: z.string().min(1).max(256), monsterId: z.number().gte(1) })
  .partial()
  .passthrough();
const CreateMonsterDto = z
  .object({
    attackElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    immuneElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    vulnerableElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1),
    passive: z.boolean(),
  })
  .passthrough();
const MonsterEntity = z
  .object({
    attackElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    immuneElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    vulnerableElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    skill: CombatSkillBaseEntity,
    skillId: z.number().gte(1),
    rooms: z.array(RoomBaseEntity),
    passive: z.boolean(),
    variants: z.array(MonsterVariantBaseEntity),
  })
  .passthrough();
const UpdateMonsterDto = z
  .object({
    attackElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    immuneElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    vulnerableElement: z.enum([
      "ARBORAE",
      "CRYONAE",
      "INFERNAE",
      "NECROMAE",
      "TEMPESTAE",
      "IMPACT",
      "NONE",
    ]),
    name: z.string().min(1).max(256),
    skillId: z.number().gte(1),
    passive: z.boolean(),
  })
  .partial()
  .passthrough();
const CreateVendorDto = z
  .object({
    npcId: z.number().gte(1),
    resourceVariantIds: z.array(z.number().gte(1)).optional(),
    weaponVariantIds: z.array(z.number().gte(1)).optional(),
    armorVariantIds: z.array(z.number().gte(1)).optional(),
    consumableVariantIds: z.array(z.number().gte(1)).optional(),
    miscItemIds: z.array(z.number().gte(1)).optional(),
  })
  .passthrough();
const VendorEntity = z
  .object({
    id: z.number().gte(1),
    npc: NpcBaseEntity,
    npcId: z.number().gte(1),
    resourceVariants: z.array(ResourceVariantBaseEntity),
    consumableVariants: z.array(ConsumableVariantBaseEntity),
    weaponVariants: z.array(WeaponVariantBaseEntity),
    armorVariants: z.array(ArmorVariantBaseEntity),
    miscItems: z.array(MiscItemBaseEntity),
  })
  .passthrough();
const UpdateVendorDto = z
  .object({
    npcId: z.number().gte(1),
    resourceVariantIds: z.array(z.number().gte(1)),
    weaponVariantIds: z.array(z.number().gte(1)),
    armorVariantIds: z.array(z.number().gte(1)),
    consumableVariantIds: z.array(z.number().gte(1)),
    miscItemIds: z.array(z.number().gte(1)),
    removeResourceVariantIds: z.array(z.number().gte(1)),
    removeWeaponVariantIds: z.array(z.number().gte(1)),
    removeArmorVariantIds: z.array(z.number().gte(1)),
    removeConsumableVariantIds: z.array(z.number().gte(1)),
    removeMiscItemIds: z.array(z.number().gte(1)),
  })
  .partial()
  .passthrough();
const CreateNpcDto = z
  .object({ name: z.string().min(1).max(256) })
  .passthrough();
const NpcEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    vendor: VendorBaseEntity.optional(),
    questSteps: z.array(QuestStepBaseEntity),
    rooms: z.array(RoomBaseEntity),
  })
  .passthrough();
const UpdateNpcDto = z
  .object({ name: z.string().min(1).max(256) })
  .partial()
  .passthrough();
const CreateQuestStepDto = z
  .object({
    index: z.number().gte(1),
    description: z.string().min(1).max(400),
    questId: z.number().gte(1),
    roomId: z.number().gte(1).nullish(),
    npcId: z.number().gte(1).nullish(),
  })
  .passthrough();
const QuestBaseEntity = z
  .object({ id: z.number().gte(1), name: z.string().min(1).max(256) })
  .passthrough();
const QuestStepEntity = z
  .object({
    id: z.number().gte(1),
    index: z.number().gte(1),
    description: z.string().max(400),
    quest: QuestBaseEntity,
    questId: z.number().gte(1),
    room: RoomBaseEntity.optional(),
    roomId: z.number().gte(1).nullable(),
    npc: NpcBaseEntity.optional(),
    npcId: z.number().gte(1).nullable(),
  })
  .passthrough();
const UpdateQuestStepDto = z
  .object({
    index: z.number().gte(1),
    description: z.string().max(400),
    questId: z.number().gte(1),
    roomId: z.number().gte(1).nullable(),
    npcId: z.number().gte(1).nullable(),
  })
  .partial()
  .passthrough();
const CreateQuestDto = z
  .object({ name: z.string().min(1).max(256) })
  .passthrough();
const QuestEntity = z
  .object({
    id: z.number().gte(1),
    name: z.string().min(1).max(256),
    steps: z.array(QuestStepBaseEntity),
  })
  .passthrough();
const UpdateQuestDto = z
  .object({ name: z.string().min(1).max(256) })
  .partial()
  .passthrough();
const StatsEntity = z
  .object({
    counts: z
      .object({
        regions: z.number(),
        rooms: z.number(),
        combatSkills: z.number(),
        combatSkillRequirements: z.number(),
        gatheringSkills: z.number(),
        gatheringSkillRequirements: z.number(),
        craftingSkills: z.number(),
        craftingSkillRequirements: z.number(),
        craftingRecipes: z.number(),
        resources: z.number(),
        resourceVariants: z.number(),
        consumables: z.number(),
        consumableVariants: z.number(),
        weapons: z.number(),
        weaponVariants: z.number(),
        armors: z.number(),
        armorVariants: z.number(),
        miscItems: z.number(),
        monsters: z.number(),
        monsterVariants: z.number(),
        npcs: z.number(),
        vendors: z.number(),
        quests: z.number(),
        questSteps: z.number(),
      })
      .passthrough(),
    unset: z
      .object({
        combatSkillRequirements: z.number(),
        gatheringSkillRequirements: z.number(),
        craftingSkillRequirements: z.number(),
        craftingRecipes: z.number(),
        resourceVariants: z.number(),
        consumableVariants: z.number(),
        weaponVariants: z.number(),
        armorVariants: z.number(),
        monsterVariants: z.number(),
        dropTables: z.number(),
        npcs: z.number(),
        vendors: z.number(),
        quests: z.number(),
        questStep: z.number(),
      })
      .passthrough(),
  })
  .passthrough();

export const schemas = {
  SignInDtoSchema: SignInDto,
  JwtEntitySchema: JwtEntity,
  CreateRegionDtoSchema: CreateRegionDto,
  RegionBaseEntitySchema: RegionBaseEntity,
  RoomBaseEntitySchema: RoomBaseEntity,
  CombatSkillBaseEntitySchema: CombatSkillBaseEntity,
  GatheringSkillBaseEntitySchema: GatheringSkillBaseEntity,
  CraftingSkillBaseEntitySchema: CraftingSkillBaseEntity,
  RegionEntitySchema: RegionEntity,
  UpdateRegionDtoSchema: UpdateRegionDto,
  CreateRoomDtoSchema: CreateRoomDto,
  MonsterBaseEntitySchema: MonsterBaseEntity,
  NpcBaseEntitySchema: NpcBaseEntity,
  ResourceBaseEntitySchema: ResourceBaseEntity,
  QuestStepBaseEntitySchema: QuestStepBaseEntity,
  RoomEntitySchema: RoomEntity,
  UpdateRoomDtoSchema: UpdateRoomDto,
  CreateGatheringSkillRequirementDtoSchema: CreateGatheringSkillRequirementDto,
  GatheringSkillRequirementBaseEntitySchema:
    GatheringSkillRequirementBaseEntity,
  GatheringSkillEntitySchema: GatheringSkillEntity,
  ResourceVariantBaseWithResourceEntitySchema:
    ResourceVariantBaseWithResourceEntity,
  GatheringSkillRequirementEntitySchema: GatheringSkillRequirementEntity,
  UpdateGatheringSkillRequirementDtoSchema: UpdateGatheringSkillRequirementDto,
  CreateGatheringSkillDtoSchema: CreateGatheringSkillDto,
  UpdateGatheringSkillDtoSchema: UpdateGatheringSkillDto,
  CreateCraftingSkillRequirementDtoSchema: CreateCraftingSkillRequirementDto,
  CraftingSkillRequirementBaseEntitySchema: CraftingSkillRequirementBaseEntity,
  CraftingRecipeBaseEntitySchema: CraftingRecipeBaseEntity,
  CraftingSkillRequirementEntitySchema: CraftingSkillRequirementEntity,
  UpdateCraftingSkillRequirementDtoSchema: UpdateCraftingSkillRequirementDto,
  CreateCraftingRecipeDtoSchema: CreateCraftingRecipeDto,
  CraftingSkillRequirementBaseWithSkillEntitySchema:
    CraftingSkillRequirementBaseWithSkillEntity,
  MiscItemBaseEntitySchema: MiscItemBaseEntity,
  ConsumableBaseEntitySchema: ConsumableBaseEntity,
  ConsumableVariantBaseWithConsumableEntitySchema:
    ConsumableVariantBaseWithConsumableEntity,
  WeaponBaseEntitySchema: WeaponBaseEntity,
  WeaponVariantBaseWithWeaponEntitySchema: WeaponVariantBaseWithWeaponEntity,
  ArmorBaseEntitySchema: ArmorBaseEntity,
  ArmorVariantBaseWithArmorEntitySchema: ArmorVariantBaseWithArmorEntity,
  CraftingRecipeEntitySchema: CraftingRecipeEntity,
  UpdateCraftingRecipeDtoSchema: UpdateCraftingRecipeDto,
  CreateCraftingSkillDtoSchema: CreateCraftingSkillDto,
  CraftingSkillEntitySchema: CraftingSkillEntity,
  UpdateCraftingSkillDtoSchema: UpdateCraftingSkillDto,
  CreateCombatSkillRequirementDtoSchema: CreateCombatSkillRequirementDto,
  CombatSkillRequirementBaseEntitySchema: CombatSkillRequirementBaseEntity,
  MonsterVariantBaseWithMonsterEntitySchema:
    MonsterVariantBaseWithMonsterEntity,
  CombatSkillRequirementEntitySchema: CombatSkillRequirementEntity,
  UpdateCombatSkillRequirementDtoSchema: UpdateCombatSkillRequirementDto,
  CreateCombatSkillDtoSchema: CreateCombatSkillDto,
  CombatSkillEntitySchema: CombatSkillEntity,
  UpdateCombatSkillDtoSchema: UpdateCombatSkillDto,
  CreateResourceVariantDtoSchema: CreateResourceVariantDto,
  ResourceVariantBaseEntitySchema: ResourceVariantBaseEntity,
  ResourceBaseWithSkillEntitySchema: ResourceBaseWithSkillEntity,
  VendorBaseEntitySchema: VendorBaseEntity,
  DropTableBaseEntitySchema: DropTableBaseEntity,
  ResourceVariantEntitySchema: ResourceVariantEntity,
  UpdateResourceVariantDtoSchema: UpdateResourceVariantDto,
  CreateResourceDtoSchema: CreateResourceDto,
  ResourceEntitySchema: ResourceEntity,
  UpdateResourceDtoSchema: UpdateResourceDto,
  CreateConsumableVariantDtoSchema: CreateConsumableVariantDto,
  ConsumableVariantBaseEntitySchema: ConsumableVariantBaseEntity,
  ConsumableBaseWithSkillEntitySchema: ConsumableBaseWithSkillEntity,
  ConsumableVariantEntitySchema: ConsumableVariantEntity,
  UpdateConsumableVariantDtoSchema: UpdateConsumableVariantDto,
  CreateConsumableDtoSchema: CreateConsumableDto,
  ConsumableEntitySchema: ConsumableEntity,
  UpdateConsumableDtoSchema: UpdateConsumableDto,
  CreateWeaponVariantDtoSchema: CreateWeaponVariantDto,
  WeaponVariantBaseEntitySchema: WeaponVariantBaseEntity,
  WeaponVariantEntitySchema: WeaponVariantEntity,
  UpdateWeaponVariantDtoSchema: UpdateWeaponVariantDto,
  CreateWeaponDtoSchema: CreateWeaponDto,
  WeaponEntitySchema: WeaponEntity,
  UpdateWeaponDtoSchema: UpdateWeaponDto,
  CreateArmorVariantDtoSchema: CreateArmorVariantDto,
  ArmorVariantBaseEntitySchema: ArmorVariantBaseEntity,
  ArmorVariantEntitySchema: ArmorVariantEntity,
  UpdateArmorVariantDtoSchema: UpdateArmorVariantDto,
  CreateArmorDtoSchema: CreateArmorDto,
  ArmorEntitySchema: ArmorEntity,
  UpdateArmorDtoSchema: UpdateArmorDto,
  CreateMiscItemDtoSchema: CreateMiscItemDto,
  MiscItemEntitySchema: MiscItemEntity,
  UpdateMiscItemDtoSchema: UpdateMiscItemDto,
  CreateDropTableDtoSchema: CreateDropTableDto,
  DropTableEntitySchema: DropTableEntity,
  UpdateDropTableDtoSchema: UpdateDropTableDto,
  CreateMonsterVariantDtoSchema: CreateMonsterVariantDto,
  MonsterVariantBaseEntitySchema: MonsterVariantBaseEntity,
  MonsterBaseWithSkillEntitySchema: MonsterBaseWithSkillEntity,
  MonsterVariantEntitySchema: MonsterVariantEntity,
  UpdateMonsterVariantDtoSchema: UpdateMonsterVariantDto,
  CreateMonsterDtoSchema: CreateMonsterDto,
  MonsterEntitySchema: MonsterEntity,
  UpdateMonsterDtoSchema: UpdateMonsterDto,
  CreateVendorDtoSchema: CreateVendorDto,
  VendorEntitySchema: VendorEntity,
  UpdateVendorDtoSchema: UpdateVendorDto,
  CreateNpcDtoSchema: CreateNpcDto,
  NpcEntitySchema: NpcEntity,
  UpdateNpcDtoSchema: UpdateNpcDto,
  CreateQuestStepDtoSchema: CreateQuestStepDto,
  QuestBaseEntitySchema: QuestBaseEntity,
  QuestStepEntitySchema: QuestStepEntity,
  UpdateQuestStepDtoSchema: UpdateQuestStepDto,
  CreateQuestDtoSchema: CreateQuestDto,
  QuestEntitySchema: QuestEntity,
  UpdateQuestDtoSchema: UpdateQuestDto,
  StatsEntitySchema: StatsEntity,
};
