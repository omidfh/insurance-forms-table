

# 🧾 Smart Insurance Application Portal

This is a React web application developed as a solution to a frontend coding assignment. It serves as a smart portal for users to apply for various types of insurance (e.g., Health, Home, Car) via **fully dynamic, API-driven forms**, and to **manage submitted applications** in an advanced data table interface.

---

## 🚀 Live Demo

[🔗 View Live Application](https://insurance-fors-table.netlify.app/)

---

## ✨ Main Features

### 1. Smart & Dynamic Forms
- **API-Driven Rendering**: Forms are built based on API responses — no hardcoded field structures.
- **Conditional Logic**: Fields appear/disappear based on user input (e.g., *Pregnancy Status* shown only when *Gender = Female*).
- **Nested Sections**: Supports grouped fields such as address blocks and vehicle details.
- **Dynamic Options**: Select fields like *State* dynamically fetch options based on *Country* selection.
- **Validation**: All fields are validated before submission.

### 2. Customizable Submissions Table
- **Column Selection**: Users can dynamically choose which columns to view.
- **Sorting**: Sort submissions by any column.
- **Filtering**: Global search across all fields.
- **Pagination**: Efficient client-side pagination for better UX.

---

## ⭐ Bonus Features
These features were added beyond the assignment requirements:

- **Autosave Drafts**: Form data is saved in `localStorage` to prevent data loss.
- **Dark Mode**: Includes a toggle to switch between light and dark themes.
- **Localization (i18n)**: Supports multiple languages (English & Turkish).
- **Drag & Drop Row Reordering**: Users can reorder submission rows using drag-and-drop.

---

## 🧰 Tech Stack

| Purpose                 | Technology                 |
|------------------------|----------------------------|
| Frontend Framework     | React.js                   |
| UI Components          | Mantine UI v7              |
| Form Handling          | @mantine/form              |
| Routing                | React Router DOM           |
| Server State           | React Query (TanStack)     |
| Data Table             | mantine-datatable          |
| Drag & Drop            | @hello-pangea/dnd          |
| i18n                   | i18next, react-i18next     |

---

## ⚙️ Setup Instructions

1. **Clone the repo**  
```bash
git clone https://github.com/omidfh/insurance-forms-table
cd insurance-forms-table
Install dependencies

bash
Copy
Edit
npm install
Run the app locally

bash
Copy
Edit
npm run dev
App will run at: http://localhost:5173

🔌 API Usage
Base URL: https://assignment.devotel.io

Method	Endpoint	Description
GET	/api/insurance/forms	Fetch dynamic form structures
POST	/api/insurance/forms/submit	Submit filled form data
GET	/api/insurance/forms/submissions	Fetch list of submitted applications
GET	/api/getStates?country=...	Fetch states based on selected country

📝 Assumptions & Development Decisions
UI Library: Mantine was chosen for its complete component set, form support, and theme customizability.

Client-Side Logic: All filtering, sorting, and pagination are done on the client side for responsiveness.

Drag & Drop: Instead of reordering form fields, drag-and-drop was implemented for reordering submissions.

State Management: React Query (TanStack) was used for API data, caching, and background refetching.



👤 Author
Omid Faghihi



📧 fhomid2@gmail.com
🐙 github.com/omidfh

