# Use the official Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install any necessary dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 4200
EXPOSE 4200

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=4200

# Run Flask when the container launches
CMD ["flask", "run"]
