# GitHub Copilot Custom Instructions

Welcome to the Choreboard project! This file provides custom instructions for GitHub Copilot to help generate code and documentation that matches our project's style, architecture, and best practices.

## General Guidelines

- Follow the architecture and design principles outlined in `ARCHITECTURE.md` and `DESIGN.md`.
- Use clear, descriptive variable and function names.
- Prefer functional, modular code.
- Write concise comments where logic may not be obvious.
- For React components, use functional components and hooks.
- For shell scripts, prefer POSIX-compliant syntax when possible.
- Foe shell scripts, if a new library is needed please add it to the Brewfile and update the Readme accordingly
- **Prefer unit testing for every new code module.**
- **Ensure every build runs unit tests, especially for React components.**

## Project-Specific Notes

- Backend data is managed via Google Sheets and Apps Script.
- The frontend is built with React (Next.js) and integrates with Google OAuth.
- Utilities and automation scripts are in the `utilities/` directory.

---

Add more detailed instructions below as the project evolves.
