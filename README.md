# Football Market Predictor

A decentralized football prediction market platform built with Next.js 15.

## Features

- 🎯 Place predictions on football matches
- 💰 Real-time odds and market pools
- 📊 Dashboard with prediction tracking
- 🔒 Wallet integration (MetaMask support)
- ⚡ Built with Next.js App Router
- 🎨 Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd football
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
football/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/            # React components
│   └── landing-page.tsx  # Landing page component
├── hooks/                 # Custom React hooks
│   └── use-wallet.tsx    # Wallet connection hook
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
├── public/               # Static assets
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.mjs       # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Notifications:** Sonner

## License

MIT
