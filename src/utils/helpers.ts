
export function thereIsAnEmptyValue(obj: object) {
  return Object.values(obj).some(value => value == "")
}

export function getObjectWithDataFromAFormData(formData: FormData) {
  const formDataObj: { [keyof: string]: FormDataEntryValue } = {};
  formData.forEach((value, key) => (formDataObj[key] = value));
  return formDataObj
}

export function isAdmin(role: string = "") {
  return role === "admin"
}

export function canView(authUserId: number, UserId: number, role: string) {
  return authUserId !== UserId && !isAdmin(role)
}


