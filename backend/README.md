# Heaven on Earth CMS Backend

A secure, production-ready Content Management System backend for Heaven on Earth Kingdom Family Ministries website.

## 🚀 Features

- **Authentication**: JWT-based authentication with access & refresh tokens
- **Admin Management**: Initial admin from env, invite other admins
- **Content Management**:
  - Events (CRUD)
  - Ministries (CRUD)
  - Gallery (Images & Videos)
  - Prayer Requests (View, Respond)
  - Testimonials (Approve, Publish)
  - Partnership Forms (View, Manage)
- **Security**: Password hashing, rate limiting, CORS, input validation
- **Database**: PostgreSQL with SQLAlchemy ORM & Alembic migrations
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

## 📁 Project Structure

```
Backend/
├── app/
│   ├── api/v1/endpoints/    # API route handlers
│   ├── core/                # Middleware, exceptions
│   ├── crud/                # Database operations
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── utils/               # Helper functions
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── dependencies.py      # FastAPI dependencies
│   ├── security.py          # JWT & password utilities
│   └── main.py              # FastAPI app entry point
├── alembic/                 # Database migrations
├── .env.example             # Environment template
├── requirements.txt         # Python dependencies
└── README.md
```

## 🛠️ Setup

### Prerequisites

- Python 3.11+
- PostgreSQL 14+
- pip or poetry

### Installation

1. **Clone and navigate to Backend folder**:
   ```bash
   cd Backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate     # Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Create database**:
   ```bash
   createdb heavenonearth_cms
   ```

6. **Run migrations**:
   ```bash
   alembic upgrade head
   ```

7. **Start the server**:
   ```bash
   # Development
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   
   # Production
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
   ```

## 📚 API Documentation

Once running, access the API documentation at:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔐 Security

- All sensitive configuration is loaded from environment variables
- Passwords are hashed using bcrypt with configurable rounds
- JWT tokens with short expiry for access tokens
- Rate limiting to prevent abuse
- CORS configured for specific origins only
- Input validation using Pydantic

## 🧪 Testing

```bash
pytest --cov=app tests/
```

## 📝 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout (invalidate token)

### Admin Management
- `GET /api/v1/admins` - List all admins
- `POST /api/v1/admins/invite` - Invite new admin
- `PUT /api/v1/admins/{id}` - Update admin
- `DELETE /api/v1/admins/{id}` - Deactivate admin

### Events
- `GET /api/v1/events` - List events
- `POST /api/v1/events` - Create event
- `GET /api/v1/events/{id}` - Get event
- `PUT /api/v1/events/{id}` - Update event
- `DELETE /api/v1/events/{id}` - Delete event

### Ministries
- `GET /api/v1/ministries` - List ministries
- `POST /api/v1/ministries` - Create ministry
- `GET /api/v1/ministries/{id}` - Get ministry
- `PUT /api/v1/ministries/{id}` - Update ministry
- `DELETE /api/v1/ministries/{id}` - Delete ministry

### Gallery
- `GET /api/v1/gallery` - List gallery items
- `POST /api/v1/gallery` - Upload media
- `GET /api/v1/gallery/{id}` - Get item
- `PUT /api/v1/gallery/{id}` - Update item
- `DELETE /api/v1/gallery/{id}` - Delete item

### Prayer Requests
- `GET /api/v1/prayers` - List prayer requests
- `GET /api/v1/prayers/{id}` - Get request
- `PUT /api/v1/prayers/{id}/status` - Update status
- `DELETE /api/v1/prayers/{id}` - Delete request

### Testimonials
- `GET /api/v1/testimonials` - List testimonials
- `POST /api/v1/testimonials` - Create testimonial
- `PUT /api/v1/testimonials/{id}/approve` - Approve testimonial
- `PUT /api/v1/testimonials/{id}/publish` - Publish testimonial
- `DELETE /api/v1/testimonials/{id}` - Delete testimonial

### Partnerships
- `GET /api/v1/partnerships` - List partnership applications
- `GET /api/v1/partnerships/{id}` - Get application
- `PUT /api/v1/partnerships/{id}/status` - Update status
- `DELETE /api/v1/partnerships/{id}` - Delete application

## 📄 License

Copyright © 2024 Heaven on Earth Kingdom Family Ministries
