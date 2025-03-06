const queryKeys = {
  regions: "all-regions",
  regionById: (id: string) => `region-${id}`,
  rooms: "all-rooms",
  roomById: (id: string) => `room-${id}`,
  combatSkills: "all-combat-skills",
  combatSkillById: (id: string) => `combat-skill-${id}`,
  combatSkillRequirements: "all-combat-skill-requirements",
  combatSkillRequirementById: (id: string) => `combat-skill-requirement-${id}`,
  gatheringSkills: "all-gathering-skills",
  gatheringSkillById: (id: string) => `gathering-skill-${id}`,
  gatheringSkillRequirements: "all-gathering-skill-requirements",
  gatheringSkillRequirementById: (id: string) =>
    `gathering-skill-requirement-${id}`,
  craftingSkills: "all-crafting-skills",
  craftingSkillById: (id: string) => `crafting-skill-${id}`,
  craftingSkillRequirements: "all-crafting-skill-requirements",
  craftingSkillRequirementById: (id: string) =>
    `crafting-skill-requirement-${id}`,
  craftingRecipes: "all-crafting-recipes",
  craftingRecipeById: (id: string) => `crafting-recipe-${id}`,
  resources: "all-resources",
  resourceById: (id: string) => `resource-${id}`,
  resourceVariants: "all-resource-variants",
  resourceVariantById: (id: string) => `resource-variant-${id}`,
  weapons: "all-weapons",
  weaponById: (id: string) => `weapon-${id}`,
  weaponVariants: "all-weapon-variants",
  weaponVariantById: (id: string) => `weapon-variant-${id}`,
  consumables: "all-consumables",
  consumableById: (id: string) => `consumable-${id}`,
  consumableVariants: "all-consumable-variants",
  consumableVariantById: (id: string) => `consumable-variant-${id}`,
  armors: "all-armors",
  armorById: (id: string) => `armor-${id}`,
  armorVariants: "all-armor-variants",
  armorVariantById: (id: string) => `armor-variant-${id}`,
  miscItems: "all-misc-items",
  miscItemById: (id: string) => `misc-item-${id}`,
  monsters: "all-monsters",
  monsterById: (id: string) => `monster-${id}`,
  monsterVariants: "all-monster-variants",
  monsterVariantById: (id: string) => `monster-variant-${id}`,
  dropTables: "all-drop-tables",
  dropTableById: (id: string) => `drop-table-${id}`,
  npcs: "all-npcs",
  npcById: (id: string) => `npc-${id}`,
  vendors: "all-vendors",
  vendorById: (id: string) => `vendor-${id}`,
  quests: "all-quests",
  questById: (id: string) => `quest-${id}`,
  questSteps: "all-quest-steps",
  questStepById: (id: string) => `quest-step-${id}`,
  roomForm: "room-form-data",
  combatSkillForm: "comat-skill-form-data",
  combatSkillRequirementForm: "combat-skill-requirement-form-data",
  gatheringSkillForm: "gathering-skill-form-data",
  gatheringSkillRequirementForm: "gathering-skill-requirement-form-data",
  craftingSkillForm: "crafting-skill-form-data",
  craftingSkillRequirementForm: "crafting-skill-requirement-form-data",
  craftingRecipeForm: "crafting-recipe-form-data",
  resourceForm: "resource-form-data",
  resourceVariantForm: "resource-variant-form-data",
  consumableForm: "consumable-form-data",
  consumableVariantForm: "consumable-variant-form-data",
  weaponVariantForm: "weapon-variant-form-data",
  armorVariantForm: "armor-variant-form-data",
  monsterForm: "monster-form-data",
  monsterVariantForm: "monster-variant-form-data",
  dropTableForm: "drop-table-form-data",
  vendorForm: "vendor-form-data",
  questForm: "quest-form-data",
  questStepForm: "quest-step-form-data",
  stats: "stats",
};

export default queryKeys;
