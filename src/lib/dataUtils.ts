import { components } from "@/types/api";

function sortItemsInGroupsByAlpha<T extends { name?: string }>(
  groups: T[][]
): T[][] {
  return groups.map((group) =>
    group.sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    })
  );
}

export function groupDataByAlpha<T extends { name: string }>(data: T[]): T[][] {
  const groups = Object.values(
    data.reduce((acc: { [key: string]: T[] }, item) => {
      const firstLetter = item.name[0]?.toUpperCase() || "*";
      const array = acc[firstLetter] ?? (acc[firstLetter] = []);
      array.push(item);
      return acc;
    }, {})
  );

  return sortItemsInGroupsByAlpha(groups);
}

export function groupDataBySkillId<T extends { skillId?: number | null }>(
  data: T[]
): T[][] {
  return Object.values(
    data.reduce((acc: { [key: number]: T[] }, item) => {
      const skillId = item.skillId ?? -1;
      const array = acc[skillId] ?? (acc[skillId] = []);
      array.push(item);
      return acc;
    }, {})
  );
}

export function groupDataByRegionId<
  T extends { regionId?: number | null; name?: string }
>(data: T[]): T[][] {
  const groups = Object.values(
    data.reduce((acc: { [key: number]: T[] }, item) => {
      const regionId = item.regionId ?? -1;
      const array = acc[regionId] ?? (acc[regionId] = []);
      array.push(item);
      return acc;
    }, {})
  );

  return sortItemsInGroupsByAlpha(groups);
}

export function groupDataByQuestName<
  T extends { index: number; quest: { name: string } }
>(data: T[]): T[][] {
  return Object.values(
    data.reduce((acc: { [key: string]: T[] }, item) => {
      const questName = item.quest.name;
      const array = acc[questName] ?? (acc[questName] = []);
      array.push(item);
      return acc;
    }, {})
  ).map((group) => group.sort((a, b) => a.index - b.index));
}

export function groupDataByElement<
  T extends { element: components["schemas"]["AttackElementsEnum"]["value"] }
>(data: T[]): T[][] {
  return Object.values(
    data.reduce((acc: { [key: string]: T[] }, item) => {
      const array = acc[item.element] ?? (acc[item.element] = []);
      array.push(item);
      return acc;
    }, {})
  );
}

export function groupDataByMonsterVariantMonster<
  T extends { monsterVariant: { monster: { name: string } } }
>(data: T[]): T[][] {
  return Object.values(
    data.reduce((acc: { [key: string]: T[] }, item) => {
      const array =
        acc[item.monsterVariant.monster.name] ??
        (acc[item.monsterVariant.monster.name] = []);
      array.push(item);
      return acc;
    }, {})
  );
}

export function groupDataByRequirementSkillId<
  T extends { requirement?: { skillId: number } }
>(data: T[]): { grouped: T[][]; noRequirement: T[] } {
  const grouped: { [key: number]: T[] } = {};
  const noRequirement: T[] = [];

  for (const recipe of data) {
    if (recipe.requirement?.skillId !== undefined) {
      (grouped[recipe.requirement.skillId] ??= []).push(recipe);
    } else {
      noRequirement.push(recipe);
    }
  }

  return { grouped: Object.values(grouped), noRequirement };
}

export function groupDataByFactionAndSlot<
  T extends { faction: string; slot: string }
>(data: T[]) {
  return data.reduce(
    (acc: { [key: string]: { [key: string]: T[] } }, variant) => {
      const faction = variant.faction;
      const slot = variant.slot;

      if (!acc[faction]) {
        acc[faction] = {};
      }

      if (!acc[faction][slot]) {
        acc[faction][slot] = [];
      }

      acc[faction][slot].push(variant);

      return acc;
    },
    {}
  );
}

export function groupResourceVariantsBySkillAndBase<
  T extends { resource: { name: string; skill: { name: string } } }
