# DevConnect Backend API Documentation

Base URL: `http://localhost:5000`

All routes are mounted in `server/server.js`.

## Authentication

Protected routes require:

- Header: `Authorization: Bearer <jwt_token>`

JWT token is returned from:

- `POST /api/users` (register)
- `POST /api/auth` (login)

Auth middleware errors:

- `401`: `{ "success": false, "errors": [{ "msg": "No token, authorization denied" }] }`
- `401`: `{ "success": false, "errors": [{ "msg": "Invalid token" }] }`

## Common Validation Error Format

Several endpoints using `express-validator` return:

- `400`: `{ "errors": [{ "msg": "...", "path": "...", ... }] }`

Some profile endpoints instead return:

- `400`: `{ "success": false, "errors": [{ "msg": "...", "path": "...", ... }] }`

## Data Models (Response Shapes)

### User

```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "avatar": "string",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### Profile

```json
{
  "_id": "ObjectId",
  "user": "ObjectId | { _id, name, avatar }",
  "company": "string",
  "website": "string",
  "location": "string",
  "status": "string",
  "skills": ["string"],
  "bio": "string",
  "githubusername": "string",
  "experience": [
    {
      "_id": "ObjectId",
      "title": "string",
      "company": "string",
      "location": "string",
      "from": "ISODate",
      "to": "ISODate",
      "current": "boolean",
      "description": "string"
    }
  ],
  "education": [
    {
      "_id": "ObjectId",
      "school": "string",
      "degree": "string",
      "fieldofstudy": "string",
      "from": "ISODate",
      "to": "ISODate",
      "current": "boolean",
      "description": "string"
    }
  ],
  "social": {
    "youtube": "string",
    "twitter": "string",
    "facebook": "string",
    "linkedin": "string",
    "instagram": "string"
  },
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### Post

```json
{
  "_id": "ObjectId",
  "user": "ObjectId",
  "text": "string",
  "name": "string",
  "avatar": "string",
  "likes": [{ "user": "ObjectId", "_id": "ObjectId" }],
  "comments": [
    {
      "_id": "ObjectId",
      "user": "ObjectId",
      "text": "string",
      "name": "string",
      "avatar": "string",
      "date": "ISODate"
    }
  ],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## Endpoints

## Users

### `POST /api/users`
Register a new user.

Access: Public

Body:

```json
{
  "name": "string (required)",
  "email": "valid email (required)",
  "password": "string, min length 6 (required)"
}
```

Success:

- `201`

```json
{
  "success": true,
  "token": "jwt_token"
}
```

Errors:

- `400` validation:
```json
{ "errors": [{ "msg": "..." }] }
```
- `400` duplicate user:
```json
{
  "success": false,
  "errors": [{ "msg": "User already exists" }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server error" }]
}
```

## Auth

### `GET /api/auth`
Get currently authenticated user.

Access: Private

Body: none

Success:

- `200`

```json
{
  "user": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "avatar": "string",
    "createdAt": "ISODate",
    "updatedAt": "ISODate"
  }
}
```

Errors:

- `500`:
```json
{
  "success": false,
  "msg": "Server error.",
  "error": "error message"
}
```

### `POST /api/auth`
Login and get JWT token.

Access: Public

Body:

```json
{
  "email": "valid email (required)",
  "password": "string (required)"
}
```

Success:

- `201`

```json
{
  "success": true,
  "token": "jwt_token"
}
```

Errors:

- `400` validation:
```json
{ "errors": [{ "msg": "..." }] }
```
- `400` invalid credentials:
```json
{
  "success": false,
  "errors": [{ "msg": "Invalid credentials." }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server error" }]
}
```

## Profile

### `GET /api/profile/me`
Get current user profile.

Access: Private

Success:

- `200`
```json
{
  "success": true,
  "data": { "profile": "Profile object (actual response is Profile object directly in data)" }
}
```

Actual `data` value is a Profile object.

Errors:

- `400`:
```json
{
  "success": false,
  "errors": [{ "msg": "There is no profile for this user" }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `POST /api/profile`
Create or update profile.

Access: Private

Body:

```json
{
  "status": "string (required)",
  "skills": "comma-separated string (required)",
  "company": "string",
  "website": "string",
  "location": "string",
  "bio": "string",
  "githubusername": "string",
  "youtube": "string",
  "twitter": "string",
  "facebook": "string",
  "linkedin": "string",
  "instagram": "string"
}
```

Success:

- `200`
```json
{
  "success": true,
  "data": { "Profile": "profile document" }
}
```

Errors:

- `400` validation:
```json
{
  "success": false,
  "errors": [{ "msg": "...", "path": "..." }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `GET /api/profile`
Get all profiles.

Access: Public

Success:

- `200`
```json
{
  "success": true,
  "data": ["Profile", "Profile", "..."]
}
```

Errors:

- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `GET /api/profile/:user_id`
Get profile by user id.

Access: Public

Path params:

- `user_id` (Mongo ObjectId)

Success:

- `200`
```json
{
  "success": true,
  "data": { "Profile": "profile document" }
}
```

Errors:

- `400`:
```json
{
  "success": false,
  "errors": [{ "msg": "Profile not found" }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `DELETE /api/profile`
Delete authenticated user profile and user account.

Access: Private

Success:

- `200`
```json
{
  "success": true,
  "msg": "User deleted"
}
```

Errors:

- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `PUT /api/profile/experience`
Add experience to current profile.

Access: Private

Body:

```json
{
  "title": "string (required)",
  "company": "string (required)",
  "from": "date string (required)",
  "location": "string",
  "to": "date string",
  "current": "boolean",
  "description": "string"
}
```

Success:

- `200`
```json
{
  "success": true,
  "data": { "Profile": "updated profile document" }
}
```

Errors:

- `400` validation:
```json
{
  "success": false,
  "errors": [{ "msg": "...", "path": "..." }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `DELETE /api/profile/experience/:exp_id`
Delete one experience item.

Access: Private

Path params:

- `exp_id` (Experience subdocument id)

Success:

- `200`
```json
{
  "success": true,
  "data": { "Profile": "updated profile document" }
}
```

Errors:

- `400`:
```json
{
  "success": false,
  "errors": [{ "msg": "Experience not found" }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `PUT /api/profile/education`
Add education to current profile.

Access: Private

Body:

```json
{
  "school": "string (required)",
  "degree": "string (required)",
  "fieldofstudy": "string (required)",
  "from": "date string (required)",
  "to": "date string",
  "current": "boolean",
  "description": "string"
}
```

Success:

- `200`
```json
{
  "success": true,
  "data": { "Profile": "updated profile document" }
}
```

Errors:

- `400` validation:
```json
{
  "success": false,
  "errors": [{ "msg": "...", "path": "..." }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `DELETE /api/profile/education/:edu_id`
Delete one education item.

Access: Private

Path params:

- `edu_id` (Education subdocument id)

Success:

- `200`
```json
{
  "success": true,
  "data": { "Profile": "updated profile document" }
}
```

Errors:

- `400`:
```json
{
  "success": false,
  "errors": [{ "msg": "Education not found" }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

### `GET /api/profile/github/:username`
Get latest GitHub repos for a username (`per_page=5`, sorted by `created:asc`).

Access: Public

Path params:

- `username` (GitHub username)

Success:

- `200`
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "name": "string",
      "html_url": "string",
      "description": "string",
      "...": "other GitHub repo fields"
    }
  ]
}
```

Errors:

- `404`:
```json
{
  "success": false,
  "errors": [{ "msg": "No Github profile found" }]
}
```
- `500`:
```json
{
  "success": false,
  "errors": [{ "msg": "Server Error" }]
}
```

## Posts

### `POST /api/posts`
Create a post.

Access: Private

Body:

```json
{
  "text": "string (required)"
}
```

Success:

- `200`
```json
{
  "_id": "ObjectId",
  "user": "ObjectId",
  "text": "string",
  "name": "string",
  "avatar": "string",
  "likes": [],
  "comments": [],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

Errors:

- `400` validation:
```json
{ "errors": [{ "msg": "Text is required" }] }
```

### `GET /api/posts`
Get all posts (newest first).

Access: Private

Success:

- `200`
```json
[
  {
    "_id": "ObjectId",
    "user": "ObjectId",
    "text": "string",
    "name": "string",
    "avatar": "string",
    "likes": [],
    "comments": [],
    "createdAt": "ISODate",
    "updatedAt": "ISODate"
  }
]
```

Errors:

- `404`: `{ "msg": "No posts found" }` (unlikely in practice because empty array is still truthy)
- `500`: plain text `"Server Error"`

### `GET /api/posts/:id`
Get one post by id.

Access: Private

Path params:

- `id` (Post id)

Success:

- `200`
```json
{
  "_id": "ObjectId",
  "user": "ObjectId",
  "text": "string",
  "name": "string",
  "avatar": "string",
  "likes": [],
  "comments": [],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

Errors:

- `404`: `{ "msg": "Post not found" }`
- `500`: plain text `"Server Error"`

### `DELETE /api/posts/:id`
Delete post if owner.

Access: Private

Path params:

- `id` (Post id)

Success:

- `200`
```json
{ "msg": "Post removed" }
```

Errors:

- `404`: `{ "msg": "Post not found" }`
- `401`: `{ "msg": "User not authorized" }`
- `500`: plain text `"Server Error"`

### `PUT /api/posts/like/:id`
Like a post.

Access: Private

Path params:

- `id` (Post id)

Success:

- `200`
```json
{
  "message": "Post liked",
  "likes": [{ "user": "ObjectId", "_id": "ObjectId" }]
}
```

Errors:

- `404`: `{ "msg": "Post not found" }`
- `400`: `{ "msg": "Post already liked" }`
- `500`: plain text `"Server Error"`

### `PUT /api/posts/unlike/:id`
Unlike a post.

Access: Private

Path params:

- `id` (Post id)

Success:

- `200`
```json
{
  "message": "Post unliked",
  "likes": [{ "user": "ObjectId", "_id": "ObjectId" }]
}
```

Errors:

- `404`: `{ "msg": "Post not found" }`
- `400`: `{ "msg": "Post has not yet been liked" }`
- `500`: plain text `"Server Error"`

### `PUT /api/posts/comment/:id`
Add a comment on a post.

Access: Private

Path params:

- `id` (Post id)

Body:

```json
{
  "text": "string (required)"
}
```

Success:

- `200`
```json
{
  "message": "Comment added",
  "comments": [
    {
      "_id": "ObjectId",
      "user": "ObjectId",
      "text": "string",
      "name": "string",
      "avatar": "string",
      "date": "ISODate"
    }
  ]
}
```

Errors:

- `400` validation:
```json
{ "errors": [{ "msg": "Text is required" }] }
```
- `404`: `{ "msg": "Post not found" }`
- `500`: plain text `"Server Error"`

### `DELETE /api/posts/comment/:id/:comment_id`
Delete a comment if owner.

Access: Private

Path params:

- `id` (Post id)
- `comment_id` (Comment subdocument id)

Success:

- `200`
```json
{
  "message": "Comment removed",
  "comments": []
}
```

Errors:

- `404`: `{ "msg": "Post not found" }`
- `404`: `{ "msg": "Comment does not exist" }`
- `401`: `{ "msg": "User not authorized" }`
- `500`: plain text `"Server Error"`

---

## Notes About Current API Behavior

- Response shapes are not fully consistent across modules:
  - Profile/auth endpoints often use `{ success, data/errors }`.
  - Posts endpoints mostly return raw documents or `{ msg/message }`.
  - Some errors return JSON, others return plain text `"Server Error"`.
- `DELETE /api/profile` currently deletes profile and user, but does not delete posts despite route comment.
- `GET /api/posts` 404 branch is effectively unreachable because `Post.find()` returns an array (possibly empty), not `null`.
