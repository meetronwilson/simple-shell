# Simple Shell - Next.js Layout System

A modern, responsive layout system built with Next.js 14, featuring a dynamic sidebar, header, and detail panel components. This project implements a flexible layout system that can be used for various web applications.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 🔄 Dynamic sidebar with collapsible functionality
- 📊 Dashboard layout with header and detail panel
- 🎯 Customer management interface
- 🎭 Theme customization support

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- React Context API

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/meetronwilson/simple-shell.git
cd simple-shell
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
simple-shell/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── dashboard/         # Dashboard page
│   │   ├── customers/         # Customers page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # UI components
│   ├── context/              # React context
│   ├── hooks/                # Custom hooks
│   └── lib/                  # Utility functions
├── styles/                   # Global styles
└── public/                   # Static assets
```

## Features in Detail

### Layout System

The project implements a flexible layout system with the following components:

- **AppLayout**: Main layout wrapper
- **Sidebar**: Collapsible navigation sidebar
- **Header**: Top navigation bar with user menu
- **DetailPanel**: Right-side panel for additional content
- **MainContainer**: Main content area

### Theme Support

The application supports both light and dark modes using the theme provider component. The theme can be toggled using the theme switcher in the header.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
