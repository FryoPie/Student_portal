# Deployment Guide - Student Achievement Portal

## Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- PostgreSQL database
- Git

---

## Local Development Setup

### Backend Setup

1. **Navigate to the project root:**
```bash
cd project
```

2. **Create and activate a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**
Create a `.env` file in the project root:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/student_portal
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

5. **Run migrations:**
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

6. **Create a superuser:**
```bash
python manage.py createsuperuser
```

7. **Run the development server:**
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

---

### Frontend Setup

1. **Navigate to the frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Production Deployment

### Option 1: Deploy to Render

#### Backend Deployment

1. **Create a new Web Service on Render**

2. **Connect your Git repository**

3. **Configure the service:**
   - **Name:** student-portal-backend
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `cd backend && gunicorn backend.wsgi:application`
   - **Root Directory:** Leave empty or set to your repository root

4. **Add environment variables:**
   ```
   SECRET_KEY=<generate-a-strong-secret-key>
   DEBUG=False
   DATABASE_URL=<your-postgresql-database-url>
   ALLOWED_HOSTS=<your-render-url>.onrender.com
   CORS_ALLOWED_ORIGINS=<your-frontend-url>
   ```

5. **Create a PostgreSQL database on Render:**
   - Go to Dashboard > New > PostgreSQL
   - Copy the Internal Database URL
   - Use it as `DATABASE_URL` in your web service

6. **Add a build script** (create `build.sh` in project root):
   ```bash
   #!/usr/bin/env bash
   set -o errexit

   pip install -r requirements.txt
   cd backend
   python manage.py collectstatic --no-input
   python manage.py migrate
   ```

7. **Make the script executable:**
   ```bash
   chmod +x build.sh
   ```

8. **Update Build Command to:** `./build.sh`

#### Frontend Deployment

1. **Create a new Static Site on Render**

2. **Configure the service:**
   - **Name:** student-portal-frontend
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`

3. **Add environment variables:**
   ```
   VITE_API_URL=<your-backend-url>.onrender.com
   ```

4. **Update `frontend/vite.config.js` for production:**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5173,
       proxy: {
         '/api': {
           target: process.env.VITE_API_URL || 'http://localhost:8000',
           changeOrigin: true,
         },
         '/media': {
           target: process.env.VITE_API_URL || 'http://localhost:8000',
           changeOrigin: true,
         }
       }
     }
   })
   ```

---

### Option 2: Deploy to Railway

#### Backend Deployment

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Create a new project:**
```bash
railway init
```

4. **Add PostgreSQL:**
```bash
railway add -p postgres
```

5. **Deploy:**
```bash
railway up
```

6. **Set environment variables:**
```bash
railway variables set SECRET_KEY=<your-secret-key>
railway variables set DEBUG=False
railway variables set ALLOWED_HOSTS=<your-railway-domain>
railway variables set CORS_ALLOWED_ORIGINS=<your-frontend-url>
```

#### Frontend Deployment

1. **Create a separate Railway project for frontend**

2. **Configure build settings:**
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Start Command:** `npm run preview` (or use a static server)
   - **Root Directory:** frontend

3. **Set environment variables:**
```bash
railway variables set VITE_API_URL=<your-backend-railway-url>
```

---

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | `django-insecure-xyz...` |
| `DEBUG` | Debug mode | `True` or `False` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `ALLOWED_HOSTS` | Allowed host domains | `localhost,yourapp.com` |
| `CORS_ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:5173,https://yourfrontend.com` |

### Frontend

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.yourapp.com` |

---

## Post-Deployment Checklist

- [ ] Database migrations are applied
- [ ] Superuser account is created
- [ ] Static files are served correctly
- [ ] Media files upload directory is configured
- [ ] CORS is properly configured
- [ ] SSL/HTTPS is enabled
- [ ] Environment variables are set correctly
- [ ] Database backups are configured
- [ ] Error monitoring is set up (optional: Sentry)

---

## Troubleshooting

### Backend Issues

**Problem:** Database connection errors
- **Solution:** Verify `DATABASE_URL` is correct and database is accessible

**Problem:** Static files not loading
- **Solution:** Run `python manage.py collectstatic` and verify `STATIC_ROOT` setting

**Problem:** CORS errors
- **Solution:** Check `CORS_ALLOWED_ORIGINS` includes your frontend URL

### Frontend Issues

**Problem:** API calls failing
- **Solution:** Verify `VITE_API_URL` is set correctly and backend is accessible

**Problem:** Build fails
- **Solution:** Clear node_modules and reinstall: `rm -rf node_modules && npm install`

---

## Maintenance

### Database Backups

**For Render:**
- Backups are automatic for paid PostgreSQL plans
- Use Render dashboard to create manual backups

**For Railway:**
- Use Railway's built-in backup feature
- Or set up `pg_dump` cronjob

### Updating the Application

1. **Pull latest changes:**
```bash
git pull origin main
```

2. **Update backend:**
```bash
cd backend
python manage.py migrate
python manage.py collectstatic --no-input
```

3. **Update frontend:**
```bash
cd frontend
npm install
npm run build
```

4. **Restart services** on your hosting platform

---

## Security Best Practices

1. **Never commit secrets** to version control
2. **Use strong SECRET_KEY** in production
3. **Enable HTTPS** on all production domains
4. **Keep dependencies updated:** `pip list --outdated` and `npm outdated`
5. **Regular security audits:** `pip-audit` and `npm audit`
6. **Set up rate limiting** for API endpoints
7. **Enable database SSL** connections
8. **Use environment-specific settings**

---

## Monitoring and Logging

### Recommended Tools

- **Error Tracking:** Sentry
- **Performance Monitoring:** New Relic, DataDog
- **Uptime Monitoring:** UptimeRobot, Pingdom
- **Log Management:** Papertrail, Loggly

### Django Logging Configuration

Add to `settings.py`:
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': 'django_errors.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
```

---

## Support

For issues and questions:
- Check the API documentation: `API_DOCUMENTATION.md`
- Review Django logs: `backend/django_errors.log`
- Check browser console for frontend errors
- Verify all environment variables are set correctly
