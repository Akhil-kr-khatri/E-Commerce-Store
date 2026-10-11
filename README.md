# **ShopSphere – E-Commerce Store Setup Guide**

ShopSphere is a full-stack e-commerce web application built with **React + Vite (Frontend)** and **Node.js + Express (Backend)**. The application provides a product catalogue, product details, category filtering, and shopping-cart functionality.

This document explains how to run the application locally, run the Docker containers, and troubleshoot common setup issues.

---

## 📌 **Local Setup Guide**

You can run ShopSphere locally using Node.js or use the published Docker images where available.

---

## **Prerequisites**

Ensure the following tools are installed:

- Git
- Node.js and npm
- Docker (optional, for containerized setup)
- A web browser

Verify the installations:

```bash
git --version
node --version
npm --version
docker --version
```

---

## **Step 1 — Clone the Repository**

```bash
git clone https://github.com/Akhil-kr-khatri/E-Commerce-Store.git
cd E-Commerce-Store
```

---

## **Step 2 — Install Backend Dependencies**

```bash
cd backend
npm install
```

Start the backend using the development script:

```bash
npm run dev
```

If the project does not define a `dev` script, check `backend/package.json` and use the configured start script, commonly:

```bash
npm start
```

The backend listens on port **5000** by default.

Open a second terminal from the repository root for the frontend setup.

---

## **Step 3 — Install Frontend Dependencies**

```bash
cd frontend
npm install
npm run dev
```

Vite typically serves the frontend at:

```text
http://localhost:5173
```

Open the URL printed in the terminal if Vite selects a different port.

During local development, the frontend should send API requests to `/api`, with the Vite development proxy forwarding those requests to the backend at `http://localhost:5000`.

---

## **Step 4 — Verify the Backend API**

Use a browser or `curl` to check the API endpoints:

```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/products
```

Additional product endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Check backend health |
| `GET` | `/api/products` | Retrieve the product catalogue |
| `GET` | `/api/products?featured=true` | Retrieve featured products |
| `GET` | `/api/products/categories` | Retrieve product categories |
| `GET` | `/api/products/:id` | Retrieve a product by ID |

The exact response format depends on the current backend implementation.

---

## **Step 5 — Run Using Docker Images**

The frontend and backend images are published under the following Docker Hub repositories:

- Backend: `akhilkhatri/ecommerce-backend`
- Frontend: `akhilkhatri/ecommerce-frontend`

Pull the latest images:

```bash
docker pull akhilkhatri/ecommerce-backend:latest
docker pull akhilkhatri/ecommerce-frontend:latest
```

Run the backend container:

```bash
docker run -d --name ecommerce-backend -p 5000:5000 akhilkhatri/ecommerce-backend:latest
```

Run the frontend container:

```bash
docker run -d --name ecommerce-frontend -p 8080:8080 akhilkhatri/ecommerce-frontend:latest
```

The frontend container is available at:

```text
http://localhost:8080
```

**Note:** The production frontend uses `/api` for API requests. The frontend image's static web server does not automatically proxy `/api` requests to a separate backend container. For a fully functional local Docker setup, configure a reverse proxy/API routing layer for `/api`, or run the frontend through the Vite development server with its API proxy. In a hosted environment, the routing layer must send `/api/*` to the backend and other frontend requests to the frontend.

---

## **Step 6 — Verify Running Containers**

```bash
docker container ls
```

**Expected containers:**

| Container | Image | Port mapping |
|---|---|---|
| `ecommerce-backend` | `akhilkhatri/ecommerce-backend:latest` | `5000:5000` |
| `ecommerce-frontend` | `akhilkhatri/ecommerce-frontend:latest` | `8080:8080` |

The status should show `Up` for each running container.

To inspect logs:

```bash
docker logs ecommerce-backend
docker logs ecommerce-frontend
```

---

## **Step 7 — Stop and Delete Containers**

```bash
docker stop ecommerce-frontend ecommerce-backend
docker rm ecommerce-frontend ecommerce-backend
```

---

## **Application Access Summary**

| Service | URL |
|---|---|
| Frontend (Vite development server) | `http://localhost:5173` |
| Frontend (Docker container) | `http://localhost:8080` |
| Backend health endpoint | `http://localhost:5000/api/health` |
| Backend products endpoint | `http://localhost:5000/api/products` |

