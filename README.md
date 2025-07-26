# JSON Modal Manager

A React + Material UI application to manage multiple components, each with **Action** and **Demo** JSON inputs.

You can:  
✅ Add multiple components  
✅ Save JSON per component (Action/Demo)  
✅ Reset the entire view  
✅ Download/Upload JSON state  
✅ Fully responsive layout with performance optimization

---

## 🚀 Features

- **Add & Manage Components**
    - Each component has its own Action & Demo JSON modal
    - Saved JSON changes button style (outlined → solid)

- **Reset, Download, Upload**
    - Reset clears all components
    - Download saves all components as `components.json`
    - Upload restores state in the same order

- **Performance Optimized**
    - `React.memo` & `useCallback` prevent unnecessary re-renders
    - Auto-remount grid after reset/upload

- **Better UX**
    - Component counter in header
    - Indexed titles (`Component #1`, `Component #2`)
    - JSON validation in modal

---

## 🛠️ Tech Stack

- **React 18+** (with hooks)
- **Material UI (MUI v5)** for styling
- **Vite** for fast development & build
- **React Testing Library + Jest** for testing

---

## 📦 Installation

Clone the repo:

```bash
git clone https://github.com/ssnnaruka/JSON-Modal-Manager.git
cd JSON-Modal-Manager
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🖥️ Usage

- **Add Component** → Click in the header
- **Edit JSON** → Click Action or Demo → modal opens
- **Reset** → Clears all components (shows Empty State)
- **Download** → Downloads `components.json`
- **Upload** → Restores state from a previously downloaded file


---

## 📁 Project Structure

```
src/
 ├── components/
 │   ├── PrimaryComponent.jsx    # Component card
 │   ├── JsonModal.jsx           # Modal for JSON input
 │   ├── Header.jsx              # Header with Add button & counter
 │   └── Footer.jsx              # Footer with Reset/Download/Upload
 │
 ├── hooks/
 │   └── useComponentsState.js   # State & business logic
 │
 ├── App.jsx                     # Main container with Grid layout
 ├── AppContext.jsx              # Context provider (if needed)
 │
 └── main.jsx                    # React entry point
```

---

## 📝 JSON File Format

When downloading, JSON looks like:

```json
[
  {
    "id": "unique-id-1",
    "actionJson": { "example": true },
    "demoJson": null
  },
  {
    "id": "unique-id-2",
    "actionJson": null,
    "demoJson": { "demoKey": 123 }
  }
]
```

When uploading:
- Order is preserved
- New `id`s are generated internally

---

## ✅ Future Improvements

- ✅ JSON Schema validation
- ✅ TypeScript migration
- ✅ Persistent storage (localStorage or backend)
- ✅ Dark mode toggle

---

## 🏗️ Development Notes

- Upload after reset is safe → always forces new IDs
- Grid remounts after reset/upload to avoid React reconciliation issues
- Modal prevents saving invalid JSON

---

## 🖊️ License

MIT © Saurabh S Naruka
