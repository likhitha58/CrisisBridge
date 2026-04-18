# CrisisBridge - Complete User & Organization Workflow

## 🔄 Complete End-to-End Workflow

---

## **PHASE 1: USER (CITIZEN) SIGNUP & LOGIN**

### Step 1️⃣: User Opens Application
- User navigates to `http://localhost:5173`
- Sees Landing Page with "Sign Up" button
- Landing page shows available resource categories

### Step 2️⃣: User Signs Up
**URL:** `http://localhost:5173/register`

**Form Fields:**
- Full Name: "Rajesh Kumar"
- Email: "rajesh@example.com"
- Password: "secure123"
- Role: Select "Citizen" (default)
- Location: "Dhaka, Bangladesh"

**Behind the Scenes:**
```
POST http://localhost:5000/api/auth/register
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "password": "secure123",
  "role": "Citizen",
  "location": "Dhaka, Bangladesh"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "role": "Citizen",
    "email": "rajesh@example.com",
    "location": "Dhaka, Bangladesh"
  }
}
```

**What Happens:**
✅ Password hashed with bcryptjs
✅ User created in MongoDB
✅ JWT token generated (24hr expiry)
✅ Token saved to localStorage
✅ User automatically logged in
✅ Redirected to Citizen Dashboard

---

### Step 3️⃣: User Dashboard After Login
**URL:** `http://localhost:5173/` (Auto-redirects to Citizen Dashboard)

**Displays:**
- "Active Requests" header
- Button: "New Request"
- Empty state: "No active requests"
- Navigation bar showing: Home, Request Help, Profile, Logout

---

### Step 4️⃣: User Logout & Re-login
**User Clicks Logout:**
```
→ Token removed from localStorage
→ User state cleared
→ Redirected to Landing Page
```

**User Logs In Again:**
**URL:** `http://localhost:5173/login`

**Form Fields:**
- Email: "rajesh@example.com"
- Password: "secure123"

**Behind the Scenes:**
```
POST http://localhost:5000/api/auth/login
{
  "email": "rajesh@example.com",
  "password": "secure123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "role": "Citizen",
    "email": "rajesh@example.com"
  }
}
```

**What Happens:**
✅ Credentials validated against MongoDB
✅ Password verified with bcrypt
✅ New JWT token issued
✅ Redirected to Citizen Dashboard

---

## **PHASE 2: USER CREATES RESOURCE REQUEST**

### Step 5️⃣: User Navigates to Create Request
**URL:** `http://localhost:5173/create-request`

**Only accessible to Citizens** (Protected Route)

**Form Fields:**
- Resource Type: Select "Blood"
- Urgency Level: Select "High"
- Delivery Location: "Dhaka Medical Hospital, Ward 5"
- Description: "O+ blood needed urgently for emergency surgery"

---

### Step 6️⃣: Submit Request
**User Clicks "Post Request"**

**Behind the Scenes:**
```
POST http://localhost:5000/api/requests
Header: x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Body:
{
  "resourceType": "Blood",
  "description": "O+ blood needed urgently for emergency surgery",
  "location": "Dhaka Medical Hospital, Ward 5",
  "urgency": "High"
}

Response:
{
  "_id": "507f191e810c19729de860ea",
  "userId": "507f1f77bcf86cd799439011",
  "resourceType": "Blood",
  "description": "O+ blood needed urgently for emergency surgery",
  "location": "Dhaka Medical Hospital, Ward 5",
  "urgency": "High",
  "status": "Pending",
  "assignedTo": null,
  "createdAt": "2026-04-18T10:30:00Z",
  "updatedAt": "2026-04-18T10:30:00Z"
}
```

**What Happens:**
✅ Request saved to MongoDB
✅ Status set to "Pending"
✅ User ID linked as request creator
✅ Timestamp recorded
✅ User redirected to Citizen Dashboard

---

### Step 7️⃣: View Request on Dashboard
**URL:** `http://localhost:5173/` (Citizen Dashboard)

**Request Card Shows:**
```
┌─────────────────────────────────────┐
│ 🩸 Blood                       HIGH  │
│                                      │
│ O+ blood needed urgently for...     │
│                                      │
│ 📍 Dhaka Medical Hospital, Ward 5   │
│ 🕐 Apr 18, 2026                     │
│                                      │
│ Status: PENDING                      │
└─────────────────────────────────────┘
```

**Behind the Scenes:**
```
GET http://localhost:5000/api/requests
Header: x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response: Array of all requests with userId populated
```

---

## **PHASE 3: ORGANIZATION SIGNUP & LOGIN**

### Step 8️⃣: Hospital/NGO Signs Up
**URL:** `http://localhost:5173/register`

**Form Fields:**
- Organization Name: "City Blood Bank"
- Email: "contact@citybankdb.org"
- Password: "hospital123"
- Role: Select "Hospital" (dropdown shows: Citizen, Volunteer, Hospital, NGO)
- Location: "Dhaka, Bangladesh"

