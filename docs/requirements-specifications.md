# Requirements and Specification Document

## Data Driven Logistics (DDL)

### Project Abstract

The goal of the Data Driven Logistics (DDL) is to develop a comprehensive web application designed for businesses to efficiently track inventory across multiple physical locations. This system aims to model business processes, transforming inputs into outputs, managing shipments, and maintaining precise inventory records. By implementing DDL, businesses can gain real-time visibility into inventory levels at any site and any given time, ensuring operational efficiency and informed decision-making.

### Customer

#### Target User Personas

- **Corporate Manager**: Focuses on aggregated data across all facilities, concerned with summary statistics, facility management at a macro level, and strategic decision-making.
- **Facility Manager**: Manages the operations of a single facility, focusing on detailed inventory management, process modeling, and day-to-day operational decisions.

#### Specific Customers for This Document

The specific customers informing this document include:

- **CS506 Instructional Staff**: The instructional team of the CS506 course acts as the project's primary customer, providing initial requirements and guiding the development process to ensure the project meets both educational objectives and real-world applicability.
- **Student Developers**: The team of students undertaking the project, responsible for gathering requirements, designing, developing, and testing the DDL system.

#### Customer Engagement

The project engages both the instructional staff and student developers, ensuring a comprehensive understanding of the domain and potential user needs. This collaboration aims to shape the project's direction, with continued feedback and testing phases expected to refine the system further.

### User Requirements

The user requirements for the Data Driven Logistics (DDL) are organized around different user roles and system functionalities to ensure clarity and ease of understanding. Each requirement is designated a priority level (High, Medium, Low) to guide development focus and resource allocation.

#### General System Access

- **R1**: Secure login mechanism with role-based access control to differentiate between corporate and facility managers.
  - Priority: High
  - Status: Open

#### Inventory and Facility Management

- **R2**: Ability for corporate managers to view, create, and deactivate facilities within the system.
  - Priority: High
  - Status: Open
- **R3**: Real-time tracking of inventory levels and shipments at each facility for facility managers.
  - Priority: High
  - Status: Open
- **R4**: Aggregate inventory and shipment reports for corporate managers covering all facilities.
  - Priority: High
  - Status: Open

#### Process Modeling and Shipments

- **R5**: Facility managers can model processes that transform inputs into outputs, including potential waste production.
  - Priority: Medium
  - Status: Open
- **R6**: Automated inventory updates following shipment records or process execution events.
  - Priority: High
  - Status: Open

#### Historical Data and Reporting

- **R7**: Users must be able to access historical inventory data to track changes over time and perform trend analysis.
  - Priority: Medium
  - Status: Open
- **R8**: The system should offer reporting tools, including the ability to generate custom reports based on specific criteria (e.g., time period, location).
  - Priority: Medium
  - Status: Open

#### Audit Trail and Security

- **R9**: Every update made to the inventory or process models must be logged with user identification to create a comprehensive audit trail.
  - Priority: High
  - Status: Open
- **R10**: Access control mechanisms must be in place to ensure users can only view and manipulate inventory and processes relevant to their role.
  - Priority: High
  - Status: Open

#### Extensions and Integrations

- **R11**: The system should support spreadsheet import and export functionalities for easy data manipulation and reporting.
  - Priority: Low
  - Status: Open
- **R12**: Integration with geospatial data visualization tools to enable location-based inventory tracking.
  - Priority: Low
  - Status: Open

These requirements serve as a foundational guide for the development and implementation of the DDL, ensuring it meets the needs of businesses in managing their inventory and production processes efficiently and effectively.


### Use Cases & User Stories

In alignment with the user requirements outlined previously, the following use cases and user stories detail key scenarios within the Data Driven Logistics (DDL). Each use case is derived from user stories, ensuring that every major scenario is represented and distinct in its contributions to the system's functionality. Use cases are categorized by priority: "Must Have," "Useful," or "Optional," to guide development focus towards the most critical features by the project deadline.

#### Use Case 1: Facility Overview for Corporate Manager

- **Priority**: Must Have
- **User Story**:
  > As a corporate manager, I want to see a count of how many facilities I have, so I can have a high-level overview of our operational scale.
- **Acceptance Test**:
  1. Log in to the system with corporate manager credentials.
  2. Access the dashboard to view a summary of all facilities.
  3. Verify the total count of facilities is displayed accurately.

