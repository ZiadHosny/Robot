document.querySelector('body').style.margin = 0;
document.querySelector('body').style.overflow = 'hidden'

const canvasDOM = document.querySelector('canvas');
const WIDTH = (canvasDOM.width = innerWidth);
const HEIGHT = (canvasDOM.height = innerHeight);

const canvas = canvasDOM.getContext('2d');
let running = false;
let animation;
let drawAnimation;

const gradientBackground = canvas.createLinearGradient(0, 0, 0, HEIGHT);

const background = () => {
    const gradientBackground = canvas.createLinearGradient(0, 0, 0, HEIGHT);
    for (let i = 0; i <= 10; i++) {
        if (i % 2 == 0) {
            gradientBackground.addColorStop(i / 10, 'rgba(0, 0, 0, 0.2)');
        } else {
            gradientBackground.addColorStop(i / 10, 'rgba(0, 0, 255, 0.2)');
        }
    }
    canvas.fillStyle = gradientBackground;
    canvas.fillRect(0, 0, WIDTH, HEIGHT);
}

class Square {
    constructor(x, y, vx, vy, dd, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.dd = dd;
        this.color = color;
    }
    draw() {
        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.strokeStyle = '#F8F988';
        canvas.lineWidth = 10;
        canvas.fillRect(this.x, this.y, this.dd, this.dd);
        canvas.strokeRect(this.x, this.y, this.dd, this.dd);
        canvas.fill();
        canvas.stroke();
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x + this.dd >= WIDTH) {
            this.vx = -this.vx;
        }
        if (this.y <= 0 || this.y + this.dd >= HEIGHT) {
            this.vy = -this.vy;
        }
    }
};
class Rect {
    constructor(x, y, vx, vy, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
    draw() {
        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.strokeStyle = '#F8F988';
        canvas.lineWidth = 10;
        canvas.fillRect(this.x, this.y, this.dx, this.dy);
        canvas.strokeRect(this.x, this.y, this.dx, this.dy);
        canvas.fill();
        canvas.stroke();
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x + this.dx >= WIDTH) {
            this.vx = -this.vx;
        }
        if (this.y <= 0 || this.y + this.dy >= HEIGHT) {
            this.vy = -this.vy;
        }
    }
};
class Ball {
    constructor(x, y, vx, vy, r, lineWidth, color, pi = 2) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.pi = pi
        this.lineWidth = lineWidth
        this.color = color;
    }

    draw() {
        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.strokeStyle = '#F8F988';
        canvas.lineWidth = this.lineWidth;
        canvas.arc(this.x, this.y, this.r, 0, this.pi * Math.PI);
        canvas.fill();
        canvas.stroke();


    }
    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.r <= 0 || this.x + this.r >= WIDTH) {
            this.vx = -this.vx;
        }
        if (this.y - this.r <= 0 || this.y + this.r >= HEIGHT) {
            this.vy = -this.vy;
        }
    }
};
class Star {
    constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }
    draw() {
        canvas.beginPath();
        canvas.strokeStyle = '#F8F988';
        canvas.lineWidth = 10;
        canvas.fillStyle = this.color;
        canvas.moveTo(this.x, this.y);
        canvas.lineTo(this.x - 40, this.y + 75);
        canvas.lineTo(this.x - 85, this.y + 75);
        canvas.lineTo(this.x - 50, this.y + 135);
        canvas.lineTo(this.x - 55, this.y + 185);
        canvas.lineTo(this.x, this.y + 150);
        canvas.lineTo(this.x + 55, this.y + 185);
        canvas.lineTo(this.x + 50, this.y + 135);
        canvas.lineTo(this.x + 85, this.y + 75);
        canvas.lineTo(this.x + 40, this.y + 75);
        canvas.lineTo(this.x, this.y);
        canvas.fill();
        canvas.stroke();
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - 75 <= 0 || this.x + 75 >= WIDTH) {
            this.vx = -this.vx;
        }
        if (this.y <= 0 || this.y + 150 >= HEIGHT) {
            this.vy = -this.vy;
        }
    }
};
class Hand {

