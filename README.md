# MedEase - Healthcare Appointment System

> A modern, centralized digital platform connecting patients with trusted medical professionals for seamless appointment booking and healthcare management.

---

## Table of Contents
- [Introduction](#-introduction)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Future Scope](#-future-scope)
- [License](#-license)

---

## Introduction
Traditional healthcare booking relying on phone calls, walk-ins, or manual clinic registries often leads to long wait times, scheduling conflicts, and a lack of transparency regarding doctor availability. 

**MedEase** aims to provide a seamless digital ecosystem where patients can easily search for doctors by name, specialty, or clinic location, view their verified profiles, and book appointments instantly. Doctors and clinic administrators can manage their schedules, review upcoming appointments, and monitor overall patient operations efficiently.

---

## Problem Statement
The existing traditional healthcare booking process typically involves:
- Phone-based or walk-in appointment requests.
- Clinic staff manually checking physical registries, leading to double-booking risks.
- Lack of real-time availability or instant confirmation.
- Inefficiency for both doctors and patients, leading to crowded waiting rooms and lost time.

**MedEase solves this** by introducing a centralized, automated digital platform with real-time data synchronization, dynamic filtering, and a secure, intuitive user interface.

---

## Key Features

### For Patients 
- **Smart Doctor Directory:** Browse verified doctors with detailed profiles, experience levels, and fees.
- **Dynamic Search & Filters:** Filter doctors by **Name**, **Medical Specialty**, and **Clinic Location**.
- **Real-time Slot Booking:** View instant availability and book consultations securely.
- **Patient Dashboard:** Track past and upcoming medical appointments in one centralized hub.

### For Doctors 
- **Professional Profile Management:** Update specialties, consultation fees, and clinic addresses.
- **Schedule Management:** View and manage daily appointment queues.
- **Patient Interaction:** Review patient booking details prior to the consultation.

### General System 
- **Secure Authentication:** JWT-based login and registration with bcrypt password hashing.
- **Role-Based Access Control (RBAC):** Distinct workflows for Patients and Doctors.
- **Modern UI/UX:** Built with a responsive "Bento Box" design layout and infinite scrolling carousels.

---

## Technology Stack

**Frontend:**
- React.js (Functional Components & Hooks)
- React Router DOM (Dynamic routing & Protected routes)
- Context API (Global state management)
- Tailwind CSS (Utility-first styling & UI structure)
- Lucide React (Modern iconography)
- Axios (HTTP requests)

**Backend:**
- Node.js & Express.js (RESTful API Engine)
- JSON Web Tokens (JWT) (Stateless Authentication)
- bcryptjs (Data security)

**Database:**
- MongoDB (NoSQL Database)
- Mongoose ORM (Schema definitions & data validation)

---

## System Architecture (MVC)
The system follows a clean modular Model-View-Controller (MVC) architecture:
1. **Routes:** Defines API endpoints and attaches middleware (auth/roles).
2. **Controllers:** Contains the core business logic (booking, filtering, auth).
3. **Models:** Mongoose schemas (`User`, `Doctor`, `Appointment`).

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local instance or MongoDB Atlas cluster)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/healthcare-appointment-system](https://github.com/Sanyam2511/healthcare-appointment-system)
