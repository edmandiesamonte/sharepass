# Sharepass

**Sharepass** is a lightweight, self-hosted tool that lets users securely share sensitive information by encrypting content and generating a one-time-use link.

Inspired by [SnapPass](https://github.com/pinterest/snappass) by Pinterest, Sharepass focuses on simplicity, security, and ease of deployment.

---

## Features

- **One-time-use Links**: Shared links can only be accessed once, ensuring sensitive data isn't reused or leaked.
- **End-to-end Encryption**: Data is encrypted before storage and decrypted only upon access.
- **Expiration Options**: Links can expire after a set duration or upon first use.
- **Simple Deployment**: Minimal dependencies for quick and easy setup.
- **Custom Branding** *(optional)*: Add a personalized touch for organizations.

---

## Installation

### Prerequisites

Ensure the following are installed:

- **PHP** (>= 8.1)
- **Laravel Framework** (>= 10.x)
- **Composer**
- **Node.js & npm** (for frontend assets)
- **AWS S3** (for data store)
