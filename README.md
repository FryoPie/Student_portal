# Student Achievement Portal

A complete, production-ready web application for students to showcase their achievements and for coordinators to verify them. Built with Django REST Framework and React with Material-UI.

## Features

### For Students
- **User Registration & Authentication** - JWT-based secure authentication with role selection
- **Profile Management** - Create and update detailed student profiles with profile pictures
- **Achievement Tracking** - Submit achievements with proof documents across multiple categories
- **Real-time Notifications** - Get notified when achievements are verified or rejected
- **Public Profiles** - Share your profile and verified achievements publicly

### For Coordinators
- **Verification Dashboard** - Review and verify pending student achievements
- **Bulk Operations** - Efficiently manage multiple achievement submissions
- **Feedback System** - Provide verification notes and feedback to students

### General
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI/UX** - Clean Material-UI components with intuitive navigation
- **Public Access** - View student profiles and verified achievements without authentication
- **Role-based Access Control** - Secure endpoints based on user roles

## Tech Stack

### Backend
- **Django 4.2** - Python web framework
- **Django REST Framework** - RESTful API toolkit
- **PostgreSQL** - Production database
- **JWT Authentication** - djangorestframework-simplejwt
- **File Upload Support** - Pillow for image handling

### Frontend
- **React 18** - Modern JavaScript library
- **Material-UI v5** - Professional React UI framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Vite** - Fast build tool and dev server

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend Setup

1. **Create a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables:**
Create a `.env` file in the project root:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/student_portal
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

4. **Run migrations:**
```bash
cd backend
python manage.py migrate
```

5. **Create a superuser:**
```bash
python manage.py createsuperuser
```

6. **Start the server:**
```bash
python manage.py runserver
```

Backend runs at `http://localhost:8000`

### Frontend Setup

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Start development server:**
```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

## Project Structure

```
project/
├── backend/
│   ├── backend/              # Django project settings
│   ├── users/                # User authentication app
│   ├── profiles/             # Student profiles app
│   ├── achievements/         # Achievements & notifications app
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── contexts/         # React contexts (Auth)
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── requirements.txt
├── API_DOCUMENTATION.md      # Complete API reference
└── DEPLOYMENT.md             # Deployment guide
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/me/` - Get current user

### Profiles
- `GET /api/profiles/` - List all profiles (public)
- `GET /api/profiles/{id}/` - Get profile by ID (public)
- `GET /api/profiles/me/` - Get current user's profile
- `PATCH /api/profiles/{id}/` - Update profile

### Achievements
- `GET /api/achievements/list/` - List achievements (public, filterable)
- `POST /api/achievements/list/` - Create achievement
- `GET /api/achievements/list/my_achievements/` - Get user's achievements
- `GET /api/achievements/list/pending/` - Get pending achievements (coordinators)
- `POST /api/achievements/list/{id}/verify/` - Verify achievement (coordinators)
- `PATCH /api/achievements/list/{id}/` - Update achievement
- `DELETE /api/achievements/list/{id}/` - Delete achievement

### Notifications
- `GET /api/achievements/notifications/` - Get user's notifications
- `POST /api/achievements/notifications/{id}/mark_read/` - Mark as read
- `POST /api/achievements/notifications/mark_all_read/` - Mark all as read

See `API_DOCUMENTATION.md` for complete API reference.

## Key Features Implementation

### JWT Authentication
- Access tokens valid for 1 day
- Refresh tokens valid for 7 days
- Automatic token refresh on 401 responses
- Role-based access control

### File Uploads
- Profile pictures for student profiles
- Proof documents for achievements
- Proper file validation and storage

### Notifications
- Automatic notifications on achievement status changes
- Real-time badge counter in navigation
- Mark as read functionality

### Public Access
- Student profiles viewable without authentication
- Verified achievements displayed publicly
- SEO-friendly profile URLs

## User Roles

### Student
- Create and manage profile
- Submit achievements
- View own achievement status
- Receive notifications

### Coordinator
- Review pending achievements
- Verify or reject submissions
- Add verification notes
- View all student profiles

## Development

### Running Tests
```bash
cd backend
python manage.py test
```

### Building for Production
```bash
cd frontend
npm run build
```

### Database Migrations
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## Deployment

See `DEPLOYMENT.md` for comprehensive deployment instructions for:
- Render
- Railway
- Heroku
- Custom VPS

## Environment Variables

### Backend
- `SECRET_KEY` - Django secret key
- `DEBUG` - Debug mode (True/False)
- `DATABASE_URL` - PostgreSQL connection string
- `ALLOWED_HOSTS` - Comma-separated allowed hosts
- `CORS_ALLOWED_ORIGINS` - Comma-separated CORS origins

### Frontend
- `VITE_API_URL` - Backend API base URL

## Security Features

- JWT token authentication
- Password hashing with Django's PBKDF2
- CORS configuration
- CSRF protection
- Role-based permissions
- Secure file upload handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Support

For detailed documentation:
- API Reference: `API_DOCUMENTATION.md`
- Deployment Guide: `DEPLOYMENT.md`

## Screenshots

The application features:
- Clean, professional login and registration pages
- Intuitive dashboard with achievement statistics
- Comprehensive profile management with image uploads
- Achievement submission with file attachments
- Coordinator verification dashboard
- Beautiful public profile pages
- Real-time notification system

## Contributing

This is a production-ready MVP. Contributions are welcome for:
- Additional achievement categories
- Enhanced filtering and search
- Analytics dashboard
- Email notifications
- Social media sharing
- Export achievements to PDF

## Acknowledgments

Built with Django REST Framework, React, and Material-UI for a modern, professional user experience.