#### Use Case 2: Aggregate Inventory Tracking

- **Priority**: Must Have
- **User Story**:
  > As a corporate manager, I want to see an aggregate of the inventory that has come into and gone out from all facilities over an arbitrary time span, so I can understand inventory flow and make informed strategic decisions.
- **Acceptance Test**:
  1. Log in to the system with corporate manager credentials.
  2. Navigate to the "Inventory Reports" section.
  3. Select a time span and verify the aggregate inventory data is displayed correctly.

#### Use Case 3: Facility Creation

- **Priority**: Must Have
- **User Story**:
  > As a corporate manager, I want to create a new facility, so we can expand our operations to new locations.
- **Acceptance Test**:
  1. Log in to the system with corporate manager credentials.
  2. Navigate to the "Facilities Management" section and select "Create New Facility."
  3. Enter the necessary information for the new facility and confirm creation.
  4. Verify the new facility is listed in the system.

#### Use Case 4: Deactivating a Facility

- **Priority**: Must Have
- **User Story**:
  > As a corporate manager, I want to mark that a facility has ceased operation as of some date, so it's not included in aggregates after that date, ensuring accurate reporting.
- **Acceptance Test**:
  1. Log in to the system with corporate manager credentials.
  2. Navigate to the "Facilities Management" section and select the facility to deactivate.
  3. Mark the facility as ceased operations with the specified date.
  4. Verify the facility is no longer included in future aggregate reports.

#### Use Case 5: Facility Inventory Overview

- **Priority**: Must Have
- **User Story**:
  > As a facility manager, I want to view what I have in my facility's inventory, so I can manage day-to-day operations effectively.
- **Acceptance Test**:
  1. Log in to the system with facility manager credentials.
  2. Navigate to the "Inventory" section for their facility.
  3. Verify that current inventory levels are accurately displayed.

#### Use Case 6: Historical Inventory Tracking

- **Priority**: Must Have
- **User Story**:
  > As a facility manager, I want to view what I used to have in my facility's inventory at some past time, and what I will have in the future, so I can plan for inventory needs and audits.
- **Acceptance Test**:
  1. Log in to the system with facility manager credentials.
  2. Navigate to the "Inventory History" section.
  3. Select a past or future date to view inventory levels for that time.
  4. Verify the displayed inventory levels match historical records or future projections.
  

Each use case includes specific acceptance tests to validate the implementation. These scenarios provide concrete examples that the customer will use to determine if the respective use case has been successfully implemented. The prioritization of use cases ensures that development efforts are aligned with the most critical functionalities required by the deadline.

### User Interface Requirements

The Data Driven Logistics (DDL) requires a user-friendly, efficient, and informative interface to facilitate seamless interaction between the users and the system's functionalities. The interface must cater to various user roles, including plant managers, inventory specialists, process engineers, and compliance officers, offering tailored views and functionalities to meet their specific needs. Below are detailed user interface requirements, complemented by conceptual illustrations.

#### Dashboard (Home Page)

- **Requirement**: The dashboard serves as the landing page after login, providing an overview of real-time inventory levels, recent shipments, and alerts for inventory shortages or discrepancies.
- **Details**: It should feature widgets or cards for quick access to different sections of the application, such as Inventory Management, Shipments, Process Modeling, and Audit Logs.
- **Illustration**: `![Dashboard View](/images/dashboard_view.png)`

#### Inventory Management

- **Requirement**: A detailed inventory view that lists all items across different locations, with functionalities to filter, search, and sort by various parameters (e.g., item name, location, quantity).
- **Details**: Each inventory item should display critical information, such as current quantity, minimum required quantity, and options for recording shipments or adjustments.
- **Illustration**: `![Inventory Management](/images/inventory_management.png)`

#### Shipments Recording

- **Requirement**: A dedicated section for recording incoming and outgoing shipments, including forms to input shipment details such as item, quantity, source/destination, and date.
- **Details**: This section should allow bulk import of shipment data from spreadsheets and provide templates for download.
- **Illustration**: `![Shipments Recording](/images/shipments_recording.png)`

#### Process Modeling

- **Requirement**: An interface for defining and editing manufacturing processes, where users can map out the steps involved in transforming inputs into outputs.
- **Details**: The interface should allow for the visual representation of process flows, with drag-and-drop functionality for adding new steps or inputs/outputs.
- **Illustration**: `![Process Modeling](/images/process_modeling.png)`