>(data: T[]) {
  return data.reduce(
    (acc: { [key: string]: { [key: string]: T[] } }, variant) => {
      const skillName = variant.resource.skill.name;
      const resourceName = variant.resource.name;

      if (!acc[skillName]) {
        acc[skillName] = {};
      }

      if (!acc[skillName][resourceName]) {
        acc[skillName][resourceName] = [];
      }

      acc[skillName][resourceName].push(variant);

      return acc;
    },
    {}
  );
}

export function groupMonsterVariantsBySkillAndBase<
  T extends { monster: { name: string; skill: { name: string } } }
>(data: T[]) {
  return data.reduce(
    (acc: { [key: string]: { [key: string]: T[] } }, variant) => {
      const skillName = variant.monster.skill.name;
      const monsterName = variant.monster.name;

      if (!acc[skillName]) {
        acc[skillName] = {};
      }

      if (!acc[skillName][monsterName]) {
        acc[skillName][monsterName] = [];
      }

      acc[skillName][monsterName].push(variant);

      return acc;
    },
    {}
  );
}

export function groupMonsterVariantsByRegionIdAndBase<
  T extends { monster: { name: string; regionId: number } }
>(data: T[]) {
  return data.reduce(
    (acc: { [key: string]: { [key: string]: T[] } }, variant) => {
      const regionId = variant.monster.regionId;
      const monsterName = variant.monster.name;

      if (!acc[regionId]) {
        acc[regionId] = {};
      }

      if (!acc[regionId][monsterName]) {
        acc[regionId][monsterName] = [];
      }

      acc[regionId][monsterName].push(variant);

      return acc;
    },
    {}
  );
}

export function groupConsumableVariantsBySkillAndBase<
  T extends { consumable: { name: string; skill?: { name: string } } }
>(data: T[]) {
  return data.reduce(
    (acc: { [key: string]: { [key: string]: T[] } }, variant) => {
      const skillName = variant.consumable.skill?.name ?? "No Skill";
      const consumableName = variant.consumable.name;

      if (!acc[skillName]) {
        acc[skillName] = {};
      }

      if (!acc[skillName][consumableName]) {
        acc[skillName][consumableName] = [];
      }

      acc[skillName][consumableName].push(variant);

      return acc;
    },
    {}
  );
}

export function groupWeaponVariantsByFactionAndBase<
  T extends { weapon: { name: string; faction: string } }
>(data: T[]) {
  return data.reduce(
    (acc: { [key: string]: { [key: string]: T[] } }, variant) => {
      const factionName = variant.weapon.faction;
      const baseName = variant.weapon.name;

      if (!acc[factionName]) {
        acc[factionName] = {};
      }

      if (!acc[factionName][baseName]) {
        acc[factionName][baseName] = [];
      }

      acc[factionName][baseName].push(variant);

      return acc;
    },
    {}
  );
}

export function groupArmorVariantsByFactionSlotAndBase<
  T extends { armor: { name: string; faction: string; slot: string } }
>(data: T[]) {
  return data.reduce(
    (
      acc: { [key: string]: { [key: string]: { [key: string]: T[] } } },
      variant
    ) => {
      const factionName = variant.armor.faction;
      const slotName = variant.armor.slot;
      const baseName = variant.armor.name;

      if (!acc[factionName]) {
        acc[factionName] = {};
      }

      if (!acc[factionName][slotName]) {
        acc[factionName][slotName] = {};
      }

      if (!acc[factionName][slotName][baseName]) {
        acc[factionName][slotName][baseName] = [];
      }

      acc[factionName][slotName][baseName].push(variant);

      return acc;
    },
    {}
  );
}

export function groupLogsByDay(logs: Log[] | ErrorLog[]): LogsByDay {
  return logs.reduce((groups: LogsByDay, log: Log | ErrorLog) => {
    // Create a Date object from the timestamp
    const date = new Date(log.timestamp);

    // Format the date as you prefer, for example: "Monday, January 1, 2023"
    const day = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create a group for the formatted day if it doesn't exist yet
    if (!groups[day]) {
      groups[day] = [];
    }

    // Add current log to the proper day array
    groups[day].push(log);

    return groups;
  }, {});
}
