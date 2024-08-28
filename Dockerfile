# Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Pipfile and Pipfile.lock into the container at /app
COPY Pipfile Pipfile.lock /app/

# Install pipenv and dependencies
RUN pip install --upgrade pip
RUN pip install pipenv
RUN pipenv install --deploy --ignore-pipfile

# Copy the entire project files into the container
COPY . /app/

# Expose Django's port
EXPOSE 8000

# Run database migrations and collect static files
RUN pipenv run python manage.py migrate
RUN pipenv run python manage.py collectstatic --noinput

# Start Django server
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]

