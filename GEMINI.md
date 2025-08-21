# Project Overview

This is an Angular application for tracking production. It allows users to register production, view production summaries, and generate payrolls. The application uses a PHP backend for data storage and retrieval.

## Building and Running

### Development Server

To start a local development server, run:

```bash
npm start
```

This will start a development server on `http://localhost:4200/`.

### Building for Production

To build the project for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploying

To deploy the application, run:

```bash
npm run deploy
```

This will first build the application and then execute the `deploy.sh` script.

### Running Unit Tests

To run unit tests, use the following command:

```bash
npm test
```

## Development Conventions

The project follows the standard Angular project structure.

*   **Components:** Components are located in the `src/app` directory, with each component in its own subdirectory.
*   **Services:** Services, like the `RestService` for backend communication, are located in the `src/app` directory.
*   **Routing:** The application's routes are defined in the `src/app/app.routes.ts` file.
*   **Styling:** Global styles are located in the `src/global_styles` directory. Component-specific styles are located in the component's subdirectory.
