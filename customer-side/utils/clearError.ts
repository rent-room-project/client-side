export default function clearError(fieldError: Record<string, FieldError>) {
  for (const key in fieldError) {
    fieldError[key].msg = "";
    fieldError[key].error = false;
  }
}
