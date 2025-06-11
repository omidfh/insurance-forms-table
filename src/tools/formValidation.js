import i18next from "i18next";

export const getClientSideValidation = (field) => {
  if (!field.required) return null;

  return (value) => {
    if (!value || value === "") {
      return i18next.t("validation.required", { field: field.label });
    }

    switch (field.type) {
      //if its text ...
      case "text":
        if (field.id === "first_name" || field.id === "last_name") {
          if (value.length < 2) {
            return i18next.t("validation.minLength", {
              field: field.label,
              length: 2,
            });
          }
          if (!/^[a-zA-Z\s'-]+$/.test(value)) {
            return i18next.t("validation.onlyLetters", { field: field.label });
          }
        } else if (field.id === "zip_code") {
          if (!/^\d{5}$/.test(value)) {
            return i18next.t("validation.zipCode", { field: field.label });
          }
        }
        break;
      //validation for date
      case "date":
        if (field.id === "dob") {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();

          if (age < 18 || age > 120) {
            return i18next.t("validation.invalidDob");
          }
        }
        break;
    }

    return null;
  };
};