#### Audit Log

- **Requirement**: A comprehensive audit log that records and displays all changes made within the system, including who made the change, what was changed, and when.
- **Details**: It should offer filtering options by date, user, and type of change, and export functionality for reporting purposes.
- **Illustration**: `![Audit Log](/images/audit_log.png)`

#### Reporting and Export

- **Requirement**: Capabilities for generating custom reports based on selected criteria (e.g., inventory levels over time, shipment history) and exporting data in various formats (e.g., CSV, PDF).
- **Details**: Users should be able to save report configurations for future use and schedule automated report generation.
- **Illustration**: `![Reporting and Export](/images/reporting_export.png)`

#### User Interface Design Considerations

- **Responsiveness**: The UI must be responsive, ensuring usability across devices, including desktops, tablets, and smartphones.
- **Accessibility**: Design elements should adhere to accessibility standards, ensuring the system is usable for all users, including those with disabilities.
- **Intuitive Navigation**: The navigation structure should be intuitive, with a consistent layout and clear indications of active sections to facilitate easy movement between different parts of the application.

These user interface requirements and illustrations provide a conceptual overview of how the DDL will interact with its users, ensuring a workflow that is both efficient and user-friendly.

### Security Requirements

The Data Driven Logistics (DDL) requires stringent security measures to protect sensitive data, ensure user privacy, and maintain system integrity against potential threats. Given the system's role in managing inventory across multiple locations and modeling business processes, security is paramount to prevent unauthorized access, data breaches, and service disruptions. Here are the key security requirements for the DDL:

#### Authentication and Authorization

- **Requirement**: Implement robust authentication mechanisms to verify the identity of users before granting access to the system. Utilize role-based access control (RBAC) to ensure users are authorized to access only the resources relevant to their role within the organization.
- **Rationale**: To prevent unauthorized access and ensure users can only perform actions permitted by their role, protecting sensitive data and critical functionalities.

#### Data Encryption

- **Requirement**: All data transmitted between the client and server must be encrypted using industry-standard protocols such as TLS (Transport Layer Security). Additionally, sensitive data stored in the MySQL database, such as user credentials and personal information, should be encrypted at rest.
- **Rationale**: To protect data integrity and confidentiality during transmission and storage, and to safeguard against eavesdropping or data theft.

#### Audit Logging

- **Requirement**: Maintain detailed audit logs of all user actions within the system, including login attempts, data modifications, and system configuration changes. These logs should be immutable and stored securely.
- **Rationale**: To provide an audit trail for forensic analysis in case of a security incident, ensuring accountability and facilitating the identification of malicious activities.

#### Input Validation and Sanitization

- **Requirement**: Implement strict input validation and sanitization on all user inputs and API requests to prevent common vulnerabilities such as SQL injection, cross-site scripting (XSS), and command injection attacks.
- **Rationale**: To protect the system from malicious inputs that could lead to unauthorized data access, data corruption, or system compromise.

#### Denial-of-Service (DoS) Protection

- **Requirement**: Deploy measures to detect and mitigate denial-of-service attacks, ensuring the system remains available to legitimate users. Consider rate limiting, traffic analysis, and cloud-based DoS protection services.
- **Rationale**: To maintain system availability and reliability, preventing service disruptions caused by malicious traffic overload.

#### Privacy and Confidentiality

- **Requirement**: Adhere to relevant data protection regulations (such as GDPR, CCPA) concerning user data privacy and confidentiality. Implement policies for data minimization, purpose limitation, and user consent for data collection and processing.
- **Rationale**: To ensure compliance with legal requirements, protect user privacy, and maintain trust in the system's handling of personal and sensitive information.

#### Regular Security Assessments

- **Requirement**: Conduct regular security assessments, including vulnerability scanning, penetration testing, and code reviews, to identify and remediate potential security weaknesses.
- **Rationale**: To proactively discover and fix vulnerabilities, reducing the risk of exploitation and enhancing overall system security.

These security requirements are essential for safeguarding the DDL against various cyber threats, ensuring the protection of sensitive data, and maintaining user trust and system integrity. Implementing these measures will address potential vulnerabilities and compliance requirements, contributing to a secure and reliable inventory management system.

### System Requirements

