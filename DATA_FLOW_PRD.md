# Product Requirement Document (PRD): Data Flow & Dashboard Relationships

## 1. System Overview
**ConstructOS** is a multi-tenant construction management platform. The system functionality is divided into four distinct user roles/dashboards. Data flows hierarchically, ensuring privacy between tenants (Companies) while allowing higher-level administration.

---

## 2. Global Data Hierarchy
The data structure follows a strict hierarchy:
1.  **Platform (Super Admin)**: The root level. Contains all companies.
2.  **Tenant (Company)**: An isolated workspace for a construction firm. Contains Projects & Users.
3.  **Project**: The core unit of work. Contains Tasks, Photos, financials, etc.
4.  **User**: An individual belonging to a specific Company (or the Platform).

---

## 3. Dashboard Data Relationships & Flow

### A. Super Admin Dashboard (The "God" View)
**User Persona**: Platform Owner / SaaS Administrator
*   **Data Source**:
    *   **Direct Input**: Pricing plans, Global settings.
    *   **Aggregated Data**: Fetches summary data from *ALL* Companies (e.g., Total Users, Subscription Status, Total Revenue).
*   **Data Flow (Inbound)**:
    *   **Incoming Signups**: New company registrations flow here.
    *   **Support Tickets**: Issues raised by *Company Admins* flow to the Super Admin Ticket module.
    *   **Payments**: Stripe webhooks update Subscription statuses here.
*   **Who sees what?**:
    *   **Can see**: ALL Companies, ALL Subscription details, ALL Support tickets.
    *   **Cannot see**: Specific project details (e.g., "Kitchen Reno Task 1") unless impersonating for support. *Strict Privacy*.

### B. Company Admin Dashboard (The "Command Center")
**User Persona**: Construction Company Owner / General Manager
*   **Data Source**:
    *   **Self-Generated**: Projects, Estimates, Schedule Templates.
    *   **Team Generated**: Daily logs, task updates, site photos from the *Project Team*.
*   **Data Flow**:
    *   **To Project Team**: Admin assigns Projects & Tasks -> identifying which data appears on the *Project Team Dashboard*.
    *   **To Client Portal**: Admin selects which Photos, Documents, and Milestones are "Public" -> pushing data to the *Client Portal*.
    *   **To Super Admin**: Billing status and support tickets flow upwards.
*   **Who sees what?**:
    *   **Can see**: EVERYTHING within their own Company (Projects, Financials, Team Chats).
    *   **Cannot see**: Other companies' data or Super Admin settings.

### C. Project Team Dashboard (The "Field" View)
**User Persona**: Project Manager (PM), Site Foreman, Worker
*   **Data Source**:
    *   **Assigned Data**: Tasks and Schedules assigned by *Company Admin* or *PM*.
    *   **Field Input**:
        *   **Uploads**: Photos taken on-site flow UP to *Company Admin* (and optionally to Client).
        *   **Status**: Task completion flows UP to update the Master Schedule.
        *   **Issues**: Incident reports flow UP to the Admin's "Issues" tab.
*   **Data Flow**:
    *   **Inbound**: Schedule, Documents, Task Lists (from Admin).
    *   **Outbound**: Progress updates, Time logs, Site Photos (to Admin).
*   **Who sees what?**:
    *   **Can see**: Only Projects and Tasks assigned to them.
    *   **Cannot see**: Company Financials (Estimates, Invoices) or Client Contracts (unless Project Manager).

### D. Client Portal (The "Customer" View)
**User Persona**: Homeowner / Property Developer
*   **Data Source**:
    *   **Curated Data**: Only specific data points marked as "Visible to Client" by the *Company Admin/PM*.
        *   *Example*: The Foreman takes 50 photos. The Admin approves 5 good ones. Only those 5 appear in the Client Portal.
*   **Data Flow (Interactive)**:
    *   **Inbound (View)**: Timeline progress, Selected Photos, Invoices.
    *   **Outbound (Action)**:
        *   **Approvals**: Client approves "Tile Selection" -> Status updates in *Company Admin* & *Project Team* dashboards.
        *   **Chat**: Messages sent here appear in the *Company Admin* "Communication" module.
        *   **Payments**: Paying an invoice here updates the Financial status in *Company Admin*.
*   **Who sees what?**:
    *   **Can see**: Only their specific project.
    *   **Cannot see**: Internal team chats, raw daily logs, markup/profit margins, or other clients' projects.

---

## 4. Visual Data Flow Diagram

```mermaid
graph TD
    User_Signup[User Signup] -->|Creates| SA_Company[Super Admin: Companies DB]
    
    SA_Company -->|Provisions| CA_Dashboard[Company Admin Dashboard]
    
    subgraph "Company Ecosystem"
        CA_Dashboard -->|Creates| Project_DB[Project Database]
        
        %% Project Team Flow
        Project_DB -->|Assigns Tasks| PT_Dashboard[Project Team Dashboard]
        PT_Dashboard -->|Uploads Photos/Logs| Project_DB
        PT_Dashboard -->|Updates Status| CA_Dashboard
        
        %% Client Flow
        Project_DB -->|Publishes (Filtered)| Client_Dashboard[Client Portal]
        Client_Dashboard -->|Approves Items| Project_DB
        Client_Dashboard -->|Sends Messages| CA_Dashboard
        
        %% Financial Flow
        CA_Dashboard -->|Sends Projects| Estimates
        CA_Dashboard -->|Sends Invoices| Client_Dashboard
    end
    
    %% Super Admin Feedback
    CA_Dashboard -->|Pays Subscription| SA_Revenue[Super Admin: Revenue]
    CA_Dashboard -->|Opens Ticket| SA_Support[Super Admin: Tickets]
```

---

## 5. Detailed Metric mapping

| Data Point | Origin (Created By) | Visible To | Trigger/Action |
| :--- | :--- | :--- | :--- |
| **Project Schedule** | Company Admin / PM | Team (View), Client (View Major Milestones) | Admin updates dates -> Team sees new deadline -> Client sees updated timeline. |
| **Site Photos** | Project Team (Field) | Company Admin | Admin reviews photos -> Selects "Share with Client" -> Appears in Client Portal. |
| **Invoices** | Company Admin | Client | Admin generates Invoice -> Client receives notification -> Client pays -> Admin sees "Paid" status. |
| **Selections/Approvals** | Company Admin | Client | Admin creates "Paint Selection" option -> Client selects "White" -> Team sees "White" is approved for purchase. |
| **Internal Chat** | Team Members | Team & Admin | Private communication log. Hidden from Client. |
| **Client Chat** | Client / Admin | Admin & Client | Direct communication channel. |
| **Subscription Status** | Stripe / System | Super Admin & Company Admin | Failure to pay -> Super Admin restricts Company Admin access. |

---

## 6. Implementation Checklist (Next Steps)

1.  **Database Relational Mapping**: Ensure `projects` table has a `company_id`. Ensure `tasks` have a `project_id`.
2.  **Role-Based Access Control (RBAC)**: Middleware must check:
    *   Is user Super Admin? -> Access `/super-admin/*`
    *   Is user Company Admin? -> Access `/company-admin/*` matching `company_id`.
    *   Is user Client? -> Access `/client-portal/*` matching `project_id`.
3.  **Client Visibility Toggle**: Add a boolean flag `is_client_visible` to Photos, Documents, and Schedule Items in the database.
