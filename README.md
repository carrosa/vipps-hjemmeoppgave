# To start/build project:

## With Make

(You might have to run npm install in the frontend directory before continuing)

1. Make sure you have golang (using v.1.15) and npm installed
2. in root directory, run: make start
3. Hopefully make works on windows too if you are running that.
4. With this way frontend will be served on port 5000

*Obligatory works on my computer*

## If the above doesnt work:

1. In frontend directory run: npm install
2. In frontend directory run: npm start
3. In backend directory run either:
    1. go run
    2. go build && ./backend
4. With this way frontend will be served on port 3000


