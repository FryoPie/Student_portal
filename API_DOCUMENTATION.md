# Student Achievement Portal - API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### Register a New User
**POST** `/auth/register/`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "student",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "role": "student",
  "first_name": "John",
  "last_name": "Doe"
}
```

---

### Login
**POST** `/auth/login/`

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepass123"
}
```

**Response:** `200 OK`
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "student",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

---

### Refresh Token
**POST** `/auth/token/refresh/`

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response:** `200 OK`
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### Get Current User
**GET** `/auth/me/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "role": "student",
  "first_name": "John",
  "last_name": "Doe"
}
```

---

## Profile Endpoints

### List All Profiles (Public)
**GET** `/profiles/`

**No authentication required**

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user": {...},
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "profile_picture": "/media/profile_pictures/john.jpg",
    "bio": "Computer Science student...",
    "student_id": "CS2024001",
    "department": "Computer Science",
    "year": "Junior",
    "gpa": "3.85",
    "phone": "+1234567890",
    "linkedin_url": "https://linkedin.com/in/johndoe",
    "github_url": "https://github.com/johndoe",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

---

### Get Profile by ID (Public)
**GET** `/profiles/{id}/`

**No authentication required**

**Response:** `200 OK`
```json
{
  "id": 1,
  "user": {...},
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "profile_picture": "/media/profile_pictures/john.jpg",
  "bio": "Computer Science student...",
  "student_id": "CS2024001",
  "department": "Computer Science",
  "year": "Junior",
  "gpa": "3.85",
  "phone": "+1234567890",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

### Get Current User's Profile
**GET** `/profiles/me/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "id": 1,
  "user": {...},
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "profile_picture": "/media/profile_pictures/john.jpg",
  "bio": "Computer Science student...",
  "student_id": "CS2024001",
  "department": "Computer Science",
  "year": "Junior",
  "gpa": "3.85",
  "phone": "+1234567890",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

### Update Profile
**PATCH** `/profiles/{id}/`

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (Form Data):**
```
bio: "Updated bio text"
department: "Computer Science"
year: "Senior"
gpa: "3.90"
phone: "+1234567890"
linkedin_url: "https://linkedin.com/in/johndoe"
github_url: "https://github.com/johndoe"
profile_picture: [FILE]
```

**Response:** `200 OK`

---

## Achievement Endpoints

### List All Achievements (Public)
**GET** `/achievements/list/`

**Query Parameters:**
- `student_id` (optional): Filter by student ID
- `status` (optional): Filter by status (pending, verified, rejected)
- `category` (optional): Filter by category

**No authentication required**

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "student": 1,
    "student_name": "johndoe",
    "student_id": 1,
    "title": "First Place in Hackathon",
    "description": "Won first place in the annual college hackathon",
    "category": "technical",
    "status": "verified",
    "proof_document": "/media/achievement_proofs/certificate.pdf",
    "achievement_date": "2024-03-15",
    "verified_by": 2,
    "verified_by_name": "coordinator1",
    "verification_notes": "Excellent work!",
    "created_at": "2024-03-16T10:00:00Z",
    "updated_at": "2024-03-17T15:30:00Z"
  }
]
```

---

### Get Achievement by ID (Public)
**GET** `/achievements/list/{id}/`

**No authentication required**

**Response:** `200 OK`

---

### Get Current User's Achievements
**GET** `/achievements/list/my_achievements/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "student": 1,
    "student_name": "johndoe",
    "student_id": 1,
    "title": "First Place in Hackathon",
    "description": "Won first place in the annual college hackathon",
    "category": "technical",
    "status": "verified",
    "proof_document": "/media/achievement_proofs/certificate.pdf",
    "achievement_date": "2024-03-15",
    "verified_by": 2,
    "verified_by_name": "coordinator1",
    "verification_notes": "Excellent work!",
    "created_at": "2024-03-16T10:00:00Z",
    "updated_at": "2024-03-17T15:30:00Z"
  }
]
```

---

### Create Achievement
**POST** `/achievements/list/`

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (Form Data):**
```
title: "First Place in Hackathon"
description: "Won first place in the annual college hackathon"
category: "technical"
achievement_date: "2024-03-15"
proof_document: [FILE]
```

**Response:** `201 Created`

---

### Update Achievement
**PATCH** `/achievements/list/{id}/`

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Note:** Only the achievement owner can update, and only if status is not 'verified'

**Response:** `200 OK`

---

### Delete Achievement
**DELETE** `/achievements/list/{id}/`

**Headers:** `Authorization: Bearer <token>`

**Note:** Only the achievement owner can delete, and only if status is not 'verified'

**Response:** `204 No Content`

---

### Get Pending Achievements (Coordinator Only)
**GET** `/achievements/list/pending/`

**Headers:** `Authorization: Bearer <token>`

**Required Role:** coordinator

**Response:** `200 OK`
```json
[
  {
    "id": 2,
    "student": 1,
    "student_name": "johndoe",
    "student_id": 1,
    "title": "Research Paper Published",
    "description": "Published paper in IEEE conference",
    "category": "research",
    "status": "pending",
    "proof_document": "/media/achievement_proofs/paper.pdf",
    "achievement_date": "2024-04-01",
    "verified_by": null,
    "verified_by_name": null,
    "verification_notes": "",
    "created_at": "2024-04-02T10:00:00Z",
    "updated_at": "2024-04-02T10:00:00Z"
  }
]
```

---

### Verify/Reject Achievement (Coordinator Only)
**POST** `/achievements/list/{id}/verify/`

**Headers:** `Authorization: Bearer <token>`

**Required Role:** coordinator

**Request Body:**
```json
{
  "status": "verified",
  "verification_notes": "Excellent work! Certificate verified."
}
```

**Status Options:** `verified` or `rejected`

**Response:** `200 OK`

---

## Notification Endpoints

### Get Current User's Notifications
**GET** `/achievements/notifications/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user": 1,
    "achievement": 1,
    "achievement_title": "First Place in Hackathon",
    "message": "Your achievement 'First Place in Hackathon' has been verified. Note: Excellent work!",
    "is_read": false,
    "created_at": "2024-03-17T15:30:00Z"
  }
]
```

---

### Mark Notification as Read
**POST** `/achievements/notifications/{id}/mark_read/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

---

### Mark All Notifications as Read
**POST** `/achievements/notifications/mark_all_read/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "status": "all notifications marked as read"
}
```

---

## Achievement Categories

- `academic` - Academic Excellence
- `sports` - Sports & Athletics
- `cultural` - Cultural Activities
- `technical` - Technical Skills
- `leadership` - Leadership
- `community` - Community Service
- `research` - Research & Publications
- `other` - Other

---

## Achievement Status Values

- `pending` - Awaiting coordinator verification
- `verified` - Approved by coordinator
- `rejected` - Rejected by coordinator

---

## User Roles

- `student` - Can create/edit own profile and achievements
- `coordinator` - Can verify/reject achievements

---

## Error Responses

### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

---

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. File uploads must use `multipart/form-data`
3. Maximum file size for uploads: Check server configuration
4. Pagination is enabled for list endpoints (20 items per page)
5. Public endpoints do not require authentication
6. Protected endpoints require JWT token in Authorization header
