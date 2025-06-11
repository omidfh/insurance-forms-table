const baseUrl = import.meta.env.VITE_BASE_URL;

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

export async function getDynamicForm() {
  try {
    const res = await fetch(`${baseUrl}/api/insurance/forms`);

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data;
  } catch (err) {
    //! localization
    console.log(err);
    throw new Error("dynamic form could not be fetched ,try again later");
  }
}

export async function getDynamicStateByCountry(country) {
  countries.registerLocale(enLocale);

  // const url = `https://countriesnow.space/api/v0.1/countries/states`;

  try {
    const res = await fetch(`${baseUrl}/api/getStates?country=${country}`);

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data?.states;
  } catch (err) {
    console.error(err);
    throw new Error("State list could not be fetched, try again later.");
  }
}

export async function getSubmittedList() {
  try {
    const res = await fetch(`${baseUrl}/api/insurance/forms/submissions`);

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return data;
  } catch (err) {
    //! localization
    console.log(err);
    throw new Error("dynamic form could not be fetched ,try again later");
  }
}

export async function submitForm(form) {
  try {
    const res = await fetch(`${baseUrl}/api/insurance/forms/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("State list could not be fetched, try again later.");
  }
}
