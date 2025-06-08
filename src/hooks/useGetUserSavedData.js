//Regex for converting date data to something the react dates accepts
const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const getInitialValues = (flatFields, storageKey) => {
  try {
    const savedDataString = localStorage.getItem(storageKey);

    if (savedDataString) {
      const parsedData = JSON.parse(savedDataString);

      for (const key in parsedData) {
        const value = parsedData[key];

        //convert if if there is one
        if (typeof value === "string" && isoDateRegex.test(value)) {
          parsedData[key] = new Date(value);
        }
      }

      return parsedData;
    }
  } catch (error) {
    console.error("Failed to parse or rehydrate form data:", error);
  }

  // If no data, return default empty values
  return flatFields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {});
};
