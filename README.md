# F1 Telemetry App

A real-time, responsive Formula 1 telemetry and statistics dashboard built using modern web technologies. This application provides insights into live driver telemetry, constructor profiles, track/circuit layouts, and up-to-date F1 news.

## Features

- **Live Driver Telemetry**: Visualize speed, RPM, throttle, and brake data in real-time line charts for any driver using the OpenF1 API.
- **Constructor Profiles**: Detailed statistics for all teams (including the 2026 grid updates), mapping chassis, power units, bases, and world championship titles.
- **Circuits & Calendar**: Interactive layout mapping the schedule of race meetings across the calendar year, featuring unified track diagrams.
- **F1 News**: Fetches recent Formula 1 stories, analysis, and paddock updates.
- **Custom UI Components**: Themed heavily with high-contrast, dark-mode racing aesthetics, including a custom speedometer loader and bespoke statistics cards.

## Tech Stack

This project was built leveraging the following stack:

- **Framework**: React 18 with Vite (TypeScript).
- **Styling**: Tailwind CSS (Utility-first CSS framework for rapid UI development) & Lucide React for consistent iconography.
- **Data Visualization**: Recharts (Composed React chart components) to display telemetry timelines.
- **Data Fetching**: Custom React hooks utilizing `fetch` wrapping the [OpenF1 API](https://openf1.org) to pull real-time car/driver data.
- **Routing**: React Router DOM (v6) for seamless client-side single-page transitions.

## Project Architecture

- `/src/components`: Reusable UI components like `Sidebar`, `Loader` (featuring a custom rotating F1 needle animation), and chart wrappers.
- `/src/pages`: Distinct route views including `Overview`, `Drivers`, `Teams`, `Tracks`, and `News`.
- `/src/hooks`: Custom abstractions such as `useOpenF1.ts` to fetch and state-manage F1 API payloads.
- `/src/types.ts`: Shared TypeScript interfaces mapping exactly to the OpenF1 endpoints.

## Contributing

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally: `git clone https://github.com/<your-username>/f1-telemetry-app.git`
3. **Install dependencies**: `npm install`
4. **Create a new branch** for your feature or bug fix: `git checkout -b feature/my-new-feature`
5. **Start the development server**: `npm run dev`
6. Make your changes and test them thoroughly in the browser at `http://localhost:3000`
7. **Commit your changes**: `git commit -m 'Add some feature'`
8. **Push to the branch**: `git push origin feature/my-new-feature`
9. **Submit a Pull Request** against the main repository.

## Running Locally

To run this project locally, simply clone the repository and run:

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` to view the app in your browser.
