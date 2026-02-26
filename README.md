# 📊 Business Costing System

A full-stack **Business Costing System** for calculating accurate product costs by combining **raw materials, labor, utilities, and other business expenses**.

---

## 🚀 Features

### Raw Materials
- Add / edit / delete raw materials
- Define pack unit → base unit conversion
- Store price per pack and units per pack
- Automatic cost per base unit calculation

### Labor Costs
- Define labor roles
- Set hourly or daily wages
- Track working hours
- Automatic labor cost per batch / product

### Utilities
- Track monthly utilities:
  - Electricity
  - Water
  - Gas
  - Internet
  - Rent
- Distribute utility costs per batch or product

### Other Expenses
- Track operational expenses:
  - Packaging
  - Transportation
  - Maintenance
  - Supplies
- Supports quantity-based and fixed costs

### Product Costing
- Combines:
  - Raw materials
  - Labor
  - Utilities
  - Other expenses
- Calculates:
  - Cost per batch
  - Cost per unit

### Dashboard
- Total raw material cost
- Total labor cost
- Utilities & overhead
- Overall production cost

### Authentication
- JWT-based authentication
- Protected routes
- Token expiration handling

### API
- RESTful backend
- Frontend–backend separation

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- Headless UI
- Lucide Icons
- React Hooks:
  - useState
  - useEffect
  - useReducer
  - useMemo
- Custom hooks

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
