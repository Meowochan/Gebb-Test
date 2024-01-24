# Movie Booking System
Welcome to the Movie Booking System! This web application allows users to browse and book movie tickets. Below are instructions on how to set up and run both the front-end and back-end parts of the system.
## Getting Started

### Frontend Setup
1. Clone the repository
```
git clone https://github.com/Meowochan/Gebb-Test.git
cd booking-system
```
2. Install dependencies
```
npm install
```
3. Start the frontend server
```
npm start
```
This will launch the web application. Open your browser and navigate to http://localhost:3000 to access the Movie Booking System.

### Backend Setup
1. Navigate to backend directory
```
cd backend
```
2. Install dependencies
```
npm install
```
3. Start the backend server
```
node index.js
```
The backend server will run at http://localhost:8000.

## Admin Mode
In order to access Admin Panel the users must login as admin by using the following username and password
username : admin
password : admin

## Features
### 1. Select Movie
Users can browse and select movies from the list.
### 2. Select Date
Choose a date for the selected movie to view available showtimes.
### 3. Reserve Multiple Seats
Users can reserve multiple seats for a selected showtime.
### 4. Admin Control Panel
Admins have control over seat availability. They can mark seats as unavailable or available.
### 5. Login / Registration
Users can create accounts, log in, and enjoy a personalized booking experience.

## Notes
- In real-life scenarios, adding seats dynamically might not be practical due to physical constraints in cinemas.

Enjoy the Movie Booking System! If you have any questions or issues, feel free to reach out.
