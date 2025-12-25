
   # 💎 Aurum Elite | Luxury Jewellery Management

![License](https://img.shields.io/badge/License-Private-amber)
![Version](https://img.shields.io/badge/Version-1.0.0-gold)
![Build](https://img.shields.io/badge/Build-Passing-emerald)

**Aurum Elite** is an enterprise-grade inventory management and CRM solution designed specifically for high-end boutique jewellers and gold bullion traders. Inspired by the minimalist elegance of luxury showrooms, it combines sophisticated aesthetics with powerful AI-driven cataloging and real-time asset valuation.

---

## ✨ Core Modules

### 🏛️ Luxury Inventory Suite
*   **Asset Cataloging**: High-fidelity tracking of rings, necklaces, watches, and rare gems.
*   **Gold Bullion Tracking**: Real-time management of precious metal stock with purity (Karat) and weight verification.
*   **Visual Showroom**: A crisp, light-themed interface designed for boutique readability and sophisticated client presentations.

### 🤖 AI-Assisted Management (Gemini API)
*   **Smart Taglines**: Automated generation of exquisite product descriptions focusing on heritage and craftsmanship.
*   **Catalogue Automation**: Rapidly seed entire collections with AI-generated demo products tailored to specific asset classes.
*   **Insight Engine**: Intelligent suggestions on portfolio re-evaluation based on market trends.

### 👥 Enterprise CRM & Security
*   **Role-Based Access Control (RBAC)**: Distinct permissions for *Admins* (Full Vault Control) and *Editors* (Catalogue Management).
*   **Secure Authentication**: Encrypted credential handling for authorized personnel.
*   **Audit Logging**: Track arrival dates and modification history for every masterpiece in the collection.

### 📊 Professional Reporting
*   **Portfolio Valuation**: Instant calculation of total stock value.
*   **CSV Export**: One-click generation of appraisal-ready stock reports.
*   **API Blueprinting**: Includes a comprehensive **Postman Collection** for backend testing and third-party integration.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Angular / React with Tailwind CSS |
| **Icons** | Lucide React |
| **AI Engine** | Google Gemini API (@google/genai) |
| **Backend** | Node.js / Express |
| **Database** | PostgreSQL / MySQL (RDBMS) |
| **Documentation** | Postman v2.1 |

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18+)
*   RDBMS Instance (PostgreSQL or MySQL)
*   Gemini API Key

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Rahul214-Coder/Aurum-Elite-App

# Navigate to directory
cd Aurum-Elite-App

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your API_KEY and DB_CREDENTIALS
```

### 3. Database Migration
```bash
npm run migrate:up
```

### 4. Launch
```bash
npm run dev
```

---

## 🔌 API Testing
For backend verification, import the provided `aurum_elite.postman_collection.json` located in the root directory into your Postman client.

**Available Endpoints:**
*   `POST /api/auth/login` - Secure Access
*   `GET /api/items` - Paginated Catalogue
*   `POST /api/items/create` - Register Masterpiece
*   `DELETE /api/items/:id` - De-list Asset

---

## 📜 License
This project is proprietary and intended for authorized luxury retailers. 

© 2024 Aurum Elite International. All Rights Reserved.

