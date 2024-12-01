# Financial Portfolio Management Application

This is a web-based application for managing financial portfolios, allowing users to track their investments, view performance reports, and make informed decisions. The app provides a dashboard for displaying portfolio information and a form for adding new investments.

# Features

Dashboard:

    1. Displays key portfolio information such as asset allocation and market trends.
    2. Uses interactive charts to visualize portfolio performance over time.

Investment Form:

    1. Users can input their investment details (asset type, quantity, purchase price, and date).
    2. Provides the ability to review user input before submission.
    
State Management:

    The app uses NgRx for state management to handle updates to the asset allocation and market trends.

Routing:
    The app has routes for the dashboard and investment form, using Angular Router.

Responsive Design:
    The application is responsive and adjusts layout based on the screen size.

# Technologies Used
    Angular: Front-end framework.
    NgRx: State management library.
    Angular Material: UI components (e.g., buttons, form fields, dialogs).
    Ngx-Charts: Interactive charts for data visualization.
    RxJS: Reactive programming for handling async events.
    TypeScript: Strongly typed superset of JavaScript.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

# Setup and Installation
    Clone the repository:

        git clone <repository-url>
        cd <project-folder>

    Install dependencies:

        Run the following command to install the required packages:

        npm install
        Run the application:

        After the dependencies are installed, run the application using the following command:

        ng serve
        The app should now be running at http://localhost:4200.

    Access the Application:

        Dashboard: Navigate to /dashboard to view portfolio information and trends.
        Investment Form: Navigate to /forms to input new investment details.