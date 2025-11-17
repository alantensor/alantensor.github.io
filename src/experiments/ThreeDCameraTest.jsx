import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const POINT3D = function (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

class Cube {
  constructor(width, x, y, z) {
    this.w = width;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
  ];

  get vertices() {
    return [
      new POINT3D(this.x - this.w, this.y - this.w, this.z - this.w),
      new POINT3D(this.x + this.w, this.y - this.w, this.z - this.w),
      new POINT3D(this.x + this.w, this.y + this.w, this.z - this.w),
      new POINT3D(this.x - this.w, this.y + this.w, this.z - this.w),
      new POINT3D(this.x - this.w, this.y - this.w, this.z + this.w),
      new POINT3D(this.x + this.w, this.y - this.w, this.z + this.w),
      new POINT3D(this.x + this.w, this.y + this.w, this.z + this.w),
      new POINT3D(this.x - this.w, this.y + this.w, this.z + this.w)
    ];
  }
}

const CANVAS_HEIGHT = 450;
const CANVAS_WIDTH = 750;

export default function ThreeDCameraTest() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    ctx.fillStyle = "grey";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    const shapes = [];
    for (let i = 0; i < 4; i++) {
      const cube1 = new Cube(25, CANVAS_WIDTH / 3, 0, CANVAS_HEIGHT + i * 100);
      const cube2 = new Cube(25, (2 * CANVAS_WIDTH) / 3, 0, CANVAS_HEIGHT + i * 100);
      shapes.push(cube1.vertices);
      shapes.push(cube2.vertices);
    }

    const player = new POINT3D(375, 0, 225);
    const movement = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false
    };
    let yaw = 0;

    const updatePlayer = () => {
      const speed = 3;
      const turnSpeed = 0.03;

      if (movement.forward) {
        player.x += Math.sin(yaw) * speed;
        player.z += Math.cos(yaw) * speed;
      }
      if (movement.backward) {
        player.x -= Math.sin(yaw) * speed;
        player.z -= Math.cos(yaw) * speed;
      }
      if (movement.left) {
        yaw -= turnSpeed;
      } else if (movement.right) {
        yaw += turnSpeed;
      }
      if (movement.up) {
        player.y -= speed;
      } else if (movement.down) {
        player.y += speed;
      }
    };

    const drawLine = (x1, y1, z1, x2, y2, z2) => {
      const centerX = CANVAS_WIDTH / 2;
      const centerY = CANVAS_HEIGHT / 2;

      const x1Diff = x1 - player.x;
      const y1Diff = y1 - player.y;
      const z1Diff = z1 - player.z;
      const x2Diff = x2 - player.x;
      const y2Diff = y2 - player.y;
      const z2Diff = z2 - player.z;

      const translatedX1 = x1Diff * Math.cos(-yaw) + z1Diff * Math.sin(-yaw);
      const translatedZ1 = z1Diff * Math.cos(-yaw) - x1Diff * Math.sin(-yaw);
      const translatedX2 = x2Diff * Math.cos(-yaw) + z2Diff * Math.sin(-yaw);
      const translatedZ2 = z2Diff * Math.cos(-yaw) - x2Diff * Math.sin(-yaw);

      if (translatedZ1 <= 0 || translatedZ2 <= 0) {
        return;
      }

      const screenDistance = 400;
      const newX1 = (translatedX1 / translatedZ1) * screenDistance + centerX;
      const newY1 = (y1Diff / translatedZ1) * screenDistance + centerY;
      const newX2 = (translatedX2 / translatedZ2) * screenDistance + centerX;
      const newY2 = (y2Diff / translatedZ2) * screenDistance + centerY;

      ctx.beginPath();
      ctx.moveTo(newX1, newY1);
      ctx.lineTo(newX2, newY2);
      ctx.stroke();
    };

    let animationFrame = null;

    const renderScene = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      updatePlayer();
      for (const vertices of shapes) {
        for (const edge of Cube.edges) {
          const point1 = vertices[edge[0]];
          const point2 = vertices[edge[1]];
          drawLine(point1.x, point1.y, point1.z, point2.x, point2.y, point2.z);
        }
      }
      animationFrame = requestAnimationFrame(renderScene);
    };

    const shouldHandle = (event) => {
      const target = event.target;
      return (
        target === document.body ||
        target === canvas ||
        (target instanceof HTMLElement &&
          !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      );
    };

    const handleKeyDown = (event) => {
      if (!shouldHandle(event)) return;

      switch (event.code) {
        case "ShiftLeft":
        case "ShiftRight":
          event.preventDefault();
          movement.down = true;
          break;
        case "Space":
          event.preventDefault();
          movement.up = true;
          break;
        case "ArrowLeft":
          event.preventDefault();
          movement.left = true;
          break;
        case "ArrowRight":
          event.preventDefault();
          movement.right = true;
          break;
        case "ArrowUp":
          event.preventDefault();
          movement.forward = true;
          break;
        case "ArrowDown":
          event.preventDefault();
          movement.backward = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      if (!shouldHandle(event)) return;

      switch (event.code) {
        case "ShiftLeft":
        case "ShiftRight":
          event.preventDefault();
          movement.down = false;
          break;
        case "Space":
          event.preventDefault();
          movement.up = false;
          break;
        case "ArrowLeft":
          event.preventDefault();
          movement.left = false;
          break;
        case "ArrowRight":
          event.preventDefault();
          movement.right = false;
          break;
        case "ArrowUp":
          event.preventDefault();
          movement.forward = false;
          break;
        case "ArrowDown":
          event.preventDefault();
          movement.backward = false;
          break;
        default:
          break;
      }
    };

    animationFrame = requestAnimationFrame(renderScene);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
              Experiment
            </p>
            <h1 className="text-2xl font-semibold">3D Camera Test</h1>
          </div>
          <Link
            to="/experiments"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-4"
          >
            ← Experiments
          </Link>
        </div>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Arrow keys move forward/backward, space/shift fly, and the left/right arrows pivot the
          camera yaw. The scene renders cubes with a minimal custom projection pipeline on the HTML
          canvas.
        </p>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[750px] border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-300 dark:bg-neutral-900"
          />
        </div>
      </div>
    </div>
  );
}


