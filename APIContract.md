# Users

- User object

```json
{
  id: integer,
  username: string,
  email: string,
  pp_url: string,
  is_admin: boolean,
  created_at: datetime(iso 8601),
  objects: [
    {<object_object_short>},
    {<object_object_short>},
    {<object_object_short>}
  ]
}
```

- User object short

```json
{
  id: integer,
  username: string,
  email: string,
  pp_url: string,
  is_admin: boolean
}
```

## **GET /u**

Returns all users in the system, in their short form.

**URL Params**  
None

**Data Params**  
None

**Headers**  
Content-Type: application/json

**Success Response:**
Code: 200
```json
{
  users: [
    {<user_object_short>},
    {<user_object_short>},
    {<user_object_short>}
  ]
}
```

## **GET /u/:id**

Returns the specified user, long format.

**URL Params**  
_Required:_ `id=[integer]`

**Data Params**
None

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
Code: 200
```json
{
  user: <user_object>
}
```

## **POST /u**

Creates a new user.

**URL Params**
None

**Data Params**
```json
{
  username: string,
  email: string,
  password: string,
  pp_url: string
}
```

**Headers**
Content-Type: application/json

**Success Response:**
Code: 200
```json
{
  user: <user_object>
}
```

**Error Response:**
- Code: 400
```json
{
  message: "Username is already taken."
}
```
- Code: 400
```json
{
  message: "Email is already taken."
}
```

## **PATCH /u/:id**

Updates the specified user.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
Data params are optional, but at least one must be provided.
```json
{
  username: string,
  email: string,
  password: string,
  pp_url: string
}
```

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  user: <user_object>
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to update this user."
}
```
- Code: 404
```json
{
  message: "User not found."
}
```

## **DELETE /u/:id**

Deletes the specified user.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
None

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 204
```json
{
  message: "User deleted."
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to delete this user."
}
```
- Code: 404
```json
{
  message: "User not found."
}
```

## **GET /u/:id/o**

Returns all objects owned by the specified user.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
None

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  user: <user_object_short>,
  objects: [
    {<object_object_short>},
    {<object_object_short>},
    {<object_object_short>}
  ]
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to view this user's objects."
}
```
- Code: 404
```json
{
  message: "User not found."
}
```

# Objects

- Object object

```json
{
  id: integer,
  name: string,
  description: <comment_object>,
  image_url: string,
  created_at: datetime(iso 8601),
  user: <user_object_short>,
  actual: <object_object_short>,
  tags: [
    string,
    string,
    string
  ]
}
```

- Object object short

```json
{
  id: integer,
  name: string,
  description: string,
  image_url: string,
  tags: [
    string,
    string,
    string
  ]
}
```

## **GET /o**

Returns all objects in the system, in their short form.

**URL Params**
None

**Data Params**
None

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  objects: [
    {<object_object_short>},
    {<object_object_short>},
    {<object_object_short>}
  ]
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to view objects."
}
```

## **GET /o/:id**

Returns the specified object, long format.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
None

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  object: <object_object>
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to view this object."
}
```
- Code: 404
```json
{
  message: "Object not found."
}
```

## **POST /o**

Creates a new object.

**URL Params**
None

**Data Params**
```json
{
  name: string,
  image_url: string,
  tags: [
    string,
    string,
    string
  ],
  ?actual: <user_object_short>,
  ?description: <comment_object>
}
```

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  object: <object_object>
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to create objects."
}
```

## **PATCH /o/:id**

Updates the specified object.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
Data params are optional, but at least one must be provided.
```json
{
  name: string,
  image_url: string,
  tags: [
    string,
    string,
    string
  ],
  actual: <user_object_short>,
  description: <comment_object>
}
```

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  object: <object_object>
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to update this object."
}
```
- Code: 404
```json
{
  message: "Object not found."
}
```

## **DELETE /o/:id**

Deletes the specified object.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
None

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 204
```json
{
  message: "Object deleted."
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to delete this object."
}
```
- Code: 404
```json
{
  message: "Object not found."
}
```

# Comments

- Comment object

```json
{
  id: integer,
  author: <user_object_short>,
  text: string,
  created_at: datetime(iso 8601)
}
```

## **GET /o/:id/c**

Returns all comments on the specified object.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
None

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  comments: [
    {<comment_object>},
    {<comment_object>},
    {<comment_object>}
  ]
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to view comments on this object."
}
```
- Code: 404
```json
{
  message: "Object not found."
}
```

## **POST /o/:id/c**

Creates a new comment on the specified object.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
```json
{
  text: string
}
```

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  comment: <comment_object>
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to create comments on this object."
}
```
- Code: 404
```json
{
  message: "Object not found."
}
```

## **PATCH /o/:id/c/:id**

Updates the specified comment.

**URL Params**
_Required:_ `id=[integer]`

**Data Params**
```json
{
  text: string
}
```

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 200
```json
{
  comment: <comment_object>
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to update this comment."
}
```
- Code: 404
```json
{
  message: "Comment not found."
}
```

## **DELETE /o/:id/c/:c_id**

Deletes the specified comment.

**URL Params**
_Required:_ `id=[integer]`
_Required:_ `c_id=[integer]`

**Data Params**
None

**Headers**
Content-Type: application/json
Authorization: Bearer `<OAuth Token>`

**Success Response:**
- Code: 204
```json
{
  message: "Comment deleted."
}
```

**Error Response:**
- Code: 403
```json
{
  message: "You do not have permission to delete this comment."
}
```
- Code: 404
```json
{
  message: "Comment not found."
}
```