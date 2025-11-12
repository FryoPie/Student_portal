#!/bin/bash

echo "Starting build process..."

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Running database migrations..."
cd backend
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Build completed successfully!"