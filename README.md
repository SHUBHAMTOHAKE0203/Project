# STREETPAWS : Animal Support App

## Description

This project is a comprehensive and community-driven web application that aims to support and rescue animals in need. With a highly interactive and engaging UI, the app facilitates volunteer coordination, provides critical animal welfare services, and connects users with resources and support.

## Problem Statement

Every day, thousands of stray animals suffer injuries, hunger, or abandonment on the streets—but people who want to help don’t have a unified, fast, and open way to report, respond, or collaborate. Existing systems are fragmented, closed, or too slow.
There is a critical need for a decentralized, open-access platform that empowers anyone to act immediately—without barriers like signups, verification, or complex workflows.

## Features

- *Modern UI/UX:* A visually appealing and user-friendly interface that enhances user experience and engagement.
- *Authentication & Authorization:* Secure login and signup functionality powered by *Firebase Authentication*.
- *Volunteer Dashboard:* Real-time volunteer portal for managing support tasks, built using *Firebase Realtime Database*.
- *User Profile Management:* Profile photos are managed using *Cloudflare AWS SDK*. Users can upload and update their profile pictures directly from their dashboard.
- *Services Section:*
  - *Blog & Posts:* Volunteers can write and post blogs. Admins have permissions to delete inappropriate content.
  - *Spam Reports:* Users can report spam comments. An email is automatically sent to the main admin using *Web3 Forms API*.
- *Nearby Vet Locator:* Integrated with *OpenStreetMap API* to show nearby veterinary services.
- *First Aid AI Association:* Uses *OpenAI API* to provide AI-based first aid suggestions for animal care.
- *Pharmacy Finder:* Helps users find nearby pharmacies using *OpenStreetMap API*.
- *Donations:* Secure donation system powered by *Stripe Payment Gateway*, allowing users to support causes with card payments.

## Backend

- Built with *Node.js* and *Wait* for handling APIs and server-side logic.

## APIs Used

- *Firebase Authentication*
- *Firebase Realtime Database*
- *Web3 Forms API*
- *OpenStreetMap API*
- *OpenAI API*
- *Stripe API*
- *AWS SDK*

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
3.node server.js in backend folder
4.npm run dev in client folder
