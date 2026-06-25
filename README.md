
# 🧠 AI Quiz Generator

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

An intelligent, full-stack web application that instantly converts any text passage into an interactive quiz. Built with Angular on the frontend and Spring Boot on the backend, this tool leverages Google's Gemini AI to extract key concepts from your reading materials and generate dynamic assessments.

**Live Frontend Demo:** [AI Quiz Generator](https://nbisht11.github.io/ai-quiz-generator/) **Passcode:** 1cC4ZSIAqV24Wg

**Backend API Hosted On:** [Render](https://quiz-generator-rtsw.onrender.com)

---

## ✨ Features

* **AI-Powered Generation:** Leverages Google AI Studio (Gemini) via Spring AI to instantly generate high-quality quiz questions, options, and explanations derived from the provided text
* **Rich Text Editing:** Integrated with **TinyMCE** to handle rich text inputs, ensuring your reading materials and notes maintain their original structure.
* **Modern UI/UX:** A responsive, dynamic frontend built with Angular.
* **Cloud Deployed:** Frontend seamlessly hosted on GitHub Pages with the backend running reliably on Render.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Angular
* **Rich Text Editor:** TinyMCE
* **Deployment:** GitHub Pages

### Backend
* **Framework:** Java / Spring Boot
* **AI Integration:** Spring AI
* **LLM Provider:** Google AI Studio (Gemini API)
* **Deployment:** Render

---

## 🚀 Local Development Setup

If you want to run this project locally, follow the steps below.

### Prerequisites
* **Node.js** and **npm** (for Angular)
* **Angular CLI** (`npm install -g @angular/cli`)
* **Java 17+** and **Maven** (for Spring Boot)
* A valid **Google AI Studio API Key**

### 1. Backend Setup (Spring Boot)
1. Clone the repository:
   ```bash
   git clone https://github.com/nbisht11/ai-quiz-generator.git

2. Navigate to the backend directory:
    ```bash
    cd backend


3. Configure your API Key:
    Open `src/main/resources/application.yml` and add your Google AI API key:
    ```properties
    spring:
        application:
            name: quiz-generator
        ai:
            openai:
            api-key: ${GEMINI_API_KEY}
            base-url: https://generativelanguage.googleapis.com/v1beta/openai/
            chat:
                options:
                # Specify the Gemini model you want to use (e.g., gemini-2.0-flash, gemini-1.5-pro)
                model: gemini-3.1-flash-lite

    app:
        config:
            prompt-path: classpath:prompts/generate_quiz_prompt.yml
            default-username: user
            default-password: ${DEFAULT_PASSWORD}
            secret-key: ${JWT_SECRET_KEY}


4. Run the Spring Boot application:
    ```bash
    mvn spring-boot:run


*The backend will typically start on `http://localhost:8080`.*

### 2. Frontend Setup (Angular)

1. Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend


2. Install dependencies:
    ```bash
    npm install

3. Configure the Backend API URL in your `environment.ts` file:
    ```typescript
    export const environment = {
        production: false,
        API_HOST: "http://localhost:8080",
        GENERATE_QUESTION_ENDPOINT: "/generate-quiz",
        LOGIN_ENDPOINT: "/login",
        HEALTHCHECK_ENDPOINT: "/health"
    };


4. Start the Angular development server:
    ```bash
    ng serve


*The frontend will be available at `http://localhost:4200`.*

---

## ☁️ Deployment Notes

* **Frontend:** Deployed via GitHub Actions/gh-pages. Ensure that your base href is correctly set in `angular.json` for GitHub Pages routing.
* **Backend:** Deployed on Render using a Dockerfile. Cold starts may take up to 50 seconds on Render's free tier, so the initial quiz generation upon waking the server might experience a slight delay.
---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://nbisht11.github.io/ai-quiz-generator/issues).

## 📝 License

This project is [MIT](https://www.google.com/search?q=LICENSE) licensed.