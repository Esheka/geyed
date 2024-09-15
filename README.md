# gEYEd me
## Inspiration
We were inspired to use advanced techniques and modern machine learning to increase accessibility for visually impaired individuals. By digitizing the purpose of a seeing-eye dog, we aimed to reduce the financial burden one may have on an individual. By training and using our own computer vision model, we hoped to make the process of navigating our world more feasible and seamless for those underrepresented in our society.

## What it does
Our app, gEYEd me, continuously observes your surroundings using your device's camera to detect unpredictable obstacles and will warn you if you are en route to collide with one. Additionally, you can prompt the app by saying "Hey, guide me" to ask a question about your surroundings. For example, if you ask where the nearest door is, our app will read out loud how to avoid obstacles and reach your destination. Other examples are as simple as "Am I in front of room 1030?" or "What am I holding?"

## How we built it
Our main application is made using React and Javascript. Roboflow hosts our computer vision ML model. We trained the ML model based on objects around campus that we deemed could become obstructions, such as tables and chairs. React's Speech Recognition library is used to process user prompts. API calls to OpenAI are used to alert and respond to user-prompted queries. Our web app is deployed using Defang and is hosted on an AWS ECS. The domain was registered through GoDaddy. 

## Challenges we ran into
Where do we start... Our first challenge was using the Speech Recognition library to identify a custom prompt by continuously monitoring user speech. A point of emphasis was to eliminate all touch gestures by allowing controls through speech. The main challenge was capturing the ensuing statement without restarting voice recognition. The next challenge we faced was in regards to getting the model trained and hosted. We originally had too much data and the model would take 9 hours to train, so we cut out 10,000 images. Now, each time we had to train the model it would take around 2 and a half hours. After the model was trained and deployed, accessing it via the Roboflow API was a huge challenge as the documentation is not up to date nor are any of their examples using React.

## Accomplishments that we're proud of
We are proud of phrase detection, the automatic timeout for prompt completion, increasing performance for mobile Android devices, training and hosting our own ML computer vision model, using real-time camera footage to alert for obstacles, OpenAI integration for object pathfinding, international web deployment, and giving these features in a highly accessible format. 

## What we learned
We learned to containerize and deploy React applications with Docker, process audio and video streams through a web framework, utilize a Kanban methodology, train and deploy an ML model, and wrap it all into a single application. 

## What's next for gEYEd me
We plan on expanding accessibility to iOS devices. 
