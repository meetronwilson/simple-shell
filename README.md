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
- 📋 Kanban board with drag-and-drop
- 📅 Calendar integration
- 🔍 Search functionality in components
- 🗺️ Dynamic breadcrumb navigation
- 📊 Advanced data tables with sorting and filtering

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- React Context API
- React Beautiful DND
- React Hook Form
- TanStack Table

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
│   │   ├── calendar/         # Calendar page
│   │   ├── kanban/          # Kanban board page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   ├── kanban/          # Kanban components
│   │   ├── calendar/        # Calendar components
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
- **Breadcrumbs**: Dynamic breadcrumb navigation

### Kanban Board

A fully-featured Kanban board implementation with:

- Drag-and-drop functionality
- Customizable lanes
- Search and filtering
- Custom card rendering
- Priority indicators
- Assignee avatars
- Due dates

### Calendar Integration

Interactive calendar component with:

- Event management
- Day/Week/Month views
- Event details
- Custom styling

### Theme Support

The application supports both light and dark modes using the theme provider component. The theme can be toggled using the theme switcher in the header.

### UI Components

Extensive collection of UI components from shadcn/ui:

- Buttons, Inputs, and Forms
- Modals and Dialogs
- Navigation menus
- Dropdowns and Select
- Cards and Containers
- And many more...

### Data Tables

Feature-rich data table implementation with:

- Column sorting and filtering
- Pagination controls
- Custom column rendering
- Responsive design
- Search functionality
- Projects and tasks examples
- Column visibility toggle
- Row selection

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
