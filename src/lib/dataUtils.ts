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