The Data Driven Logistics (DDL) is designed to operate efficiently and securely within a specified technical environment. Below are the system requirements detailing the external entities, software dependencies, hardware requirements, and performance criteria essential for the successful deployment and operation of the system.

| Requirement Type     | Specification                       | Details                                                                                     |
| -------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------- |
| **Operating System** | Cross-platform                      | Must support Linux, Windows, and macOS for server deployment.                               |
| **Web Server**       | Node.js with Express                | Express.js will serve as the web server and API backend, running on Node.js.                |
| **Database**         | MySQL                               | The system relies on MySQL for data storage, requiring MySQL Server 5.7 or newer.           |
| **Frontend**         | Web Browsers                        | Must be compatible with modern web browsers (Chrome, Firefox, Safari, Edge) supporting ES6. |
| **Development**      | Node.js                             | Required for backend development. Version 14.x or newer recommended.                        |
| **Dependencies**     | React, Node.js, MySQL drivers, etc. | Software libraries and frameworks specified in `package.json` for Node.js applications.     |
| **Performance**      | Response Time < 2 seconds           | For user interactions through the web interface under normal load conditions.               |
| **Backup**           | Daily backups                       | Automated backups of the database and critical data.                                        |
| **Security**         | TLS 1.2 or higher                   | For encrypting data in transit. HTTPS should be enforced for all web interactions.          |

These system requirements ensure that the DDL is built on a solid and scalable foundation, capable of handling the demands of modern inventory and process management within the specified technical environment. Proper adherence to these requirements will facilitate a seamless and efficient operation, ensuring reliability, security, and optimal performance of the system.

### Specification

<!--A detailed specification of the system. UML, or other diagrams, such as finite automata, or other appropriate specification formalisms, are encouraged over natural language.-->

<!--Include sections, for example, illustrating the database architecture (with, for example, an ERD).-->

<!--Included below are some sample diagrams, including some example tech stack diagrams.-->

You can make headings at different levels by writing `# Heading` with the number of `#` corresponding to the heading level (e.g. `## h2`).

#### Technology Stack

Given the project's requirements and the development team's expertise, we have chosen the MERN stack with MySQL for the Data Driven Logistics (DDL). Below is a diagram illustrating the components of our chosen technology stack:

```mermaid
flowchart RL
subgraph Front End
	A(Javascript: React)
end

subgraph Back End
	B(Javascript: Node.js with Express)
end

subgraph Database
	C[(MySQL)]
end

A <-->|"REST API"| B
B <-->|"SQL Queries"| C
```

#### Database

```mermaid
---
title: Database ERD Diagram
---
erDiagram
    Users {
        int UserID PK
        int BusinessID FK
        int RoleID FK
        string Username
        string Password
        string FirstName
        string LastName
    }
    Roles {
        int RoleID PK
        string RoleName
        string Description
    }
    Businesses {
        int BusinessID PK
        string BusinessName
        string Description
    }
    Locations {
        int LocationID PK
        int BusinessID FK
        string Latitude
        string Longitude
    }
    LocationTypes {
        int TypeID PK
        string Name
    }
    Products {
        int ProductID PK
        string Name
        string Description
        float UnitPrice
    }
    Shipments {
        int ShipmentID PK
        int UserID FK
        int SourceID FK
        int DestinationID FK
        date DepartureDate
        date ArrivalDate
        int StatusID FK
    }
    ShipmentStatusTypes {
        int StatusID PK
        string Status
    }
    ShipmentDetails {
        int ShipmentDetailID PK
        int ShipmentID FK
        int ProductID FK
        int Quantity
    }
    InventoryLevels {
        int InventoryLevelID PK
        int LocationID FK
        int ProductID FK
        int Quantity
    }
    Transactions {
        int TransactionID PK
        int ItemID FK
        int LocationID FK
        int TypeID FK
        int Quantity
        date Date
        int UserID FK
    }
    TransactionTypes {
        int TypeID PK
        string Name
    }

    Users ||--o{ Roles : "has"
    Users ||--o{ Businesses : "belongs to"
    Businesses ||--o{ Locations : "has"
    Locations }|--|| LocationTypes : "is a"
    Locations ||--o{ InventoryLevels : "stores"
    Products ||--o{ InventoryLevels : "tracked in"
    Shipments ||--o{ ShipmentDetails : "includes"
    Shipments ||--o{ ShipmentStatusTypes : "has"
    Products ||--o{ ShipmentDetails : "contained in"
    Locations ||--o{ Shipments : "source"
    Locations ||--o{ Shipments : "destination"
    Users ||--o{ Transactions : "performs"
    Products ||--o{ Transactions : "involves"
    Locations ||--o{ Transactions : "occurs at"
    TransactionTypes ||--o{ Transactions : "is a"
```

