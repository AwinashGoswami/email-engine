# Email Client Core System

## Overview

This project is a core system for an email client that connects to user email accounts (initially focusing on Outlook) and manages email data efficiently. The system includes functionalities for user authentication, email data synchronization, and real-time updates.

## Features

- User authentication with Outlook using OAuth2
- Synchronize email data from Outlook to a local Elasticsearch database
- Real-time monitoring for changes in user email data
- API endpoints for user management and email retrieval
- Scalable and efficient architecture

## Technologies Used

- Node.js
- Express.js
- Passport.js
- Elasticsearch
- Kibana
- Docker

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- Docker
- Docker Compose

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/email-client-core.git
    cd email-client-core
    ```

2. Create a `.env` file in the `src` directory and populate it with your configuration:

    ```plaintext
    OUTLOOK_CLIENT_ID=your_client_id
    OUTLOOK_CLIENT_SECRET=your_client_secret
    CALLBACK_URL=http://localhost:3000/auth/outlook/callback
    ELASTICSEARCH_URL=http://localhost:9200
    SESSION_SECRET=your_session_secret
    ```

3. Build and start the Docker containers:

    ```sh
    docker-compose up --build
    ```

### Project Structure

```plaintext
email-client-core/
├── src/
│   ├── config/
│   │   ├── elasticsearch.js
│   │   ├── passport.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── email.js
│   ├── services/
│   │   ├── outlookService.js
│   ├── app.js
│   └── .env
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```


# Running the Application

Access the application at http://localhost:3000.
Upon successful authentication, your email data will be synchronized with the local Elasticsearch database.

## API Endpoints

### Authentication
GET /auth/outlook - Redirects to Outlook for authentication
GET /auth/outlook/callback - Callback URL for Outlook authentication

### Email Management
GET /emails - Retrieves synchronized emails from Elasticsearch