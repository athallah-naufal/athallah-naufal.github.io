# Athallah Naufal — Interactive Civil Engineering Portfolio

A fully interactive React + Three.js experience inspired by isometric city explorers. Scroll through a living civil engineering town to discover projects across dams, bridges, irrigation systems, power infrastructure, and autonomous transit.

## Getting started

```bash
# install dependencies
npm install

# start local development server
npm run dev

# create production build
npm run build

# preview production build locally
npm run preview
```

The site uses [Vite](https://vitejs.dev/) for bundling, [React](https://react.dev/) for UI composition, and [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) with [drei](https://github.com/pmndrs/drei) helpers to render the 3D town.

## Features

- Immersive isometric town rendered in WebGL with animated vehicles, planes, and environmental motion.
- Scroll-driven narrative that highlights infrastructure focus areas as users explore the scene.
- Responsive overlay panels, timeline, and CTA sections to contextualize projects.
- Progressive enhancements for motion with reduced-motion friendly design choices.

## Deploying

Vite outputs static assets in the `dist/` folder after running `npm run build`. Serve the contents of that folder with any static hosting provider (GitHub Pages, Netlify, etc.).
