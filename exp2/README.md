# Responsive Material UI Application

A fully responsive user interface built with Material UI, styled-components, and React.

## Features

### a. Landing Page
- Responsive layout using Material UI Grid, Container, and Typography
- Sections stack on mobile (xs breakpoint)
- Side-by-side layout on larger screens (md+ breakpoints)
- Breakpoint-based responsive design

### b. Dashboard
- Responsive top navbar with Material UI AppBar
- Collapsible sidebar (drawer on mobile, permanent on desktop)
- Card grid with auto-adjusting columns using styled-components
- CSS Grid with `auto-fit` and `minmax()` for responsive columns

### c. Admin Panel
- Light/Dark theme switching using Material UI ThemeProvider
- Styled overrides for Button, Card, and AppBar components
- Multi-panel layout that collapses to single column on mobile
- Theme-aware styled-components integration

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Navigation

- `/` - Landing Page
- `/dashboard` - Dashboard with sidebar
- `/admin` - Admin Panel with theme switcher

## Technologies

- React 18
- Material UI 5
- styled-components
- React Router
- Vite

## Responsive Breakpoints

- xs: 0px (mobile)
- sm: 600px (tablet)
- md: 900px (desktop)
- lg: 1200px (large desktop)
- xl: 1536px (extra large)
