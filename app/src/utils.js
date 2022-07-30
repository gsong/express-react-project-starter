export const objectFromFormData = (form) =>
  Object.fromEntries(new FormData(form).entries());