    constructor(x, y, vx, vy, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
    draw() {
        canvas.beginPath();
        canvas.fillStyle = this.color;
        canvas.strokeStyle = '#F8F988';
        canvas.lineWidth = 10;
        canvas.fillRect(this.x, this.y, this.dx, this.dy);
        canvas.fillRect(this.x + this.dx, this.y, this.dy, this.dx);
        canvas.strokeRect(this.x, this.y, this.dx, this.dy);
        canvas.strokeRect(this.x + this.dx, this.y, this.dy, this.dx);
        canvas.fill();
        canvas.stroke();
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x + this.dx >= WIDTH) {
            this.vx = -this.vx;
        }
        if (this.y <= 0 || this.y + this.dy >= HEIGHT) {
            this.vy = -this.vy;
        }
    }
};
class Triangle {
    constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
    }
    draw() {
        canvas.beginPath();
        canvas.strokeStyle = '#F8F988';
        canvas.lineWidth = 10;
        canvas.fillStyle = this.color;
        canvas.moveTo(this.x, this.y);
        canvas.lineTo(this.x - 50, this.y + 100);
        canvas.lineTo(this.x + 50, this.y + 100);
        canvas.lineTo(this.x, this.y);
        canvas.fill();
        canvas.stroke();
    }
    move() {
        triangle.x += triangle.vx;
        triangle.y += triangle.vy;

        if (triangle.x - 50 <= 0 || triangle.x + 50 >= WIDTH) {
            triangle.vx = -triangle.vx;
        }
        if (triangle.y <= 0 || triangle.y + 100 >= HEIGHT) {
            triangle.vy = -triangle.vy;
        }
    }
};

const square = new Square(WIDTH / 2, HEIGHT / 2, 1, 2, 200, gradientBackground)
const rect1 = new Rect(WIDTH / 2, HEIGHT / 2, 2, 1, 20, 100, gradientBackground)
const rect2 = new Rect(WIDTH / 2, HEIGHT / 2, 2, 1, 20, 100, gradientBackground)
const ball1 = new Ball(WIDTH / 2, HEIGHT / 2, 1, 1, 100, 10, gradientBackground)
const ball2 = new Ball(WIDTH / 2, HEIGHT / 2, 2, 3, 10, 5, gradientBackground)
const ball3 = new Ball(WIDTH / 2, HEIGHT / 2, 3, 2, 5, 2, gradientBackground)
const ball4 = new Ball(WIDTH / 2, HEIGHT / 2, 4, 1, 40, 5, gradientBackground, 1)
const star = new Star(WIDTH / 2, HEIGHT / 2, 1, 3, gradientBackground)
const hand = new Hand(WIDTH / 2, HEIGHT / 2, 3, 3, 100, 30, gradientBackground)
const hand2 = new Hand(WIDTH / 2, HEIGHT / 2, 1, 2, 100, 30, gradientBackground)
const triangle = new Triangle(WIDTH / 2, HEIGHT / 2, 2, 4, gradientBackground)

const draw = () => {
    background();

    square.draw();
    rect1.draw();
    rect2.draw();
    ball1.draw();
    star.draw();
    ball4.draw();
    ball2.draw();
    ball3.draw();
    hand.draw();
    hand2.draw();
    triangle.draw();

    if (running) {
        square.move();
        rect1.move();
        rect2.move();
        ball1.move();
        ball2.move();
        ball3.move();
        ball4.move();
        star.move();
        hand.move();
        hand2.move();
        triangle.move();
    }
    animation = window.requestAnimationFrame(draw);
}

canvasDOM.addEventListener('mousemove', function (e) {
    if (!running) {
        background();
        square.x = e.clientX - 0.5 * square.dd;
        square.y = e.clientY - 0.5 * square.dd;
        square.draw();
        ball1.x = e.clientX;
        ball1.y = e.clientY - 200;
        ball1.draw();
        triangle.x = e.clientX;
        triangle.y = e.clientY - 100;
        triangle.draw();
        star.x = e.clientX;
        star.y = e.clientY - 300;
        star.draw();
        rect1.x = e.clientX + 50;
        rect1.y = e.clientY + 100;
        rect1.draw();
        rect2.x = e.clientX - 75;
        rect2.y = e.clientY + 100;
        rect2.draw();
        hand.x = e.clientX + 100;
        hand.y = e.clientY - 50;
        hand.draw();
        hand2.x = e.clientX - 200;
        hand2.y = e.clientY - 50;
        hand2.draw();
        ball2.x = e.clientX - 10;
        ball2.y = e.clientY - 215;
        ball2.draw();
        ball3.x = e.clientX + 15;
        ball3.y = e.clientY - 215;
        ball3.draw();
        ball4.x = e.clientX;
        ball4.y = e.clientY - 200;
        ball4.draw();
    }
});
canvasDOM.addEventListener('click', function () {
    if (!running) {
        animation = window.requestAnimationFrame(draw);
        running = true;
    }
});
canvasDOM.addEventListener('mouseout', () => {
    window.cancelAnimationFrame(animation);
    running = false;
});

const init = () => {
    for (let i = 0; i <= 10; i++) {
        if (i % 2 == 0) {
            gradientBackground.addColorStop(i / 10, '#EB455F');
        } else {
            gradientBackground.addColorStop(i / 10, '#540375');
        }
    }
    draw()
}

init()