export function groupReqsBySkillId<T extends { skillId: number }>(
  data: T[]
): T[][] {
  return Object.values(
    data.reduce((acc: { [key: number]: T[] }, item) => {
      const array = acc[item.skillId] ?? (acc[item.skillId] = []);
      array.push(item);
      return acc;
    }, {})
  );
}

export function groupRecipesBySkillId<
  T extends { requirement?: { skillId: number } }
>(data: T[]): { grouped: T[][]; noRequirement: T[] } {
  const grouped: { [key: number]: T[] } = {};
  const noRequirement: T[] = [];

  for (const item of data) {
    if (item.requirement?.skillId !== undefined) {
      (grouped[item.requirement.skillId] ??= []).push(item);
    } else {
      noRequirement.push(item);
    }
  }

  return { grouped: Object.values(grouped), noRequirement };
}
