/* Not currently used, updated and moved to 2018 package */

import React from "react";
import { css } from "emotion";
import window from "global/window";
import { get, has } from "lodash";

const canvasStyles = css`
  position: fixed;
`;

class CanvasParticles extends React.Component {
  componentDidMount() {
    window.requestAnimFrame = (function() {
      return (
        get(window, "requestAnimationFrame") ||
        get(window, "webkitRequestAnimationFrame") ||
        get(window, "mozRequestAnimationFrame") ||
        get(window, "oRequestAnimationFrame") ||
        get(window, "msRequestAnimationFrame") ||
        function(callback) {
          has(window, "setTimeout") && window.setTimeout(callback, 1000 / 60);
        }
      );
    })();
    const { canvas } = this.refs;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;
    const W = get(window, "innerWidth", 1000);
    const H = get(window, "innerHeight", 1000);
    canvas.width = W * 1.2;
    canvas.height = H * 1.2;
    const particleCount = 40;
    const particles = [];
    const minDist = 100;
    // const dist;

    function paintCanvas() {
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(0, 0, W, H);
    }

    function Particle() {
      // Position them randomly on the canvas
      // Math.random() generates a random value between 0
      // and 1 so we will need to multiply that with the
      // canvas width and height.
      this.x = Math.random() * W;
      this.y = Math.random() * H;

      // We would also need some velocity for the particles
      // so that they can move freely across the space
      this.vx = -1 + Math.random() * 2;
      this.vy = -1 + Math.random() * 2;

      // Now the radius of the particles. I want all of
      // them to be equal in size so no Math.random() here..
      this.radius = 4;

      this.draw = function() {
        ctx.fillStyle = "lightgrey";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        ctx.fill();
      };
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function draw() {
      // Call the paintCanvas function here so that our canvas
      // will get re-painted in each next frame
      paintCanvas();

      // Call the function that will draw the balls using a loop
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.draw();
      }

      // Finally call the update function
      update();
    }

    function update() {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Change the velocities
        p.x += p.vx;
        p.y += p.vy;

        if (p.x + p.radius > W) p.x = p.radius;
        else if (p.x - p.radius < 0) {
          p.x = W - p.radius;
        }

        if (p.y + p.radius > H) p.y = p.radius;
        else if (p.y - p.radius < 0) {
          p.y = H - p.radius;
        }
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          distance(p, p2);
        }
      }
    }

    function distance(p1, p2) {
      // const dist;
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      // Draw the line when distance is smaller
      // then the minimum distance
      if (dist <= minDist) {
        // Draw the line
        ctx.beginPath();
        ctx.strokeStyle = `rgba(239,74,93,${1.0 - dist / minDist})`;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();

        // Some acceleration for the partcles
        // depending upon their distance
        const ax = dx / 200000;
        const ay = dy / 200000;

        // Apply the acceleration on the particles
        p1.vx -= ax;
        p1.vy -= ay;

        p2.vx += ax;
        p2.vy += ay;
      }
    }

    function animloop() {
      draw();
      requestAnimFrame(animloop);
    }

    animloop();
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" className={canvasStyles} />
      </div>
    );
  }
}

export default CanvasParticles;