**Behind the Scenes:**
```
POST http://localhost:5000/api/auth/register
{
  "name": "City Blood Bank",
  "email": "contact@citybankdb.org",
  "password": "hospital123",
  "role": "Hospital",
  "location": "Dhaka, Bangladesh"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "name": "City Blood Bank",
    "role": "Hospital",
    "email": "contact@citybankdb.org",
    "location": "Dhaka, Bangladesh"
  }
}
```

**What Happens:**
✅ Organization registered in MongoDB
✅ Role set to "Hospital"
✅ JWT token issued
✅ Automatically logged in
✅ Redirected to Organization Dashboard

---

### Step 9️⃣: Organization Dashboard
**URL:** `http://localhost:5173/` (Auto-redirects to Hospital Dashboard)

**Displays:**
- "Inventory Management" header
- Button: "Update Stock"
- Table: "Live Inventory" (empty initially)
- Sidebar: "Regional Needs" (shows active requests)

---

### Step 🔟: Organization Logs In
**URL:** `http://localhost:5173/login`

**Form:**
- Email: "contact@citybankdb.org"
- Password: "hospital123"

**Same Login Flow as User** → Redirects to Hospital Dashboard

---

## **PHASE 4: ORGANIZATION ADDS RESOURCES**

### Step 1️⃣1️⃣: Organization Clicks "Update Stock"
**Modal Opens:**
```
┌──────────────────────────────────────┐
│ UPDATE INVENTORY                     │
├──────────────────────────────────────┤
│ Supply Type: [Blood ▼]               │
│ Total Available: [100]               │
│ Pickup Station: [Banani Center]      │
│                                      │
│ [Discard]  [Confirm]                │
└──────────────────────────────────────┘
```

**Form Fields:**
- Supply Type: "Blood"
- Total Available: "100"
- Pickup Station: "Banani Center, Zone-A"

---

### Step 1️⃣2️⃣: Submit Resource
**Behind the Scenes:**
```
POST http://localhost:5000/api/resources
Header: x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Body:
{
  "resourceType": "Blood",
  "quantity": 100,
  "location": "Banani Center, Zone-A"
}

Response:
{
  "_id": "507f191e810c19729de860eb",
  "organizationId": "507f1f77bcf86cd799439012",
  "resourceType": "Blood",
  "quantity": 100,
  "location": "Banani Center, Zone-A",
  "createdAt": "2026-04-18T11:00:00Z",
  "updatedAt": "2026-04-18T11:00:00Z"
}
```

**What Happens:**
✅ Resource added to MongoDB
✅ Linked to Hospital's ID
✅ Modal closes
✅ Table updates immediately

---

### Step 1️⃣3️⃣: View Live Inventory
**Hospital Dashboard - Live Inventory Table:**
```
┌──────────────────────────────────────────────────┐
│ Resource Type  │ Quantity │ Location    │ Actions│
├──────────────────────────────────────────────────┤
│ Blood          │ 100 units│ Banani Center│  🗑️   │
├──────────────────────────────────────────────────┤
│ Medicine       │ 50 units │ Dhaka Zone  │  🗑️   │
└──────────────────────────────────────────────────┘
```

**Right Sidebar - Regional Needs:**
```
Regional Needs:
┌────────────────────────────────┐
│ 🩸 Blood (HIGH)               │
│ O+ blood needed urgently...   │
│ 📍 Dhaka Medical Hospital     │
│                                │
│ 🥗 Food (MEDIUM)              │
│ Emergency food supplies...    │
│ 📍 Shantipur, Block-C         │
└────────────────────────────────┘
```

---

## **PHASE 5: ORGANIZATION VIEWS & ALLOCATES RESOURCES**

### Step 1️⃣4️⃣: Organization Switches to "Regional Needs" View
The sidebar automatically shows pending requests from all citizens in real-time:

**Request Details Displayed:**
- Resource Type (Blood, Food, Medicine, Shelter)
- Urgency Level (High = Red badge)
- Description preview
- Location
- Requester information

---

### Step 1️⃣5️⃣: Organization Accepts Request
**Organization Clicks on Request in Regional Needs → Opens Request Detail**

**View Shows:**
```
REQUEST DETAILS:
┌────────────────────────────────────────┐
│ 🩸 Blood - HIGH URGENCY               │
│                                        │
│ Requested by: Rajesh Kumar            │
│ Location: Dhaka Medical Hospital      │
│ Description: O+ blood urgently...     │
│                                        │
│ Status: PENDING                       │
│ [ACCEPT REQUEST]                      │
└────────────────────────────────────────┘
```

**Behind the Scenes:**
```
PUT http://localhost:5000/api/requests/507f191e810c19729de860ea/accept
Header: x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response:
{
  "_id": "507f191e810c19729de860ea",
  "userId": "507f1f77bcf86cd799439011",
  "resourceType": "Blood",
  "status": "Assigned",
  "assignedTo": "507f1f77bcf86cd799439012",  // Hospital ID
  "createdAt": "2026-04-18T10:30:00Z",
  "updatedAt": "2026-04-18T11:15:00Z"
}
```

**What Happens:**
✅ Request status → "Assigned"
✅ assignedTo field → Hospital's ID
✅ Request now appears in "Assigned" tab
✅ Real-time update on both dashboards

---

