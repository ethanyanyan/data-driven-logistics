### User Requirements

The user requirements for the Data Driven Logistics (DDL) are organized around different user roles and system functionalities to ensure clarity and ease of understanding. Each requirement is designated a priority level (High, Medium, Low) to guide development focus and resource allocation.

#### Inventory and Facility Management

- **R1**: The system SHALL enable corporate managers to view, create, and deactivate facilities within the system as per the authorized permissions.
  - Priority: High
  - Status: Open
- **R2**: The system SHALL provide real-time tracking of inventory levels and shipments at each facility, accessible by facility managers.
  - Priority: High
  - Status: Open
- **R3**: The backend SHALL generate aggregate inventory and shipment reports for corporate managers, covering all facilities, upon request.
  - Priority: Medium
  - Status: Open

#### Process Modeling and Shipments

- **R4**: The system SHALL allow facility managers to model processes transforming inputs into outputs, including the calculation of potential waste production.
  - Priority: Low
  - Status: Open
- **R5**: Following shipment records or process execution events, the backend SHALL update the inventory in the database to reflect changes accurately.
  - Priority: Low
  - Status: Open

#### Historical Data and Reporting

- **R4**: The system SHALL provide users with access to historical inventory data, enabling tracking of changes over time and trend analysis.
  - Priority: Medium
  - Status: Open
- **R5**: The system SHALL offer reporting tools that generate custom reports based on user-specified criteria, such as time period and location.
  - Priority: Low
  - Status: Open

#### Audit Trail and Security

- **R9**: Each inventory or process model update SHALL be logged with user identification to support a comprehensive audit trail.
  - Priority: Low
  - Status: Open
- **R10**: The system SHALL enforce access control mechanisms, ensuring users can access and manipulate only inventory and processes relevant to their roles.
  - Priority: Low
  - Status: Open

#### Extensions and Integrations

- **R11**: The system SHALL support functionalities for importing and exporting data via spreadsheets for user convenience in data manipulation and reporting.
  - Priority: Low
  - Status: Open
- **R12**: The system SHALL integrate with geospatial data visualization tools for enabling location-based inventory tracking.
  - Priority: Low
  - Status: Open

These requirements serve as a foundational guide for the development and implementation of the DDL, ensuring it meets the needs of businesses in managing their inventory and production processes efficiently and effectively.

### Use Cases & User Stories

In alignment with the user requirements outlined previously, the following use cases and user stories detail key scenarios within the Data Driven Logistics (DDL). Each use case is derived from user stories, ensuring that every major scenario is represented and distinct in its contributions to the system's functionality. Use cases are categorized by priority: "High," "Medium," or "Low," to guide development focus towards the most critical features by the project deadline.

#### Use Case 1: Facility Overview for Corporate Manager

- **Priority**: High
- **User Story**:
  > As a corporate manager, I want to see a count of how many facilities I have, so I can have a high-level overview of our operational scale.
- **Acceptance Test**:
  1. Log in to the system with corporate manager credentials.
  2. Access the dashboard to view a summary of all facilities.
  3. Verify the total count of facilities is displayed accurately.

#### Use Case 2: Facility Inventory Overview

- **Priority**: High
- **User Story**:
  > As a facility manager, I want to view what I have in my facility's inventory, so I can manage day-to-day operations effectively.
- **Acceptance Test**:
  1. Log in to the system with facility manager credentials.
  2. Navigate to the "Inventory" section for their facility.
  3. Verify that current inventory levels are accurately displayed.

#### Use Case 3: Facility Creation

- **Priority**: Medium
- **User Story**:
  > As a corporate manager, I want to create a new facility, so we can expand our operations to new locations.
- **Acceptance Test**:
  1. Log in to the system with corporate manager credentials.
  2. Navigate to the "Facilities Management" section and select "Create New Facility."
  3. Enter the necessary information for the new facility and confirm creation.
  4. Verify the new facility is listed in the system.

#### Use Case 4: Deactivating a Facility

- **Priority**: Medium
- **User Story**:
  > As a corporate manager, I want to mark that a facility has ceased operation as of some date, so it's not included in aggregates after that date, ensuring accurate reporting.
- **Acceptance Test**:
  1. Log in to the system with corporate manager credentials.
  2. Navigate to the "Facilities Management" section and select the facility to deactivate.
  3. Mark the facility as ceased operations with the specified date.
  4. Verify the facility is no longer included in future aggregate reports.

#### Use Case 5: Historical Inventory Tracking

- **Priority**: Medium
- **User Story**:
  > As a facility manager, I want to view what I used to have in my facility's inventory at some past time, and what I will have in the future, so I can plan for inventory needs and audits.
- **Acceptance Test**:
  1. Log in to the system with facility manager credentials.
  2. Navigate to the "Inventory History" section.
  3. Select a past or future date to view inventory levels for that time.
  4. Verify the displayed inventory levels match historical records or future projections.

#### Use Case 6: Aggregate Inventory Tracking

- **Priority**: Low
- **User Story**:
  > As a corporate manager, I want to see an aggregate of the inventory that has come into and gone out from all facilities over an arbitrary time span, so I can understand inventory flow and make informed strategic decisions.
- **Acceptance Test**:
  1. Log in to the system with corporate manager credentials.
  2. Navigate to the "Inventory Reports" section.
  3. Select a time span and verify the aggregate inventory data is displayed correctly.
  

Each use case includes specific acceptance tests to validate the implementation. These scenarios provide concrete examples that the customer will use to determine if the respective use case has been successfully implemented. The prioritization of use cases ensures that development efforts are aligned with the most critical functionalities required by the deadline.