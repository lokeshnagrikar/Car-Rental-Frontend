# Car Rental Frontend

A modern, responsive frontend application for a car rental service built with React.js.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Profile Management**: User profile updates and management
- **Car Browsing**: Browse available cars with filtering options
- **Booking System**: Complete car rental booking process
- **Location Services**: Google Maps integration for car locations
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **User Dashboard**: Track bookings, history, and account details
- **Admin Panel**: Manage cars, bookings, and users (for administrators)

## 🛠️ Technologies

- React.js
- React Router
- Redux (or Context API) for state management
- Axios for API requests
- Tailwind CSS / Material UI / Bootstrap (for styling)
- Google Maps API
- JWT for authentication
- React Hook Form (for form handling)

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Car Rental Backend API running

## 🔧 Installation & Setup

1. **Clone the repository**

   ```
   git clone https://github.com/lokeshnagrikar/Car-Rental-Frontend.git
   cd Car-Rental-Frontend
   ```

2. **Install dependencies**

```
npm install
# or
yarn install
```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following variables:

REACT_APP_API_URL=http://localhost:8081/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

4. **Start the development server**

```shellscript
npm start
# or
yarn start
```

5. **Access the application**
   Open your browser and navigate to:

```
http://localhost:3000

```

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
│   ├── common/      # Common UI elements (buttons, inputs, etc.)
│   ├── layout/      # Layout components (header, footer, etc.)
│   └── features/    # Feature-specific components
├── pages/           # Page components
├── services/        # API services and data fetching
├── store/           # State management (Redux or Context)
├── utils/           # Utility functions
├── hooks/           # Custom React hooks
├── routes/          # Route definitions
├── styles/          # Global styles
└── App.js           # Main application component
```

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in through the login page
2. Upon successful authentication, JWT token is stored in localStorage
3. Token is included in the Authorization header for API requests
4. Protected routes check for valid token before rendering

## 📱 Key Features Explained

### User Profile Management

- Update personal information
- Change password
- Upload profile picture

### Car Browsing and Filtering

- Browse all available cars
- Filter by make, model, price range, etc.
- View detailed information about each car

### Booking Process

1. Select car
2. Choose rental dates
3. Review booking details
4. Confirm and pay
5. Receive booking confirmation

### Location Services

- View car locations on Google Maps
- Search for pickup locations
- Get directions to pickup locations

## 🔄 Integration with Backend

This frontend application communicates with the [Car Rental Backend](https://github.com/lokeshnagrikar/Car-Rental-Backend) through RESTful API endpoints. Make sure the backend server is running before using this application.

## 🎨 UI/UX Design

The application features a modern, clean, and intuitive user interface with:

- Responsive design that works on mobile, tablet, and desktop
- Intuitive navigation and user flows
- Accessible components following WCAG guidelines
- Consistent styling and theming throughout

## 🚢 Deployment

### Build for Production

```shellscript
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Deploy directly from GitHub or upload the build folder
- **GitHub Pages**: Deploy using gh-pages package
- **AWS S3/CloudFront**: Host as a static website

## 🧪 Testing

Run tests using:

```
npm test
# or
yarn test
```

The application includes:

- Unit tests for components and utilities
- Integration tests for key user flows
- End-to-end tests for critical paths

## 🛣️ Roadmap

Future enhancements planned for this project:

- Multi-language support
- Offline capabilities with service workers
- Push notifications for booking updates
- Advanced filtering and search options
- Payment gateway integration( still in Processing )
- Virtual car tours

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Contact

For any questions or suggestions, please open an issue in this repository.

## 📸 Screenshots

![Home Page](./screenshots/home.png)
![Car Details](./screenshots/car-details.png)
![Booking Flow](./screenshots/booking.png)

This README provides a comprehensive overview of your Car Rental Frontend project, including setup instructions, features, and project structure. You can customize it further based on specific details of your implementation.

## 📚 API Endpoints

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| GET    | `/cars`      | List all cars        |
| POST   | `/bookings`  | Create a new booking |
| GET    | `/users/:id` | Get user profile     |
| ...    | ...          | ...                  |

See [Car Rental Backend API Docs](https://github.com/lokeshnagrikar/Car-Rental-Backend) for full details.