### Step 1️⃣6️⃣: Hospital Updates Resource Quantity
After allocating blood to Rajesh, hospital updates inventory:

**Modal Opens:**
- Supply Type: "Blood"
- New Quantity: "95" (100 - 5 units given)
- Location: Same as before

**Behind the Scenes:**
```
PUT http://localhost:5000/api/resources/507f191e810c19729de860eb
Header: x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Body:
{
  "quantity": 95
}

Response:
{
  "_id": "507f191e810c19729de860eb",
  "resourceType": "Blood",
  "quantity": 95,  // Updated
  "location": "Banani Center, Zone-A",
  "updatedAt": "2026-04-18T11:30:00Z"
}
```

**What Happens:**
✅ Inventory updated in real-time
✅ Table refreshes instantly
✅ Citizens can see updated availability

---

### Step 1️⃣7️⃣: Hospital Marks Request as Fulfilled
**Hospital Opens Request → Switches to "Fulfilled Need" Button**

**Behind the Scenes:**
```
PUT http://localhost:5000/api/requests/507f191e810c19729de860ea/status
Header: x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Body:
{
  "status": "Completed"
}

Response:
{
  "_id": "507f191e810c19729de860ea",
  "status": "Completed",
  "assignedTo": "507f1f77bcf86cd799439012",
  "updatedAt": "2026-04-18T11:45:00Z"
}
```

**What Happens:**
✅ Request status → "Completed"
✅ ✅ Green checkmark appears
✅ Moves to "Completed" tab
✅ User sees completion notification

---

## **PHASE 6: USER VIEWS FULFILLED REQUEST**

### Step 1️⃣8️⃣: User Logs In & Checks Dashboard
**URL:** `http://localhost:5173/` (Citizen Dashboard)

**Request Card Now Shows:**
```
┌──────────────────────────────────────────┐
│ 🩸 Blood                          ✅      │
│                                           │
│ O+ blood needed urgently for...          │
│                                           │
│ 📍 Dhaka Medical Hospital, Ward 5        │
│ 🕐 Apr 18, 2026                          │
│                                           │
│ Status: COMPLETED                        │
│ Fulfilled by: City Blood Bank            │
└──────────────────────────────────────────┘
```

---

## 📊 **Complete Data Flow Summary**

```
USER JOURNEY:
┌─────────────┐
│   SIGNUP    │ → Created in DB, token issued
└────┬────────┘
     │
     ↓
┌─────────────┐
│   LOGIN     │ → Token validated, dashboard shown
└────┬────────┘
     │
     ↓
┌──────────────────┐
│ CREATE REQUEST   │ → Status: PENDING
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│ VIEW REQUEST     │ → Shows on dashboard
└────┬─────────────┘
     │
     ↓
     ⏳ Waiting for fulfillment...
     │
     ↓
┌──────────────────┐
│  HOSPITAL ACCEPTS│ → Status: ASSIGNED
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│ HOSPITAL DELIVERS│ → Status: COMPLETED
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│ USER SEES RESULT │ → ✅ Fulfilled
└──────────────────┘


HOSPITAL JOURNEY:
┌─────────────┐
│   SIGNUP    │ → Organization registered
└────┬────────┘
     │
     ↓
┌─────────────┐
│   LOGIN     │ → Hospital dashboard shown
└────┬────────┘
     │
     ↓
┌──────────────────┐
│ ADD RESOURCES    │ → Inventory listed
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│ VIEW REQUESTS    │ → See regional needs
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│ ACCEPT REQUEST   │ → Status: ASSIGNED
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│ UPDATE INVENTORY │ → Reduce quantity
└────┬─────────────┘
     │
     ↓
┌──────────────────┐
│ MARK COMPLETE    │ → Status: COMPLETED
└──────────────────┘
```

---

## 🔐 **Authentication & Security**

**Every Authenticated Request Includes:**
```
Header: x-auth-token: [JWT_TOKEN]
```

**Token Contains:**
```
{
  "id": "507f1f77bcf86cd799439011",    // User ID
  "role": "Citizen",                    // User role
  "iat": 1713447000,                    // Issued at
  "exp": 1713533400                     // Expires in 24 hours
}
```

**Ownership Checks:**
- Users can only update/delete their own requests
- Hospitals can only manage their own resources
- Only Citizens can create requests
- Only Hospitals/NGOs can add resources
- Only Admins can delete users

---

## 🎯 **Quick Reference: All Statuses**

**Request Status Workflow:**
```
PENDING → ASSIGNED → COMPLETED
  ↓         ↓           ↓
Waiting  In Progress  Fulfilled
```

**Request Cards Show:**
- 🕐 PENDING (Gray badge) - Waiting for someone to accept
- ⚙️ ASSIGNED (Blue badge) - Hospital is working on it
- ✅ COMPLETED (Green badge) - Delivered successfully

---

## 📱 **Using from Different Devices**

**Same System Works For:**
- ✅ Citizen creating on mobile
- ✅ Hospital accepting on desktop
- ✅ Real-time updates across devices
- ✅ Multiple users simultaneously
- ✅ Volunteer accepting requests
- ✅ NGO managing resources

All data syncs instantly through the API!
