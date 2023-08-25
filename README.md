# run-your-gpt - Instructions for setting up and running the application
<hr>
<h2>Clone the repo</h2>

step 1: use below cammand to clone the repo

<pre>
git clone https://github.com/shashanknaik0/run-your-gpt-frontend.git
</pre>


step 2: get into the directory
<pre>
cd run-your-gpt-frontend
</pre>

<hr>
<h2>Install dependecies</h2>

step 1: use below cammand install dependecies from <code>package.json</code>
<pre>
npm install
</pre>

<hr>
<h2>Setup the backend</h2>

use <a href="https://github.com/shashanknaik0/run-your-gpt-backend.git">this</a> link to setup backend, instructions are given in that repo.

<hr>
<h2>Run the project</h2>

use below cammand to run app in localhost.
<pre>
npm start
</pre>

<hr>
<h2>Result</h2>

<h4>Login page</h4>
<img src="screenshots/login.png" alt="Loading....">

<h4>Signup page</h4>
<img src="screenshots/signup.png" alt="Loading....">

<h4>Ai chat page</h4>
<img src="screenshots/main.png" alt="Loading....">
<p>Run <a href="https://colab.research.google.com/drive/1BkL7zYVYtn0JPYKMPJ0tJmK-zMtINx0P?usp=sharing#scrollTo=T6oyrr4X0wc2">this</a> Ai model to get web socket URL ("wss://smaple.trycloudflare.com/api/v1/stream" if this is the public url only use "smaple.trycloudflare.com" part in input field)</p>
<img src="screenshots/main2.png" alt="Loading....">
<p>when msg limit is reached it will give alert</p>
<img src="screenshots/main3.png" alt="Loading....">