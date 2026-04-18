# CrisisBridge

CrisisBridge is a crisis response coordination platform that connects citizens, volunteers, hospitals, NGOs, and administrators through a secure web app. It supports emergency resource requests, resource inventory management, role-based dashboards, and real-time coordination.

---

## Key Features

- User authentication with JWT
- Role-based access control for Citizen, Volunteer, Hospital, NGO, and Admin
- Citizen request creation and tracking
- Volunteer request acceptance and fulfillment
- Hospital/NGO resource inventory management
- Admin user and request oversight
- MongoDB with Mongoose data models
- React + Tailwind frontend with protected routes

---

## Architecture

### Frontend
- React 18 + Vite
- Tailwind CSS styling
- React Router v6 for navigation
- Axios with auth interceptor
- Context API for authentication state

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT-based authentication
- Role-based authorization middleware
- REST API controllers for auth, requests, resources, and users

### Database Models
- `User`: name, email, password, role, location
- `Request`: resource type, description, urgency, location, status, assigned user
- `Resource`: organization ID, resource type, quantity, location

---

## Setup

### Server
1. Open `server` folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` using `.env.example`
4. Start server:
   ```bash
   npm start
   ```

### Client
1. Open `client` folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` — create a new user
- `POST /api/auth/login` — login and receive JWT token

### Requests
- `POST /api/requests` — create request (Citizen only)
- `GET /api/requests` — list requests with optional filters
- `GET /api/requests/:id` — view request details
- `PUT /api/requests/:id` — update request (owner only)
- `DELETE /api/requests/:id` — delete request (owner only)
- `PUT /api/requests/:id/accept` — accept request (Volunteer/Hospital/NGO)
- `PUT /api/requests/:id/status` — update request status

### Resources
- `POST /api/resources` — add resource (Hospital/NGO only)
- `GET /api/resources` — list resources
- `PUT /api/resources/:id` — update resource (owner only)
- `DELETE /api/resources/:id` — delete resource (owner only)

### Users
- `GET /api/users/profile` — fetch current profile
- `GET /api/users` — list all users (Admin only)
- `DELETE /api/users/:id` — delete user (Admin only)

---

## User Workflows

### Citizen
1. Register as a Citizen
2. Login
3. Create an emergency resource request
4. Track request status from Pending to Completed

### Volunteer
1. Register as a Volunteer
2. Login
3. Browse pending requests
4. Accept and fulfill requests

### Hospital / NGO
1. Register as Hospital or NGO
2. Login
3. Add and manage resource inventory
4. View available requests
5. Accept requests and update completion status

### Admin
1. Admin account access
2. View all users and requests
3. Delete users
4. Monitor system activity

---

## Authentication Flow

1. Register using `POST /api/auth/register`
2. Login using `POST /api/auth/login`
3. JWT token is stored in `localStorage`
4. Token is attached to all protected API requests with header `x-auth-token`

---

## Implementation Status

The project is implemented with the full core workflow:
- Authentication and role-based dashboards
- Request lifecycle: Pending → Assigned → Completed
- Resource inventory creation and management
- Ownership checks for updates and deletes
- Admin-only operations for user management

---

## Notes

- Use `.env.example` in `server` to set up environment variables
- The frontend uses `http://localhost:5000/api` as the API base URL
- Detailed implementation notes and workflow examples are available in `IMPLEMENTATION_STATUS.md` and `WORKFLOW_GUIDE.md`
