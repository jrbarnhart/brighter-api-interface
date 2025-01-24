export type ZodSchemaFromType<T> = {
  [K in keyof T]: z.ZodType<T[K]>;
};
