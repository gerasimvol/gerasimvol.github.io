import BaseCanvas from './BaseCanvas.js';

const canvas = new BaseCanvas('.mouse-effect')
const ctx = canvas.ctx
const cW = canvas.canvas.width
const cH = canvas.canvas.height

const dots = []
class Dot {
  static gravity = 0.1

  constructor(x, y) {
    this.x = x
    this.y = y
    this.vx = Math.random() * 2
    this.vy = Math.random() * 2
    this.radius = Math.random() * 2 + 2
    this.color = `rgba(200, 0, 0, ${Math.random() + 0.5})`
  }

  fall() {
    this.x += this.vx
    this.y += this.vy
    this.vy += Dot.gravity
  }
}

function animate() {
  ctx.clearRect(0, 0, cW, cH)
  dots.forEach(dot => {
    ctx.fillStyle = dot.color
    ctx.fillRect(dot.x, dot.y, dot.radius, dot.radius)

    if (dot.x < cW && dot.y < cH) {
      dot.fall()
    } else {
      dots.splice(dots.indexOf(dot), 1)
    }
  })

  requestAnimationFrame(animate)
}

function throttle(callback, limit) {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  }
}

// init after overlay disappear
setTimeout(() => {
  window.addEventListener('mousemove', throttle(e => {
    if (dots.length < 100) {
      dots.push(new Dot(e.clientX, e.clientY))
    }
  }, 8))

  animate()
}, 500)