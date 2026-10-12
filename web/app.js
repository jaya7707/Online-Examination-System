
const demoCredentials = {
    studentId: "student1",
    password: "1234"
};

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        if (
            username === demoCredentials.studentId &&
            password === demoCredentials.password
        ) {
            sessionStorage.setItem("student", username);
            window.location.href = "exam.html";
        } else {
            message.textContent =
                "Invalid student ID or password. Please try again.";
        }
    });
}

const examForm = document.getElementById("examForm");

if (examForm) {
    const questions = [
        {
            question: "Which data structure uses FIFO?",
            options: ["Stack", "Queue", "Tree", "Graph"],
            answer: 1
        },
        {
            question: "Which language runs natively in a web browser?",
            options: ["Java", "C++", "JavaScript", "SQL"],
            answer: 2
        },
        {
            question: "What is the time complexity of binary search?",
            options: ["O(n)", "O(log n)", "O(n²)", "O(1) always"],
            answer: 1
        },
        {
            question: "Which keyword creates an object in Java?",
            options: ["make", "object", "new", "create"],
            answer: 2
        },
        {
            question: "Which SQL command retrieves records?",
            options: ["GET", "SELECT", "PUSH", "UPDATE"],
            answer: 1
        }
    ];

    let currentQuestion = 0;
    const answers = Array(questions.length).fill(null);
    let remainingSeconds = 300;
    let submitted = false;

    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("options");
    const questionCount = document.getElementById("questionCount");
    const timer = document.getElementById("timer");
    const message = document.getElementById("examMessage");

    document.getElementById("studentInfo").textContent =
        "Student: " + (sessionStorage.getItem("student") || "Demo Student");

    function renderQuestion() {
        const q = questions[currentQuestion];

        questionCount.textContent =
            `Question ${currentQuestion + 1} of ${questions.length}`;

        questionText.textContent = q.question;
        optionsContainer.replaceChildren();

        q.options.forEach((option, index) => {
            const label = document.createElement("label");
            label.className = "option";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "answer";
            radio.value = index;
            radio.checked = answers[currentQuestion] === index;

            radio.addEventListener("change", () => {
                answers[currentQuestion] = index;
            });

            label.append(radio, document.createTextNode(" " + option));
            optionsContainer.appendChild(label);
        });

        document.getElementById("previousBtn").disabled =
            currentQuestion === 0;

        document.getElementById("nextBtn").disabled =
            currentQuestion === questions.length - 1;

        message.textContent = "";
    }

    document.getElementById("previousBtn").addEventListener("click", () => {
        if (!submitted && currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (!submitted && currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        }
    });

    function submitExam() {
        if (submitted) return;
        submitted = true;

        const score = answers.reduce(
            (total, answer, index) =>
                total + (answer === questions[index].answer ? 1 : 0),
            0
        );

        sessionStorage.setItem("examScore", score);
        sessionStorage.setItem("totalQuestions", questions.length);
        sessionStorage.setItem("examAnswers", JSON.stringify(answers));

        window.location.href = "result.html";
    }

    examForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitExam();
    });

    renderQuestion();

    const countdown = setInterval(() => {
        if (submitted) {
            clearInterval(countdown);
            return;
        }

        remainingSeconds--;

        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        timer.textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        if (remainingSeconds <= 0) {
            clearInterval(countdown);
            submitExam();
        }
    }, 1000);
}
