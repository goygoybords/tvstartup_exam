# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container for Django
WORKDIR /app

# Copy the Pipfile and Pipfile.lock into the container at /app
COPY Pipfile Pipfile.lock /app/

# Install pipenv and install dependencies from Pipfile
RUN pip install --upgrade pip
RUN pip install pipenv
RUN pipenv install --deploy --ignore-pipfile

# Copy the entire project into the container
COPY . /app/

# Install Node.js and npm for Angular
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_21.x | bash -
RUN apt-get install -y nodejs

# Set the working directory in the container for Angular
WORKDIR /app/tvstartup-ui

# Install Angular dependencies
RUN npm install

# Build the Angular project
RUN npm run build --prod

# Move the Angular build output to Django's static files directory
RUN cp -r /app/tvstartup-ui/dist/* /app/static/

# Expose ports for Django and Angular
EXPOSE 8000 4200

# Use supervisord to run both Django and Angular simultaneously
RUN apt-get install -y supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set the working directory back to /app for Django
WORKDIR /app

# Run database migrations
RUN pipenv run python manage.py migrate

# Collect static files
RUN pipenv run python manage.py collectstatic --noinput

# Command to run supervisord, which will manage both Django and Angular
CMD ["/usr/bin/supervisord"]
