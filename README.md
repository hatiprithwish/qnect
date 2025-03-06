##### Backend Repo: https://github.com/hatiprithwish/qnect_server

# Qnect - The System Design Judge

System Design Hub is a curated collection of industry-relevant system design problems that helps software engineers prepare for technical interviews and improve their architecture skills. Each problem includes detailed requirements, constraints, and expert-guided solutions.

## Features

- 🚀 Top System Design Questions: Carefully selected problems covering various domains and complexity levels
- 🤖 AI-Powered Feedback: Get intelligent suggestions to improve your design solutions
- 📈 Scalability Focus: Learn how to design systems that can handle growth and high loads
- 🔄 Real-world Scenarios: Practice with problems based on actual production systems

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/qnect.git
   cd qnect/qnect-client
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   VITE_CLIENT_URL=http://localhost:5173/
   VITE_SERVER_URL=http://localhost:5994/api/v1/
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Use the sidebar to drag and drop shapes and icons onto the canvas.
3. Save your progress, export the flowchart, or generate a shareable link using the top bar.

## Project Structure

- `src/`: Contains the source code for the application.
  - `components/`: Contains React components used in the application.
  - `pages/`: Contains the main pages of the application.
  - `constants/`: Contains constant values used throughout the application.
  - `lib/`: Contains utility functions.
- `public/`: Contains static assets.
- `index.html`: The main HTML file.
- `package.json`: Contains the project dependencies and scripts.
- `tailwind.config.js`: Tailwind CSS configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `.eslintrc.cjs`: ESLint configuration file.

## License

This project is licensed under the MIT License.
