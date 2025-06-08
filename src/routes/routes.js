// src/routes/route.js

import InsuranceForm from "../pages/InsuranceForm";
import SubmissionList from "../pages/SubmissionList";

// This is now a simple function that returns a static array.
// No hooks are used here.
export function RouteBuilder() {
  return [
    {
      titleKey: "navigation.forms",
      path: "/form",
      component: InsuranceForm,
    },
    {
      titleKey: "navigation.submissions",
      path: "/submissions",
      component: SubmissionList,
    },
  ];
}
