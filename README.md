# Product Manager - Senior Frontend Test

## Tech stack

- Next.js 14
- TypeScript (strict)
- Tailwind
- Zustand
- MSW (mock API)
- Clean Architecture

## Architecture decisions

Project structured using Clean Architecture principles:

- domain → business rules
- infra → API communication
- features → UI and hooks
- store → global state
- shared → design system

This separation ensures scalability, maintainability and testability.

## Features

- Product listing
- Create product
- Filtering by name and price
- Sorting
- Responsive layout
- Global state
- Snapshot test

## Run project

yarn install  
yarn dev
