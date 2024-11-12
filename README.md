# 🚀 Clean Architecture Express and TypeScript Boilerplate 2024

[![Build](https://github.com/DevJohanAdrian/clean-architecture-express-boilerplate/actions/workflows/build.yml/badge.svg)](https://github.com/DevJohanAdrian/clean-architecture-express-boilerplate/actions/workflows/build.yml)
[![Test](https://github.com/DevJohanAdrian/clean-architecture-express-boilerplate/actions/workflows/test.yml/badge.svg)](https://github.com/DevJohanAdrian/clean-architecture-express-boilerplate/actions/workflows/test.yml)
[![Code Quality](https://github.com/DevJohanAdrian/clean-architecture-express-boilerplate/actions/workflows/code-quality.yml/badge.svg)](https://github.com/DevJohanAdrian/clean-architecture-express-boilerplate/actions/workflows/code-quality.yml)
[![Docker Image CI](https://github.com/DevJohanAdrian/clean-architecture-express-boilerplate/actions/workflows/docker-image.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml)

``` code
Hey There! 🙌 
🤾 that ⭐️ button if you like this boilerplate. 
```
## ☢ Disclaimer
This boilerplate was built using another boilerplate as its foundation, as the decision was made to not start from scratch, but rather leverage an existing structure without a defined architecture. The choice to base the project on an available boilerplate helped accelerate the development process by adopting the most suitable elements to build a more robust architecture. For more information, you can check the base repository here.

 👉 https://github.com/edwinhern/express-typescript-2024

## 🌟 Introduction

Welcome to the Clean Architecture Boilerplate 2024 – a modern, scalable, and maintainable foundation for building backend services. Built on the principles of Clean Architecture, this boilerplate is designed to provide a clear separation of concerns, making it easy to scale and maintain your codebase over time. Leveraging TypeScript for type safety and Express.js for fast and flexible API development, this framework follows best practices to ensure high-quality code that is testable, adaptable, and easy to extend.

## 🔮 Motivation

This boilerplate is designed to:

- ⚙️ Accelerate project setup with a clean and modular structure
- 📏 Maintain high code consistency, readability, and scalability
- 🚀 Enable rapid development by following best practices and patterns
- 🔒 Promote robust security, comprehensive testing, and optimal performance


## 🚀 Features
- 📁 Modular Structure: Organized by feature for easy navigation and scalability
- ⚡ Faster Execution with tsx: Rapid TypeScript execution with tsx and type checking with tsc
- 🌍 Stable Node Environment: Latest LTS Node version in .nvmrc
- 🛠️ Simplified Environment Variables: Managed with Envalid for easier configuration
- 🔗 Path Aliases: Cleaner code with shortcut imports for improved maintainability
- 🔄 Renovate Integration: Automatic updates for dependencies to keep your project up-to-date
- 🔒 Security: Helmet for HTTP header security and CORS setup to protect your application
- 📊 Logging: Efficient logging with pino-http for better observability
- 🧪 Comprehensive Testing: Setup with Vitest and Supertest for reliable testing coverage
- 🛡️ Code Quality Assurance: Husky and lint-staged for consistent quality and pre-commit hooks
- 🎯 Unified Code Style: Biomejs for consistent coding standards across the project
- 📑 API Response Standardization: ServiceResponse class for consistent API responses
- 🐳 Docker Support: Ready for containerization and deployment with Docker
- 📝 Input Validation with Zod: Strongly typed request validation using Zod
- 📖 Swagger UI: Interactive API documentation generated from Zod schemas for easy exploration

## 🛠️ Getting Started

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/DevJohanAdrian/clean-architecture-express-boilerplate`
- Navigate: `cd clean-architecture-express-boilerplate`
- Install dependencies: `npm ci`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`

## 🤝 Feedback and Contributions

We'd love to hear your feedback and suggestions for further improvements. Feel free to contribute and join us in making backend development cleaner and faster!

🎉 Happy coding!
