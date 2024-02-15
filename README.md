# Data Driven Logistics

![Data Driven Logistics Logo](logo.png)

## Project Overview

Data Driven Logistics is a web-based application designed to empower businesses, specifically within the automotive manufacturing sector, to efficiently track and manage inventory across multiple physical locations. This solution enables the modeling of business processes, the recording of shipments, the tracking of inventory quantities, and provides a comprehensive audit trail of updates made by users. Data Driven Logistics aims to deliver real-time insights into inventory levels, ensuring businesses can make informed decisions to optimize their operations.

## Features

- **Real-Time Inventory Tracking**: View up-to-date inventory levels across all locations from a centralized dashboard.
- **Process Modeling**: Define and model key business processes to optimize production workflows.
- **Shipments Recording**: Log incoming and outgoing shipments, automatically updating inventory quantities.
- **Audit Trail**: Maintain a log of all system interactions for accountability and data integrity.
- **Reporting and Analytics**: Generate custom reports to analyze trends and performance.
- **User-Friendly Interface**: Intuitive web interface for easy navigation and operation.
- **Security**: Robust authentication, authorization, and encryption mechanisms to protect sensitive data.

## Technology Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Development Tools**: Git for version control, Postman for API testing

## System Requirements

- **Operating Systems**: Linux, Windows, macOS
- **Web Servers**: Supported via Node.js and Express
- **Databases**: MySQL Server 5.7 or newer
- **Browsers**: Chrome, Firefox, Safari, Edge (with ES6 support)
- **Hardware (Recommended)**: 8 GB RAM, Multi-core CPU (2GHz or faster), 500 GB SSD

## Getting Started

### Prerequisites

- Node.js (v14.x or newer)
- MySQL Server (v5.7 or newer)
- Git

### Installation

1. Clone the repository:
    ```bash
    git clone git@git.doit.wisc.edu:cdis/cs/courses/cs506/sp2024/team/mondaywednesdaylecture/T_04/data-driven-logistics.git
    ```

2. Navigate to the project directory:
    ```bash
    cd data-driven-logistics
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Configure the database connection in `config/database.js`.

5. Initialize the database schema:
    ```bash
    npm run db:init
    ```

6. Start the server:
    ```bash
    npm start
    ```

7. Access the application at `http://localhost:3000`.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- CS506 Instructional Staff for guidance and support
- Industry Consultants for invaluable insights into the automotive manufacturing sector
- All contributors who help make this project better

