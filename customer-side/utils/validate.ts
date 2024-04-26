import type { ZodSchema } from "zod";

export default function validate<T>(schema: ZodSchema, payload: T) {
  return schema.parse(payload);
}
