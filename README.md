
Blushify 🧴

Blushify is a modern cosmetics e-commerce platform built with React and Vite, offering a sleek interface to explore and purchase beauty and personal care products with ease.

💡 Features

Product catalog with images, prices, and descriptions.

Filter and search products by category or name.

Interactive shopping cart.

Responsive layout for desktop and mobile.

Smooth navigation with React Router.

🛠️ Technologies Used

React 18

Vite (fast, modern bundler)

React Router (page navigation)

CSS/SCSS or optional styling libraries

Local JSON for product data (with option to integrate an API later)

⚡ Installation

Follow these steps to run the project locally:

Clone the repository:

git clone https://github.com/your-username/blushify.git
cd blushify


Install dependencies:

npm install


Start the development server:

npm run dev


Open the project in your browser:

The terminal will display something like:

Local:   http://localhost:5173/


Open this link to see the application running.

📂 Project Structure
blushify/
│
├─ public/           # Static assets (images, icons) e.g., shampoo bottle
├─ src/
│   ├─ components/   # Reusable React components
│   ├─ pages/        # Site pages (Home, Product, Cart)
│   ├─ data/         # Product data (JSON)
│   ├─ App.jsx       # Main React component
│   └─ main.jsx      # Vite entry point
├─ package.json
├─ vite.config.js
└─ README.md

🎨 Customization

To add new products, edit src/data/products.json.

To change styling, edit CSS/SCSS files in src/components or src/pages.

Replace product images in public/ (e.g., shampoo bottle icons/images).

⚙️ Production Build

To create an optimized production version:

npm run build


The output will be in the dist/ folder, ready for deployment on any static hosting.

📌 Notes

Built with Vite + React for high performance and fast loading.

Fully responsive, designed for desktop, tablet, and mobile.

Product icons can be easily updated in the public/ folder (now using a shampoo bottle instead of lipstick).
