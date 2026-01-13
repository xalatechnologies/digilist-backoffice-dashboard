# Data Model

## Entities

### User
Users who interact with the admin dashboard system. Includes saksbehandlere (caseworkers) and system administrators. Users can create and modify system events, and may be assigned to handle bookings.

### Listing
Available resources that can be booked, including spaces, equipment, services, and other facilities. Each listing has a name, type, and location label. Listings are the primary resources that organizations and users request access to.

### Booking
Requests, changes, or applications for access to a listing. Bookings track the lifecycle of a reservation request from creation through approval or rejection. Each booking has a type (request, change, or application), status, time period, and deadline for handling.

### Organization
Organizations or groups that can create bookings as applicants. Organizations are shown in the "Søker" (applicant) column of the dashboard table and represent the entities requesting access to listings.

### SystemEvent
Recent activity and changes in the system, including approvals, rejections, changes, and archive operations. Events track who performed an action, when it occurred, and what it relates to. Events appear in the "Siste hendelser" (recent events) feed on the dashboard.

### DashboardMetrics
Derived metrics calculated from bookings and integration issues. These metrics power the KPI cards on the dashboard, including counts of items awaiting handling, new items today, upcoming bookings, and integration issues.

### IntegrationIssue
Issues with external system integrations that require attention. Integration issues can include API failures, sync delays, authentication problems, and data mismatches. These contribute to the "Integrasjonsavvik" KPI on the dashboard.

## Relationships

- Listing has many Bookings
- Booking belongs to a Listing
- Booking belongs to an Applicant (which can be an Organization or User)
- Booking can generate multiple SystemEvents
- SystemEvent belongs to an actor (User)
- SystemEvent optionally references a Booking
- User can create and modify SystemEvents
- User can be assigned to Bookings
- Organization can create Bookings
- DashboardMetrics are derived from Bookings and IntegrationIssues
- IntegrationIssue contributes to DashboardMetrics