---

## **CI/CD Workflow — GitHub Actions**

The project uses GitHub Actions to build and publish the frontend and backend Docker images to Docker Hub.

### **When the pipeline runs**

The workflow runs automatically when code is pushed to the `main` branch. It can also be started manually using **Actions → E-commerce CI/CD Pipeline → Run workflow** in GitHub.

### **Pipeline stages**

1. **Checkout source code** — downloads the repository contents using `actions/checkout`.
2. **Set up Docker Buildx** — prepares the Docker build environment.
3. **Authenticate with Docker Hub** — logs in using GitHub Actions secrets.
4. **Build and push frontend image** — builds from `./frontend/Dockerfile` using `./frontend` as the build context.
5. **Build and push backend image** — builds from `./backend/Dockerfile` using `./backend` as the build context.
6. **Report completion** — prints status messages after both image publishing steps succeed.

### **Docker image tags**

For each successful build, the pipeline publishes two tags per image:

| Image | Mutable tag | Commit-specific tag |
|---|---|---|
| Frontend | `ecommerce-frontend:latest` | `ecommerce-frontend:<github-sha>` |
| Backend | `ecommerce-backend:latest` | `ecommerce-backend:<github-sha>` |

The actual Docker Hub namespace is taken from the `DOCKERHUB_USERNAME` secret. The commit-specific tag uses `${{ github.sha }}`, making it possible to identify an image built from a particular commit. The workflow also uses separate GitHub Actions build-cache scopes for frontend and backend to speed up subsequent builds.

### **Required GitHub repository secrets**

Add the following under **GitHub repository → Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|---|---|
| `DOCKERHUB_USERNAME` | Docker Hub username / namespace used for image tags |
| `DOCKERHUB_TOKEN` | Docker Hub access token used for authentication |

Use a Docker Hub access token rather than storing an account password. Never hardcode secrets in the workflow or commit them to the repository.

### **Important behaviour**

This workflow **builds and pushes images only**. It does not deploy the images to a running server or automatically recreate existing containers. A separate deployment step or workflow is needed if automatic application deployment is required.

---

## **Troubleshooting**

### **Issue 1: Frontend cannot reach the backend API**

**Possible cause:**

The frontend is making requests to the wrong URL, or `/api` requests are not being routed to the backend.

**How to check:**

```bash
docker logs ecommerce-backend
docker logs ecommerce-frontend
```

Open the browser's Developer Tools and inspect the **Network** tab for failed API requests.

**Resolution:**

- For local development, ensure Vite proxies `/api` to `http://localhost:5000`.
- For a containerized production frontend, configure a reverse proxy or routing layer to forward `/api/*` to the backend.
- Avoid hardcoding `localhost` as the backend host in browser-side code when the backend is running in a different container or host.

### **Issue 2: Docker container exits after starting**

**How to check:**

```bash
docker ps -a
docker logs ecommerce-backend
docker logs ecommerce-frontend
```

**Resolution:**

Review the container logs for missing dependencies, invalid configuration, port conflicts, or application startup errors. Rebuild the image after making changes to application code or the Dockerfile.

### **Issue 3: Docker reports that a port is already allocated**

**Cause:**

Another process or container is already using the requested host port.

**How to check:**

```bash
docker ps
```

**Resolution:**

Stop the conflicting container or choose a different host port. For example, `-p 8081:8080` exposes a container listening on port 8080 through host port 8081.

### **Issue 4: Changes do not appear after pulling the latest image**

**Cause:**

An existing container continues to use the image from which it was created.

**Resolution:**

Pull the updated image and recreate the container:

```bash
docker pull akhilkhatri/ecommerce-backend:latest
docker pull akhilkhatri/ecommerce-frontend:latest
```

Stop and remove the old containers, then run new containers using the updated images.

---

## **Result**

After completing the setup:

- The ShopSphere frontend runs locally.
- The backend API can be tested independently.
- The frontend and backend can be built and run as separate Docker containers.
- GitHub Actions can publish updated container images to Docker Hub.

---

## **📸 Screenshots**

If screenshots are added to the repository, link them here so readers can review the application UI and setup results.

---

## **Author**

👤 **Akhil Kumar Khatri**  
🌐 **GitHub:** [Akhil-kr-khatri](https://github.com/Akhil-kr-khatri)

---
