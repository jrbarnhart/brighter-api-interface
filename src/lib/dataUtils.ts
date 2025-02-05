export function groupDataBySkillId<T extends { skillId?: number }>(
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

export function groupResourceVariantsBySkillAndBase<
  T extends { resource: { name: string; skill: { name: string } } }
>(data: T[]) {
  return data.reduce(
    (acc: { [key: string]: { [key: string]: T[] } }, variant) => {
      const skillName = variant.resource.skill.name;
      const resourceName = variant.resource.name;
      // Ensure the skill group exists
      if (!acc[skillName]) {
        acc[skillName] = {};
      }

      // Then ensure the resource group exists in that skill group
      if (!acc[skillName][resourceName]) {
        acc[skillName][resourceName] = [];
      }

      // Then push the current variant to that nested array
      acc[skillName][resourceName].push(variant);

      return acc;
    },
    {}
  );
}
