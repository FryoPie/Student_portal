@echo off
pip install -r requirements.txt
cd backend
python manage.py migrate
python manage.py collectstatic --no-input