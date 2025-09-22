# AgriSakha
## Backend
# Farmer & Expert Backend Service

This document provides a complete overview of the backend services for the Farmer & Expert application. The service is built using Node.js, Express, and MongoDB, and it provides a robust, secure, and scalable API for user management, content sharing, and community interaction.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Newly Added Features](#newly-added-features)
  - [1. User Profile Management](#1-user-profile-management)
  - [2. Tip Management (CRUD)](#2-tip-management-crud)
  - [3. Advanced Tip Discovery](#3-advanced-tip-discovery)
  - [4. Trending Tags](#4-trending-tags)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Reference](#api-reference)

---

## Project Overview

This backend application powers a platform designed to connect farmers with agricultural experts. Farmers can register, receive OTP-based authentication, and submit farming-related tips for review. Experts can register using a secure key, manage and publish tips, and interact with the community. The system is designed to be production-ready, with features like rate limiting, structured logging, graceful shutdown, and a clear, modular architecture.

## Core Features

-   **Dual User Roles**: Separate authentication and functionality for `Farmers` and `FarmingExperts`.
-   **Secure Authentication**: OTP-based login for farmers and password-based login for experts, both secured with JSON Web Tokens (JWT).
-   **Tip Submission Flow**: Farmers can submit tips with text and images, which are then placed in a pending queue for expert review.
-   **Expert Moderation**: Experts can review, approve, or reject tips submitted by farmers. Approved tips become publicly visible.
-   **Content Interaction**: Authenticated users can "like" and "unlike" published tips.

---

## Newly Added Features

The following features have been added to enhance user capabilities and content discovery.

### 1. User Profile Management

Users can now manage their own profile information after logging in.

-   **Farmer Profile Updates**: A logged-in farmer can update their `fullName`, `dateOfBirth`, `gender`, and `address`. If the district is changed, the system automatically reassigns the correct administrative contact.
-   **Expert Profile Updates**: A logged-in expert can update their `fullName` and list of `expertise`.

### 2. Tip Management (CRUD)

Content authors have full control over their own submissions.

-   **Update a Tip**: The original author (farmer or expert) can update the `title`, `content`, `tags`, and optionally replace the `image` of their tip.
-   **Delete a Tip**: The author can delete their tip. This is a comprehensive action that also **removes all associated likes** from the database and **deletes the corresponding image** from the Cloudinary CDN to prevent orphaned data.
-   **View My Tips**: A new endpoint allows users to retrieve a list of all the tips they have personally created.

### 3. Advanced Tip Discovery

New endpoints make it easier for users to find relevant and high-quality content.

-   **Popular Tips**: A public endpoint that returns the top 10 most-liked tips on the platform, allowing anyone to see the most valuable content.
-   **Tips by District**: A farmer can view a feed of tips submitted by other farmers within their same district, fostering a local community and knowledge sharing.

### 4. Trending Tags

To help users discover popular topics, a new public endpoint is available.

-   **Discover Trending Tags**: Returns a list of the most frequently used tags on `published` tips, sorted by their usage count. This is powered by an efficient MongoDB aggregation pipeline for optimal performance.

---

## Setup and Installation

### Prerequisites

-   Node.js (v18.x or higher)
-   npm
-   MongoDB
-   Cloudinary Account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

1.  Create a `.env` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env
    ```

2.  Open the `.env` file and populate it with your specific credentials:

    ```ini
    NODE_ENV=development
    PORT=8000
    CORS_ORIGIN=http://localhost:5173

    MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>

    JWT_SECRET=<YOUR_VERY_STRONG_JWT_SECRET>
    JWT_EXPIRY=24h

    EXPERT_REGISTRATION_SECRET_KEY=<A_SECRET_KEY_FOR_EXPERT_SIGNUP>

    CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
    CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
    CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

    # Optional for SMS, otherwise a mock service is used
    TWILIO_ACCOUNT_SID=...
    TWILIO_AUTH_TOKEN=...
    TWILIO_PHONE_NUMBER=...

    DEBUG_LOGS=true
    ```

### Running the Application

-   **For development (with auto-restart):**
    ```bash
    npm run dev
    ```
-   **For production:**
    ```bash
    npm start
    ```

---

## API Reference

Below is the documentation for the newly added endpoints.

### User & Profile Management

-   **Update My Farmer Profile**
    -   `PATCH /api/v1/farmers/me`
    -   **Auth**: Farmer
    -   **Body**: `{ "fullName": "string", "dateOfBirth": "YYYY-MM-DD", "address": { "fullAddress": "string", "district": "Thrissur" } }`

-   **Update My Expert Profile**
    -   `PATCH /api/v1/experts/me`
    -   **Auth**: Expert
    -   **Body**: `{ "fullName": "string", "expertise": ["Soil Health", "Pest Control"] }`

### Tip Management

-   **Get My Tips**
    -   `GET /api/v1/tips/my-tips`
    -   **Auth**: Farmer, Expert

-   **Update a Tip**
    -   `PATCH /api/v1/tips/:tipId`
    -   **Auth**: Author (Farmer or Expert)
    -   **Body**: `multipart/form-data` with optional fields: `title`, `content`, `tags`, `image`.

-   **Delete a Tip**
    -   `DELETE /api/v1/tips/:tipId`
    -   **Auth**: Author (Farmer or Expert)

### Tip & Tag Discovery

-   **Get Popular Tips**
    -   `GET /api/v1/tips/popular`
    -   **Auth**: Public

-   **Get Tips By My District**
    -   `GET /api/v1/tips/by-district`
    -   **Auth**: Farmer

-   **Get Trending Tags**
    -   `GET /api/v1/tags/trending`
    -   **Auth**: Public