#### Class Diagram

```mermaid
%% Class Diagram
classDiagram
    class User {
        -UserID: int
        -Username: string
        -Password: string
        -FirstName: string
        -LastName: string
        +authenticateUser()
    }
    class Role {
        -RoleID: int
        -RoleName: string
        -Description: string
    }
    class Business {
        -BusinessID: int
        -BusinessName: string
        -Description: string
    }
    class Location {
        -LocationID: int
        -Latitude: string
        -Longitude: string
        +getInventoryLevels()
    }
    class Product {
        -ProductID: int
        -Name: string
        -Description: string
        -UnitPrice: float
    }
    class Shipment {
        -ShipmentID: int
        -UserID: int
        -DepartureDate: date
        -ArrivalDate: date
        -Status: string
        +recordShipment()
        +getShipments()
    }
    class ShipmentDetail {
        -ShipmentDetailID: int
        -Quantity: int
    }
    class InventoryLevel {
        -InventoryLevelID: int
        -Quantity: int
        +updateQuantity()
    }
    class Transaction {
        -TransactionID: int
        -Quantity: int
        -Date: date
        +logInteraction()
    }
    class TransactionType {
        -TypeID: int
        -Name: string
    }
    class Report {
        +generateReport()
    }
    class UserInterface {
        +displayDashboard()
    }

    User "1" -- "*" Role : has
    User "1" -- "*" Business : belongs to
    Business "1" -- "*" Location : has
    Location "1" -- "*" Product : tracked in
    Shipment "1" -- "*" ShipmentDetail : includes
    Product "1" -- "*" ShipmentDetail : contained in
    Location "1" o-- "*" Shipment : source
    Location "1" o-- "*" Shipment : destination
    User "1" -- "*" Transaction : performs
    Product "1" -- "*" Transaction : involves
    Location "1" -- "*" Transaction : occurs at
    TransactionType "1" -- "*" Transaction : is a type of
    Report "1" -- "*" InventoryLevel : generates from
    UserInterface "1" -- "*" User : displays
    UserInterface "1" -- "*" Product : displays
    UserInterface "1" -- "*" Shipment : displays
    UserInterface "1" -- "*" Report : displays
    
  ```

#### Flowchart

```mermaid
---
title: Data Driven Logistics Flowchart
---
graph TD;
    Start([Start]) --> Check_Session{Check Session Storage};
    Check_Session -->|Exists| Load_Dashboard[Load Dashboard];
    Check_Session -->|Not Exists| Show_Login[Show Login Page];
    Show_Login --> Login[/Login/];
    Login --> Validate_Login{Validate Credentials};
    Validate_Login -->|Valid| Save_Session[Save Session to Storage];
    Validate_Login -->|Invalid| Display_Error[/Display Error Message/];
    Save_Session --> Load_Dashboard;
    Display_Error --> Show_Login;
    Load_Dashboard --> User_Action{User Actions};
    User_Action -->|View Inventory| View_Inventory[Display Inventory Levels];
    User_Action -->|Manage Shipments| Manage_Shipments[Record Incoming/Outgoing Shipments];
    User_Action -->|Adjust Inventory| Adjust_Inventory[Record Inventory Adjustments];
    User_Action -->|Model Processes| Model_Processes[Create/Manage Process Models];
    User_Action -->|Audit Trail| Audit_Trail[View Audit Logs];
    User_Action -->|Import/Export Data| Data_Import_Export[Manage Spreadsheet Import/Export];
    User_Action -->|Geospatial Visualizations| Geospatial_Visualizations[Visualize Inventory on Map];
    User_Action -->|Logout| Logout[Logout and Clear Session];
    View_Inventory --> User_Action;
    Manage_Shipments --> User_Action;
    Adjust_Inventory --> User_Action;
    Model_Processes --> User_Action;
    Audit_Trail --> User_Action;
    Data_Import_Export --> User_Action;
    Geospatial_Visualizations --> User_Action;
    Logout --> End([End]);
```

