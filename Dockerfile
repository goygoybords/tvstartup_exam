# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Pipfile and Pipfile.lock into the container at /app
COPY Pipfile Pipfile.lock /app/

# Install pipenv and install dependencies from Pipfile
RUN pip install --upgrade pip
RUN pip install pipenv
RUN pipenv install --deploy --ignore-pipfile

# Copy the current directory contents into the container at /app
COPY . /app/

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Run database migrations
RUN pipenv run python manage.py migrate

# Collect static files
RUN pipenv run python manage.py collectstatic --noinput

# Command to run the Django application
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
