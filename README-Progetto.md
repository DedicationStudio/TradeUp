The application was developed in Angular with a Node.js backend, and it is hosted on Firebase using Firebase Hosting and Firebase Functions. Most of the logic was deliberately placed in the frontend code, making it more complex, in order to minimize the risk of external hacking attempts.

The app also makes extensive use of the TradingView and Binance APIs. TradingView provides professional-grade data visualization, while Binance ensures access to “realistic” market data.

When users land on the application, they arrive on the Portfolio landing page, which combines TradingView + Binance charts with a dynamic text animation that changes over time to give a sense of “live activity.”
This text animation was implemented using Typed.js (https://github.com/mattboldt/typed.js).

Across the entire app, multiple animations were designed with Rive (https://rive.app). We took inspiration from Duolingo, which also integrates Rive extensively, to build an engaging, game-like learning experience.

---

User Flow

The user has two options on the landing page: Login or Sign Up.
(For future updates, we plan to let the browser remember the user via cache, so they don’t need to log in every time.)

Login
When logging in, a request is sent to the backend API. The server responds with different messages depending on the case: correct login, wrong password, wrong email, etc.
If successful, the user is shown a loading page and then redirected to /learn.

Sign Up
During sign-up, the user is asked a few questions to gather statistics on the app’s audience and, most importantly, to personalize their learning path.
The data collected may include age, how they discovered the app, and similar information.

---

Learning Path

Once inside, the user must complete both categories and sections to progress.

The journey begins with missions, which come in two forms and are all stored in the database:

1. Question Missions
   - Contain a question, multiple options, and a correct answer.
   - Include two types of explanations: a short one and a longer, more detailed one for users who want to go deeper into the topic.
   - All content was carefully researched using sources like Peter Lynch and Warren Buffett to ensure credibility.

2. Chart Missions
   - Display a trading chart built in real-time from TradingView and Binance API calls.
   - The data includes candlesticks, entry points, and exit points, shown directly on the chart.
   - The mission asks the user to analyze the chart, answer a related question, and choose Buy or Sell.
   - Each chart mission also comes with both a short and an extended explanation.

---

Level Structure

- Each level contains 7 to 15 missions, carefully chosen based on the user’s needs.
- Every mission is labeled with tags (topic, difficulty, type), and levels are also defined by tags. This allows the system to select the most relevant missions for each user.
- If there aren’t enough missions available for a specific level, some missions are repeated.
- To complete a level, the user must go through it at least 3 times.
- If the user makes 5 mistakes, the progress bar for that level turns red. If they succeed, it turns green.
- Too many mistakes force the user to restart the level from scratch, but if they show consistent improvement by completing multiple correct levels after failed ones, they are allowed to move forward.
- Throughout this process, the app constantly updates the user’s ability to handle more difficult missions.

---

Portfolio and Rewards

Each correct or incorrect answer on a chart mission directly impacts the user’s virtual portfolio.
Users earn virtual money to simulate a real trading account, and their overall progress is displayed in the /learn section.

Additionally, the app features a streak system, which tracks consecutive days of activity and will later provide special rewards to encourage consistency.