#### Behavior

```mermaid
stateDiagram-v2
    state UserSessionLifecycle {
        [*] --> LoginScreen: Access Application
        LoginScreen --> Authenticated: Successful Login
        Authenticated --> ActiveSession: Navigate Application
        ActiveSession --> Logout: User Logs Out
        Logout --> [*]
    }
    
    state InventoryLevelManagement {
        [*] --> Normal: Inventory at Optimal Level
        Normal --> LowInventory: Below Threshold
        LowInventory --> Reorder: Trigger Reorder
        Reorder --> Normal: Stock Replenished
    }
    
    state OrderProcessing {
        [*] --> OrderReceived: Order Placed
        OrderReceived --> Processing: Confirm Inventory
        Processing --> Shipping: Prepare for Shipment
        Shipping --> Shipped: Dispatch Order
        Shipped --> DeliveredOrder: Order Arrives
        DeliveredOrder --> [*]
    }
    
    state ShipmentLifecycle {
        [*] --> Created: Create Shipment
        Created --> InTransit: Dispatch
        InTransit --> Delivered: Arrive at Destination
        Delivered --> [*]
    }

    state HistoricalData {
        [*] --> FilteredResults: Specific Time and Period
        FilteredResults --> ExportedResults: User Export 
    }

    state EditInventory {
        [*] --> EditedInventory: Add
        [*] --> EditedInventory: Minus
    }
    

    ActiveSession --> UserSessionLifecycle: Logout
    ActiveSession --> EditInventory: Edit
    ActiveSession --> InventoryLevelManagement: Access Inventory
    ActiveSession --> OrderProcessing: Place Order
    ActiveSession --> ShipmentLifecycle: Create Shipment
    ActiveSession --> HistoricalData: Access Historical Data
    EditInventory --> InventoryLevelManagement: User Adjust

```

#### Sequence Diagram

##### System Overview

```mermaid
sequenceDiagram
  participant U as User
  participant WI as Web Interface (React)
  participant S as Server (Node.js with Express)
  participant DB as Database (MySQL)

  Note over WI,S: Real-Time Inventory Tracking
  U->>+WI: Request Inventory Data
  WI->>+S: API Call for Inventory
  S->>+DB: Query Inventory
  DB-->>-S: Inventory Data
  S-->>-WI: Inventory Response
  WI-->>-U: Display Inventory

  Note over WI,S: Process Modeling
  U->>+WI: Access Process Models
  WI->>+S: Request Process Data
  S->>+DB: Query Process Models
  DB-->>-S: Process Model Data
  S-->>-WI: Process Model Response
  WI-->>-U: Display Processes

  Note over WI,S: Shipments Recording
  U->>+WI: Log Shipment
  WI->>+S: Shipment Data
  S->>+DB: Update Shipment Record
  DB-->>-S: Confirmation
  S-->>-WI: Update Confirmation
  WI-->>-U: Display Confirmation

  Note over WI,S: Audit Trail
  U->>+WI: Request Audit Log
  WI->>+S: API Call for Audit Log
  S->>+DB: Query Audit Records
  DB-->>-S: Audit Data
  S-->>-WI: Audit Log Response
  WI-->>-U: Display Audit Log

  Note over WI,S: Reporting and Analytics
  U->>+WI: Request Reports
  WI->>+S: API Call for Analytics
  S->>+DB: Generate Report Data
  DB-->>-S: Reports and Analytics
  S-->>-WI: Report Response
  WI-->>-U: Display Reports
```

##### Real-Time Inventory Tracking System (RTIS)

