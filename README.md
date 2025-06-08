Smart Insurance Application Portal


This project is a React web application developed as a solution to a frontend coding assignment. The primary goal is to provide a smart portal for applying for various types of insurance (e.g., Health, Home, Auto) through forms whose structures are dynamically fetched from an API. After submitting an application, users can view and manage their submissions in an advanced, feature-rich data table.




🚀 Live Demo Link
(It is recommended to deploy the project to Vercel or Netlify and place the link here)



https://github.com/user-attachments/assets/b83d854e-e14b-4890-a359-25f381f14d8f

(A short, engaging GIF showcasing the app's features—like filling out the form, toggling dark mode, or interacting with the data table—is highly recommended here)

✨ Main Features
1. Smart & Dynamic Forms
API-Driven Rendering: Form structures are fetched entirely from an API, with no hardcoded forms in the application.

Conditional Logic: Fields dynamically appear or disappear based on user input. For example, the "Pregnancy Status" field is only shown if the gender "Female" is selected.


Nested Sections: The forms support nested field structures, such as for an address or vehicle details.
Dynamic Option Fetching: Certain fields, like a "State" selector, dynamically fetch their options from a separate API based on user input in another field, such as the selected "Country".
Validation: All user-submitted data is validated before being sent to the server.
2. Customizable & Advanced Data Table
Submissions View: All submitted applications are displayed in a comprehensive table.
Column Selection: Users can dynamically select which columns are visible in the table.
Sorting: Data can be sorted by various columns.

Filtering: A global search function allows for quick filtering of all submissions.
Pagination: Data is handled efficiently with client-side pagination.
⭐ Bonus Features
In addition to the core requirements, the following features were implemented to enhance the user experience:

Autosave Drafts: User progress on a form is automatically saved to localStorage, preventing data loss if the browser is closed unexpectedly.
Dark Mode: The application includes a theme toggler to switch between light and dark modes.
Localization (i18n): The application supports multiple languages (English and Turkish), allowing users to switch locales on the fly.
Drag & Drop Row Reordering: Users can reorder the rows in the submissions table via drag-and-drop, which was implemented as a powerful alternative to the "drag-and-drop field reordering" suggestion.
🚀 Tech Stack
Framework: React.js
UI Library: Mantine UI
Server State Management: TanStack Query (React Query)
Routing: React Router DOM
Form Management: Mantine Form
Data Table: Mantine DataTable
Drag & Drop: @hello-pangea/dnd
Internationalization (i18n): i18next & react-i18next
⚙️ Setup Instructions
To run this project locally, follow these steps:

Clone the repository:

Bash

git clone https://github.com/omidfh/insurance-forms-table
cd project-directory
Install dependencies:

Code snippet

npm install
Run the project:

Bash

npm run dev
The application will be available at http://localhost:5173.

🔌 API Usage
This project interacts with the following API endpoints.
Base URL: https://assignment.devotel.io 

Method	Endpoint	Description
GET	/api/insurance/forms	Fetches the dynamic structure for insurance forms.
POST	/api/insurance/forms/submit	Submits the filled-out form data to the server.
GET	/api/insurance/forms/submissions	Fetches the list of all submitted applications.




Export to Sheets
📝 Assumptions and Decisions
During development, the following assumptions and decisions were made:

UI Library Choice: Mantine UI was chosen for its rich component library, powerful hooks (like useForm), and built-in support for theming and dark mode.
Client-Side Operations: To create a responsive and fast user experience, table operations such as sorting, filtering, and pagination were implemented on the client side. This reduces unnecessary API calls for data manipulation.
Drag & Drop Implementation: The "drag-and-drop" bonus feature was implemented for reordering table rows instead of form fields, as this provides more practical value for managing a list of submissions.
State Management: TanStack Query was used for server state management due to its advanced capabilities for caching, refetching, and optimizing data-fetching operations.

