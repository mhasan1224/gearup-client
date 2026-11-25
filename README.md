# GearUp Rentals — Frontend

A modern equipment rental platform built with Next.js, React, and TypeScript. GearUp allows customers to discover and rent equipment while owners can manage their listings and administrators can oversee platform activities.

## Features

- **Authentication:** Secure sign-up and sign-in with Better Auth.
- **Equipment Marketplace:** Browse, search, filter, and view equipment details.
- **Role-Based Dashboard:** Separate dashboard experiences for Customers, Owners, and Admins.
- **Equipment Management:** Owners can add, update, and manage their equipment listings.
- **Favorites:** Save and manage favorite equipment.
- **Rental Management:** Customers can manage their rentals and Owners can handle rental requests.
- **Online Payments:** Stripe-powered checkout experience.
- **Analytics:** Dashboard analytics for Owners and Admins.
- **User Management:** Admins can manage platform users and roles.
- **Theme Settings:** Light Mode, Dark Mode, and System Default.
- **Notifications:** Toast notifications for user feedback.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| shadcn/ui | UI components |
| Base UI | Accessible component primitives |
| Framer Motion | Animations |
| Lucide React | Icons |
| Better Auth | Authentication |
| next-themes | Theme management |
| Sonner | Toast notifications |

## Getting Started

### Prerequisites

- Node.js
- npm
- A running GearUp backend server

### 1. Clone the Repository

```bash
git clone https://github.com/mhasan1224/gearup-client.git
cd gearup-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
```

Update the URLs according to your backend configuration.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Backend Integration

The frontend communicates with the GearUp Express API.

**Local backend:** `http://localhost:5000`

**Production backend:** `https://gearup-server-three.vercel.app`

For local development, the frontend uses the local backend. Production requests are configured to use the deployed backend through Next.js rewrites.

## Theme Preferences

GearUp supports three appearance settings:

- **Light Mode:** Always use the light theme.
- **Dark Mode:** Always use the dark theme.
- **System Default:** Automatically follow the operating system's appearance.

Theme preferences persist across page refreshes.

## Deployment

The frontend is deployed on Vercel.

**Live Website:**  
https://gearup-client-iota.vercel.app

## Related Repository

**Backend Repository:**  
https://github.com/mhasan1224/gearup-server

---

Developed as part of Programming Hero Assignment 09 — Category 003.