```mermaid
sequenceDiagram
  participant U as User
  participant WI as Web Interface (React)
  participant S as Server (Node.js with Express)
  participant DB as Database (MySQL)
  
  U->WI: Request Inventory Data
  activate WI
  WI->S: API Call: GET /inventory
  activate S
  S->DB: SQL Query: SELECT inventory
  activate DB
  DB-->S: Inventory Data
  deactivate DB
  S-->WI: API Data Response: /inventory
  deactivate S
  WI-->U: Display Inventory
  deactivate WI

  note over WI, DB: Optional Features\n- Filtering by location\n- Updating inventory levels\n- Alerting on low stock
```
#### Process Modeling
```mermaid
sequenceDiagram
  participant U as User
  participant WI as Web Interface (React)
  participant S as Server (Node.js with Express)
  participant DB as Database (MySQL)

  U->WI: Access Process Modeling
  activate WI
  WI->S: API Call: GET /models
  activate S
  S->DB: SQL Query: SELECT existing-models
  activate DB
  DB-->S: Process Model Data
  deactivate DB
  S-->WI: API GET Response (Process Model)
  deactivate S
  WI-->U: Display Process Models
  deactivate WI

  U->WI: Create Process Model
  activate WI
  WI->S: API Call: POST /models
  activate S
  S->DB: Insert Process Model
  activate DB
  DB-->S: Process Inserted Confirmation
  deactivate DB
  S-->WI: API POST Response (Process inserted?)
  deactivate S
  WI-->U: Display Confirmation
  deactivate WI

  U->WI: Edit Process Model
  activate WI
  WI->S: API Call: PUT /models
  activate S
  S->DB: Update Process Model
  activate DB
  DB-->S: Process Updated Confirmation
  deactivate DB
  S-->WI: API PUT Response (Process updated?)
  deactivate S
  WI-->U: Display Confirmation
  deactivate WI

  U->WI: Delete Process Model
  activate WI
  WI->S: API Call: DELETE /models
  activate S
  S->DB: Delete Process Model
  activate DB
  DB-->S: Process Deleted Confirmation
  deactivate DB
  S-->WI: API DELETE Response (Process deleted?)
  deactivate S
  WI-->U: Display Confirmation
  deactivate WI
```

#### Shipments Recording
```mermaid
sequenceDiagram
  participant U as User
  participant WI as Web Interface (React)
  participant S as Server (Node.js with Express)
  participant DB as Database (MySQL)

  U->WI: Access Shipments Feature
  activate WI
  WI->S: API Call: GET /shipments
  activate S
  S->DB: SQL Query: SELECT shipments
  activate DB
  DB-->S: Shipments Data
  deactivate DB
  S-->WI: API GET Response (Shipments Data)
  deactivate S
  WI-->U: Display Shipments
  deactivate WI

  U->WI: Log New Shipment
  activate WI
  WI->S: API Call: POST /shipments
  activate S
  S->DB: SQL Insert: New Shipment
  activate DB
  DB-->S: Shipment Inserted Confirmation
  deactivate DB

  S-->WI: API POST Response (Shipment Updated)

  WI->S: API Call: PUT /inventory-quantity
  S->DB: SQL Insert: New Shipment

  activate DB
  DB-->S: Inventory Updated Confirmation
  deactivate DB


  S-->WI: API PUT Response (Inventory Updated)
  deactivate S
  WI-->U: Display Confirmation (Both Shipment & Inventory)
  deactivate WI
```

#### Audit Trail
```mermaid
sequenceDiagram
  participant U as User
  participant WI as Web Interface (React)
  participant S as Server (Node.js with Express)
  participant DB as Database (MySQL)

  U->WI: Perform Action (e.g., Update Inventory)
  activate WI
  WI->S: API Call (e.g., PUT /inventory)
  activate S
  S->DB: Execute Action (e.g., Update Query)
  activate DB
  DB-->S: Action Result (success/failure)
  deactivate DB

  S->DB: Log Interaction in Audit Trail
  activate DB
  DB-->S: Logging Confirmation
  deactivate DB

  S-->WI: API Response (e.g., PUT Response)
  deactivate S
  WI-->U: Display Result (e.g., Update Confirmation)
  deactivate WI
```



#### Reporting and Analytics
```mermaid
sequenceDiagram
  participant U as User
  participant WI as Web Interface (React)
  participant S as Server (Node.js with Express)
  participant DB as Database (MySQL)

  U->WI: Request Specific Report/Analytics
  activate WI
  WI->S: API Call: GET /reports?type=specificType
  activate S
  S->DB: Query for Required Data
  activate DB
  DB-->S: Data for Report/Analytics
  deactivate DB

  S->DB: Perform Data Analysis
  activate DB
  DB-->S: Analysis Results
  deactivate DB

  S-->WI: API GET Response (Report/Analytics Data)
  deactivate S
  WI-->U: Display Report/Analytics
  deactivate WI
```


### Standards & Conventions

<!--Here you can document your coding standards and conventions. This includes decisions about naming, style guides, etc.-->
