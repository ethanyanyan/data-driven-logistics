### User Requirements

The user requirements for the Data Driven Logistics (DDL) system aim for clear comprehension and straightforwardness, with each requirement assigned a priority level—High, Medium, or Low—to effectively direct development efforts and manage resource allocation.

#### Inventory levels of Facilities

- **R1**: The system shall provide real-time tracking of the inventory level of a certain facility, accessible by a facility manager.
  - Priority: High
  - Status: Open

- **R2**: The system shall display only the inventory level of the facility directly managed by the manager.
  - Priority: High
  - Status: Open

#### Shipments Management 

- **R3**: The system shall display the shipment records for facility managers, showing the source, destination, date, and the shipped amount.
  - Priority: High
  - Status: Open

- **R4**: The system shall allow facility managers to create new shipments, and after a shipment is created, the inventory level should be updated accordingly.
  - Priority: Medium
  - Status: Open

#### Historical Inventory Level

- **R8**: The system should let facility manager see past inventory information, helping them track changes over time and study trends.
  - Priority: Medium
  - Status: Open

#### User of Different Roles

- **R5**: The system shall allow two kinds of roles, facility manager and corporate manager. The system shall display inventory level for facility manager after logged in, and shall display facility management page for corporate manager after logged in.
  - Priority: Low
  - Status: Open

#### Facilities Management

- **R6**: The system will allow corporate managers to view, establish, and deactivate facilities on their dashboards.
  - Priority: Low
  - Status: Open

#### Reports

- **R9**: Upon request, the system must generate comprehensive inventory and shipment reports for corporate managers, including data from all facilities.
  - Priority: Low
  - Status: Open

#### Security

- **R9**: The system should enforce access control mechanisms, ensuring facility managers can access and manipulate only inventory relevant to them.
  - Priority: High
  - Status: Open

### Use Cases & User Stories

Consistent with the previously defined user requirements, the subsequent sections present a series of use cases and user stories that describe crucial scenarios within the Data Driven Logistics (DDL) system. These use cases, which originate from user stories, capture and distinguish the essential functionalities of the system. To prioritize development efforts effectively, each use case is assigned a priority level—"High," "Medium," or "Low"—indicating the importance of addressing these features before the project deadline.

#### Use Case 1: Facility Inventory Level Display for Facility Manager

- **Priority**: High
- **User Story**:
  > As a facility manager, I'd like to check my facility's inventory to efficiently handle daily operations.
- **Acceptance Test**:
  1. Log in to the system with a facility manager account.
  2. Verify that inventory level are displayed correctly.

#### Use Case 2: Shipment Records Display for Facility Manager

- **Priority**: High
- **User Story**:
  > As a facility manager, I want to review the shipment records of my facility.
- **Acceptance Test**:
  1. Log in to the system with a facility manager account.
  2. Click "Shipment Tracking", verify that it navigates to the shipment management page.
  2. Verify that shipment records are displayed correctly.

#### Use Case 3: Create Shipments by Facility Manager

- **Priority**: Medium
- **User Story**:
  > As a facility manager, I'd like to create shipments between two locations to enhance operational efficiency.
- **Acceptance Test**:
  1. Log in to the system with a facility manager account.
  2. Click "Shipment Tracking", verify that it navigates to the shipment management page.
  3. Click "New Shipment", fill in the shipment information and submit it. Verify that a new shipment record is displayed on the page.
  4. Verify that inventory level has changed accordingly.

#### Use Case 4: Historical Inventory Level for Facility Manager

- **Priority**: Medium
- **User Story**:
  > As a facility manager, I want to see the historical inventory levels of the facility I am managing, so I could study the trends.
- **Acceptance Test**:
  1. Log in to the system with a facility manager account.
  2. Verify that it navigates to the facility inventory level page.
  3. Click "History", and a chart should be displayed.

#### Use Case 5: Facility Overview for Corporate Manager

- **Priority**: Low
- **User Story**:
  > As a corporate manager, I want to see the facilities that I have, so I can have a high-level overview of our operational scale.
- **Acceptance Test**:
  1. Log in to the system with a corporate manager account.
  2. Verify that it naviagates to the dashboard to view a summary of all facilities.
  3. Verify the facilities are all displayed correctly. 

#### Use Case 6: Facility Creation by Corporate Manager

- **Priority**: Low
- **User Story**:
  > As a corporate manager, I'd like to create new facilities so that we could expand our business.
- **Acceptance Test**:
  1. Log in to the system with a corporate manager account.
  2. Verify that it naviagates to the dashboard to view a summary of all facilities.
  2. Click "New Facility" and enter the information for the new facility and submit.
  4. Verify the new facility is listed.

#### Use Case 7: Deactivate a Facility by Corporate Manager

- **Priority**: Low
- **User Story**:
  > As a corporate manager, I wish to indicate when a facility has stopped operations from a certain date, ensuring it is excluded from future aggregate reports for precise data accuracy.
- **Acceptance Test**:
  1. Log in to the system with a corporate manager account.
  2. Verify that it naviagates to the dashboard to view a summary of all facilities.
  3. Select the facility that needs to be deactivated
  4. Verify that the facility should not be listed on the page.
  5. Verify that the corresponding facility manager should see empty inventory level
  4. Verify the facility is no longer included in future aggregation reports.

#### Use Case 8: Security Issues for a Corporate

- **Priority**: High
- **User Story**:
  > As a corporate manager, I don't want a facility manager to be able to touch other manager's inventory. Moreover, I don't want a facility manager to access the page that i could access.
- **Acceptance Test**:
  1. Log in to the system with a facility manager account.
  2. Verify that it naviagates to the dashboard to view a summary of all facilities.
  3. Verify that there is no way to access other inventories, or even the facility management page which is only managed by the corporate manager.