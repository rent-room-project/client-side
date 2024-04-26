import type { FieldError } from "./FieldError";

export default function setError(
  fieldError: Record<string, FieldError>,
  formatError: Record<string, string[]>
) {
  for (const key in formatError) {
    fieldError[key].msg = formatError[key][0];
    fieldError[key].error = true;
  }
}
