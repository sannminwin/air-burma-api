

# Air Burma NodeJS API

## Overview

This APIs enables Air Burma resellers to sell air tickets online through reseller platform.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Homebrew](https://brew.sh/)
- [OpenSSL](https://www.openssl.org/)

## Installation

### Install Redis on macOS

To install and manage Redis using Homebrew, follow these steps:

1. **Check Homebrew version**:
    ```bash
    brew --version
    ```

2. **Install Redis**:
    ```bash
    brew install redis
    ```

3. **Start the Redis server**:
    ```bash
    redis-server
    ```

4. **Manage Redis with Homebrew services**:
    - **Start Redis**:
        ```bash
        brew services start redis
        ```
    - **Check Redis service info**:
        ```bash
        brew services info redis
        ```
    - **Stop Redis**:
        ```bash
        brew services stop redis
        ```

### Generate Keys

Generate RSA keys and certificates for secure communication:

1. **Generate a private key**:
    ```bash
    openssl genpkey -algorithm RSA -out air-burma-key.pem
    ```

2. **Create a certificate signing request (CSR)**:
    ```bash
    openssl req -new -key air-burma-key.pem -out air-burma-csr.pem
    ```

3. **Generate a self-signed certificate**:
    ```bash
    openssl x509 -req -days 365 -in air-burma-csr.pem -signkey air-burma-key.pem -out air-burma-cert.pem
    ```

## References

- [How to Build an API with Node.js, Express, and TypeScript (2024 Extended, Part 1-6)](https://mahmoud-kassem.medium.com/how-to-build-an-api-with-node-js-express-and-typescript-2024-extended-part-1-6-f65df183dbc5)
- [Install Redis on macOS](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-mac-os/)

## License

ISC