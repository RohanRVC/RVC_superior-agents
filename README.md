# AutoFounder OS - Frontend

A modern React frontend for AutoFounder OS, an autonomous agent system that turns ideas into complete codebases.

## Features

- 🎨 Modern UI with React and Tailwind CSS
- 🌓 Dark/light mode toggle
- 📱 Fully responsive design
- 📊 Project management and visualization
- 🖥️ Live terminal output
- 📁 File browser and code preview

## Project Structure

```
autofounder/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── api/        # API integration
│   │   └── utils/      # Utility functions
│   ├── public/         # Static assets
│   └── ...
├── backend/            # Flask backend adapter
│   └── app.py          # API endpoints
├── agent/              # Existing AutoFounder agent code
├── docker-compose.yml  # Docker configuration
└── README.md          # Project documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 16+ (for local development)

### Running with Docker

The easiest way to run the complete application is using Docker Compose:

```bash
docker-compose up
```

This will start both the frontend and backend services. The frontend will be available at http://localhost:3000.

### Local Development

To run the frontend locally:

```bash
cd frontend
npm install
npm run dev
```

To run the backend locally:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Environment Variables

Frontend (`.env` in frontend directory):
- `VITE_API_URL` - URL of the backend API

## Pages

- **Home** (`/`) - Overview and introduction to AutoFounder
- **About** (`/about`) - Details about the tool and its architecture
- **Build** (`/build`) - Form to create new projects
- **Projects** (`/projects`) - List of all projects
- **Project Detail** (`/projects/:id`) - View files and details of a specific project
- **Logs** (`/logs/:id`) - View build logs for a project
- **Contact** (`/contact`) - Contact information

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/build` - Start a new build
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details
- `GET /api/projects/:id/logs` - Get project logs
- `GET /api/projects/:id/files` - Get project files
- `GET /api/projects/:id/files/:path` - Get file content
- `GET /api/projects/:id/download` - Download project as zip

## License

This project is licensed under the MIT License - see the LICENSE file for details.