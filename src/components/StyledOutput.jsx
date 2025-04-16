import React, { useState, useRef, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { Card, CardHeader, CardBody, Image } from "@heroui/react";

const StyledOutput = () => {
  const [inputText, setInputText] = useState("");
  const [textAlign, setTextAlign] = useState("center");
  const [textPosition, setTextPosition] = useState("center");

  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#333");
  const [fontFamily, setFontFamily] = useState("cursive");
  const [fontWeight, setFontWeight] = useState("normal");
  
  const [outlineColor, setOutlineColor] = useState("#ff0000");
  const [outlineThickness, setOutlineThickness] = useState(5);
  const [shadowBlur, setShadowBlur] = useState(10);
  const [gradientStart, setGradientStart] = useState("#ff0000");
  const [gradientEnd, setGradientEnd] = useState("#0000ff");

  const [textOutline, setTextOutline] = useState("none");
  const [textShadow, setTextShadow] = useState("2px 2px 4px rgba(0, 0, 0, 0.3)");
  
  const [frame, setFrame] = useState("none");
  const [decoration, setDecoration] = useState("");
  const [filterEffect, setFilterEffect] = useState("none");

  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [backgroundImage, setBackgroundImage] = useState('');

  const textRef = useRef(null);
  
  useEffect(() => {
    const canvas = textRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply text styles
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;

    // Apply text alignment
    ctx.textAlign = textAlign;
    ctx.textBaseline = "middle";

    switch (textAlign) {
      case "left":
        ctx.textAlign = "left";
        break;
      
      case "right":
        ctx.textAlign = "right";
        break;

      case "center":
        ctx.textAlign = "center";
        break;
    }

    // Calculate text position
    let x, y;
    switch (textPosition) {
      case "top-left":
        x = 50; // Add some padding
        y = 50;
        break;
      case "top-center":
        x = canvas.width / 2;
        y = 50;
        break;
      case "top-right":
        x = canvas.width - 50;
        y = 50;
        break;
      case "left":
        x = 50;
        y = canvas.height / 2;
        break;
      case "center":
        x = canvas.width / 2;
        y = canvas.height / 2;
        break;
      case "right":
        x = canvas.width - 50;
        y = canvas.height / 2;
        break;
      case "bottom-left":
        x = 50;
        y = canvas.height - 50;
        break;
      case "bottom-center":
        x = canvas.width / 2;
        y = canvas.height - 50;
        break;
      case "bottom-right":
        x = canvas.width - 50;
        y = canvas.height - 50;
        break;
      default:
        x = canvas.width / 2;
        y = canvas.height / 2;
    }

    if (textOutline !== "none") {
      ctx.lineWidth = outlineThickness;
      ctx.strokeStyle = outlineColor;
      ctx.strokeText(inputText, x, y);
    }

    switch (textOutline) {
      case "solid":
        ctx.strokeStyle = outlineColor;
        ctx.strokeText(inputText, x, y);
        break;

      case "dashed":
        ctx.setLineDash([10, 5]);
        ctx.strokeStyle = outlineColor;
        ctx.strokeText(inputText, x, y);
        ctx.setLineDash([]);
        break;

      case "glow":
        ctx.shadowColor = outlineColor;
        ctx.shadowBlur = shadowBlur;
        ctx.strokeStyle = outlineColor;
        ctx.strokeText(inputText, x, y);
        ctx.shadowBlur = 0; // Reset shadow
        break;

      case "shadow":
        ctx.shadowColor = outlineColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.strokeStyle = outlineColor;
        ctx.strokeText(inputText, x, y);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        break;

      case "gradient":
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, gradientStart);
        gradient.addColorStop(1, gradientEnd);
        ctx.strokeStyle = gradient;
        ctx.strokeText(inputText, x, y);
        break;

      case "none":
        break;

      default:
        break;
    }

    // Draw the selected decoration
    switch (frame) {
      // Premium Frames 🎗️
      case "gold-frame":
        const goldGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        goldGradient.addColorStop(0, "#FFF6D3");
        goldGradient.addColorStop(0.5, "#FFD700");
        goldGradient.addColorStop(1, "#B8860B");
        
        const goldOuterPadding = 8;
        const goldMidPadding = goldOuterPadding + 8;
        const goldInnerPadding = goldMidPadding + 6;
        
        // === Outer Border ===
        ctx.strokeStyle = goldGradient;
        ctx.lineWidth = 4;
        ctx.strokeRect(
          goldOuterPadding,
          goldOuterPadding,
          canvas.width - goldOuterPadding * 2,
          canvas.height - goldOuterPadding * 2
        );
        
        // === Mid Border ===
        ctx.lineWidth = 8;
        ctx.strokeRect(
          goldMidPadding,
          goldMidPadding,
          canvas.width - goldMidPadding * 2,
          canvas.height - goldMidPadding * 2
        );
        
        // === Inner Border ===
        ctx.lineWidth = 2;
        ctx.strokeRect(
          goldInnerPadding,
          goldInnerPadding,
          canvas.width - goldInnerPadding * 2,
          canvas.height - goldInnerPadding * 2
        );
        
        // === Decorative Corner Curls (like ornate vintage tips) ===
        const swirl = (x, y, flipX = 1, flipY = 1) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(flipX, flipY);
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = goldGradient;
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(0, 20, 20, 20, 20, 0);
          ctx.bezierCurveTo(20, -10, 10, -10, 8, 0);
          ctx.stroke();
          ctx.restore();
        };

        // Top-left
        swirl(goldInnerPadding, goldInnerPadding, 1, 1);
        // Top-right
        swirl(canvas.width - goldInnerPadding, goldInnerPadding, -1, 1);
        // Bottom-right
        swirl(canvas.width - goldInnerPadding, canvas.height - goldInnerPadding, -1, -1);
        // Bottom-left
        swirl(goldInnerPadding, canvas.height - goldInnerPadding, 1, -1);
        break;

      case "silver-frame":
        const silverGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        silverGradient.addColorStop(0, "#E6E6E6");  // Light silver
        silverGradient.addColorStop(0.5, "#C0C0C0");  // Medium silver
        silverGradient.addColorStop(1, "#8C8C8C");  // Dark silver
        
        const silverOuterPadding = 8;
        const silverMidPadding = silverOuterPadding + 8;
        const silverInnerPadding = silverMidPadding + 6;
        
        // === Outer Border ===
        ctx.strokeStyle = silverGradient;
        ctx.lineWidth = 4;
        ctx.strokeRect(
          silverOuterPadding,
          silverOuterPadding,
          canvas.width - silverOuterPadding * 2,
          canvas.height - silverOuterPadding * 2
        );
        
        // === Mid Border ===
        ctx.lineWidth = 8;
        ctx.strokeRect(
          silverMidPadding,
          silverMidPadding,
          canvas.width - silverMidPadding * 2,
          canvas.height - silverMidPadding * 2
        );
        
        // === Inner Border ===
        ctx.lineWidth = 2;
        ctx.strokeRect(
          silverInnerPadding,
          silverInnerPadding,
          canvas.width - silverInnerPadding * 2,
          canvas.height - silverInnerPadding * 2
        );
        
        // === Decorative Corner Curls (like ornate vintage tips) ===
        const swwirl = (x, y, flipX = 1, flipY = 1) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(flipX, flipY);
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#C0C0C0';
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(0, 20, 20, 20, 20, 0);
          ctx.bezierCurveTo(20, -10, 10, -10, 8, 0);
          ctx.stroke();
          ctx.restore();
        };

        // Top-left
        swwirl(silverInnerPadding, silverInnerPadding, 1, 1);
        // Top-right
        swwirl(canvas.width - silverInnerPadding, silverInnerPadding, -1, 1);
        // Bottom-right
        swwirl(canvas.width - silverInnerPadding, canvas.height - silverInnerPadding, -1, -1);
        // Bottom-left
        swwirl(silverInnerPadding, canvas.height - silverInnerPadding, 1, -1);
        break;

      case "vintage-frame":
        // Define colors
        const vintageBorder = '#DE9B72';
         
        // === Outer Border ===
        const outerPadding = 6;
        ctx.strokeStyle = vintageBorder;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          outerPadding,
          outerPadding,
          canvas.width - outerPadding * 2,
          canvas.height - outerPadding * 2
        );
        
        // === Mid Border ===
        const midPadding = outerPadding + 6;
        ctx.lineWidth = 6;
        ctx.strokeRect(
          midPadding,
          midPadding,
          canvas.width - midPadding * 2,
          canvas.height - midPadding * 2
        );
        
        // === Inner Border ===
        const innerPadding = midPadding + 6;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          innerPadding,
          innerPadding,
          canvas.width - innerPadding * 2,
          canvas.height - innerPadding * 2
        );
        
        // === Corner Decorations ===
        const cornerImg = document.createElement('img');
        cornerImg.src = 'https://i.ibb.co/35V6f2Py/corner-decoration.png';

        cornerImg.onload = () => {
          const imgSize = 48; // ~3em assuming base font size 16px
          
          // These positions move the image inside the inner border
          const offsetX = innerPadding;
          const offsetY = innerPadding;
          const rightX = canvas.width - innerPadding - imgSize;
          const bottomY = canvas.height - innerPadding - imgSize;
          
          // Top-left
          ctx.drawImage(cornerImg, offsetX, offsetY, imgSize, imgSize);
          
          // Top-right (flipped horizontally)
          ctx.save();
          ctx.translate(rightX + imgSize, offsetY);
          ctx.scale(-1, 1);
          ctx.drawImage(cornerImg, 0, 0, imgSize, imgSize);
          ctx.restore();
          
          // Bottom-right (flipped horizontally + vertically)
          ctx.save();
          ctx.translate(rightX + imgSize, bottomY + imgSize);
          ctx.scale(-1, -1);
          ctx.drawImage(cornerImg, 0, 0, imgSize, imgSize);
          ctx.restore();
          
          // Bottom-left (flipped vertically)
          ctx.save();
          ctx.translate(offsetX, bottomY + imgSize);
          ctx.scale(1, -1);
          ctx.drawImage(cornerImg, 0, 0, imgSize, imgSize);
          ctx.restore();
        };
        break;

      case "neon-frame":
        const neonColor = "#FF00CC"; // pink-violet glow
        const lineWidth = 4;

        // Common settings
        const glowBlur = 50;
        const glowPadding = 10;
      
        // Setup glow effect
        ctx.save();
        ctx.shadowColor = neonColor;
        ctx.shadowBlur = glowBlur;
        ctx.strokeStyle = neonColor;
        ctx.lineWidth = lineWidth;

        // === Glow Frame ===
        ctx.strokeRect(
          glowPadding,
          glowPadding,
          canvas.width - glowPadding * 2,
          canvas.height - glowPadding * 2
        );
        ctx.restore(); // reset shadows so it doesn’t affect next strokes

        // === Solid Frame on top ===
        ctx.strokeStyle = neonColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(
          glowPadding,
          glowPadding,
          canvas.width - glowPadding * 2,
          canvas.height - glowPadding * 2
        );
        
        // Optional: turn off shadow after drawing if you're drawing other elements
        ctx.shadowBlur = 0;
        break;

      case "synthwave-frame":
        const neonBlueColors = ["#00FFFF", "#33CCFF", "#3399FF"];
        const basePadding = 10;
        const frameWidth = canvas.width - basePadding * 2;
        const frameHeight = canvas.height - basePadding * 2;
        
        // Neon blue glow layers
        neonBlueColors.forEach((color, index) => {
          ctx.save();
          ctx.shadowColor = color;
          ctx.shadowBlur = (index + 1) * 12;
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.strokeRect(basePadding, basePadding, frameWidth, frameHeight);
          ctx.restore();
        });
        
        // Final crisp stroke
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 2;
        ctx.strokeRect(basePadding, basePadding, frameWidth, frameHeight);

        // === Corner Decorations (ctx magic only, no images) ===
        const drawNeonCorner = (x, y, flipH, flipV) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      
          ctx.shadowColor = "#00FFFF"; // cyan glow
          ctx.shadowBlur = 15;
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#00FFFF";
      
          // Triangle corner
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(30, 0);
          ctx.lineTo(0, 30);
          ctx.closePath();
          ctx.stroke();
      
          // Quarter arc
          ctx.beginPath();
          ctx.arc(10, 10, 8, 0, Math.PI / 2);
          ctx.stroke();
      
          // Slash line
          ctx.beginPath();
          ctx.moveTo(5, 20);
          ctx.lineTo(20, 5);
          ctx.stroke();
      
          ctx.restore();
        };

        // Top-left
        drawNeonCorner(basePadding, basePadding, false, false);
        // Top-right
        drawNeonCorner(canvas.width - basePadding, basePadding, true, false)
        // Bottom-right
        drawNeonCorner(canvas.width - basePadding, canvas.height - basePadding, true, true);
        // Bottom-left
        drawNeonCorner(basePadding, canvas.height - basePadding, false, true);
        break;
      
      case "circuit-frame":
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 3;
        for (let i = 10; i < canvas.width; i += 20) {
          ctx.strokeRect(i, 5, 5, 5);
          ctx.strokeRect(i, canvas.height - 10, 5, 5);
        }
        for (let j = 10; j < canvas.height; j += 20) {
          ctx.strokeRect(5, j, 5, 5);
          ctx.strokeRect(canvas.width - 10, j, 5, 5);
        }
        break;

      case "plasma-frame":
        const padding = 12;
        const shellWidth = canvas.width - padding * 2;
        const shellHeight = canvas.height - padding * 2;
        
        // === Outer Plasma Casing === 
        const plasmaGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        plasmaGradient.addColorStop(0, "#00f0ff");
        plasmaGradient.addColorStop(0.3, "#8e00ff");
        plasmaGradient.addColorStop(0.7, "#ff00e1");
        plasmaGradient.addColorStop(1, "#00f0ff");
        
        ctx.strokeStyle = plasmaGradient;
        ctx.lineWidth = 6;
        ctx.strokeRect(padding, padding, shellWidth, shellHeight);
        
        // === Inner Metallic Layer ===
        const innerPad = padding + 8;
        ctx.strokeStyle = "#222831"; // Dark metallic
        ctx.lineWidth = 3;
        ctx.strokeRect(innerPad, innerPad, canvas.width - innerPad * 2, canvas.height - innerPad * 2);
        
        // === Energy Nodes (Corners) ===
        const drawNode = (x, y, color) => {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = "#ffffff22";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        };

        const nodeColors = ["#00f0ff", "#8e00ff", "#ff00e1", "#00f0ff"];
        drawNode(padding, padding, nodeColors[0]); // TL
        drawNode(canvas.width - padding, padding, nodeColors[1]); // TR
        drawNode(canvas.width - padding, canvas.height - padding, nodeColors[2]); // BR
        drawNode(padding, canvas.height - padding, nodeColors[3]); // BL
        
        // === Inner Core Tint (light plasma glow stroke) ===
        ctx.strokeStyle = plasmaGradient;
        ctx.lineWidth = 2;
        ctx.strokeRect(innerPad + 2, innerPad + 2, canvas.width - (innerPad + 2) * 2, canvas.height - (innerPad + 2) * 2);
        break;

      case "svg-frame":
        const haloPadding = 10;
        const haloW = canvas.width - haloPadding * 2;
        const haloH = canvas.height - haloPadding * 2;
        
        // === Glassy Gradient Edge ===
        const svgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        svgGradient.addColorStop(0, "#aeefff");
        svgGradient.addColorStop(0.5, "#d2cfff");
        svgGradient.addColorStop(1, "#bff9ff");
        
        ctx.strokeStyle = svgGradient;
        ctx.lineWidth = 15;
        ctx.strokeRect(haloPadding, haloPadding, haloW, haloH);
        break;

        case "electric-frame":
          const glowPad = 15;
          const frameW = canvas.width - glowPad * 2;
          const frameH = canvas.height - glowPad * 2;
          
          // === Dynamic Energy Core Gradient ===
          const energyCore = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          energyCore.addColorStop(0, "#00F0FF");  // Cyan
          energyCore.addColorStop(0.3, "#FF00FF"); // Magenta
          energyCore.addColorStop(0.7, "#FF5500"); // Orange
          energyCore.addColorStop(1, "#00F0FF");   // Cyan loop
    
          // === **NEON LASER FRAME (3D Effect)** ===
          ctx.save();
          
          // Outer glow (intense)
          ctx.shadowColor = "#00F0FF";
          ctx.shadowBlur = 30;
          ctx.strokeStyle = "rgba(0, 240, 255, 0.7)";
          ctx.lineWidth = 6;
          ctx.strokeRect(glowPad, glowPad, frameW, frameH);
    
          // Inner glow (complementary)
          ctx.shadowColor = "#FF00FF";
          ctx.shadowBlur = 20;
          ctx.strokeStyle = "rgba(255, 0, 255, 0.5)";
          ctx.lineWidth = 4;
          ctx.strokeRect(glowPad + 8, glowPad + 8, frameW - 16, frameH - 16);
          ctx.restore();

          // === **CRACKLING ENERGY CORNERS** ===
          const drawEnergyBurst = (x, y, color) => {
            ctx.save();
            ctx.translate(x, y);
            
            // Burst lines
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const length = 15 + Math.random() * 10;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
                ctx.strokeStyle = color;
                ctx.lineWidth = 1.5;
                ctx.shadowColor = color;
                ctx.shadowBlur = 8;
                ctx.stroke();
            }
            
            // Core
            ctx.beginPath();
            ctx.arc(0, 0, 5, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.shadowColor = color;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.restore();
          };
          
          drawEnergyBurst(glowPad, glowPad, "#00F0FF"); // Top-left
          drawEnergyBurst(canvas.width - glowPad, glowPad, "#FF00FF"); // Top-right
          drawEnergyBurst(canvas.width - glowPad, canvas.height - glowPad, "#FF00FF"); // Bottom-right
          drawEnergyBurst(glowPad, canvas.height - glowPad, "#00F0FF"); // Bottom-left
    
          // === **CYBERPUNK SCANLINES** ===
          ctx.save();
          ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
          ctx.lineWidth = 1;
          
          // Horizontal lines
          for (let y = glowPad; y < canvas.height - glowPad; y += 8) {
            ctx.beginPath();
            ctx.moveTo(glowPad, y);
            ctx.lineTo(canvas.width - glowPad, y);
            ctx.stroke();
          }
          ctx.restore();

          ctx.shadowBlur = 0;
          break;

      // Borders 🎗️
      case "dashed-border":
        ctx.setLineDash([10, 5]);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
        ctx.setLineDash([]); // Reset
        break;
    
      case "dotted-border":
        ctx.setLineDash([2, 4]);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
        ctx.setLineDash([]); // Reset
        break;
    
      case "wavy-border":
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;
        for (let i = 0; i < canvas.width; i += 10) {
          ctx.beginPath();
          ctx.moveTo(i, 5);
          ctx.quadraticCurveTo(i + 5, 10, i + 10, 5);
          ctx.stroke();
        }
        break;
    
      case "pixel-border":
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, 5);
        ctx.fillRect(0, 0, 5, canvas.height);
        ctx.fillRect(canvas.width - 5, 0, 5, canvas.height);
        ctx.fillRect(0, canvas.height - 5, canvas.width, 5);
        break;

      // 🎨 Abstract Patterns
      case "checkerboard":
        for (let y = 0; y < canvas.height; y += 20) {
          for (let x = 0; x < canvas.width; x += 20) {
            ctx.fillStyle = (x / 20 + y / 20) % 2 === 0 ? "black" : "white";
            ctx.fillRect(x, y, 20, 20);
          }
        }
        break;

      case "crosshatch":
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 10) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }
        break;

      // 🏆 Game & Sci-Fi
      case "pixel-grid":
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 10) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        for (let j = 0; j < canvas.height; j += 10) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(canvas.width, j);
          ctx.stroke();
        }
        break;

      case "cyber-pulse":
        let cyberGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        cyberGradient.addColorStop(0, "cyan");
        cyberGradient.addColorStop(0.5, "blue");
        cyberGradient.addColorStop(1, "purple");
        ctx.fillStyle = cyberGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;

      case "glitch-lines":
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
          ctx.beginPath();
          let y = Math.random() * canvas.height;
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        break;

      case "energy-waves":
        ctx.strokeStyle = "lightblue";
        ctx.lineWidth = 3;
        for (let i = 0; i < canvas.width; i += 20) {
          ctx.beginPath();
          ctx.moveTo(i, canvas.height / 2);
          ctx.quadraticCurveTo(i + 10, canvas.height / 2 - 10, i + 20, canvas.height / 2);
          ctx.stroke();
        }
        break;

      case "circuit-board":
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        for (let i = 10; i < canvas.width; i += 30) {
          ctx.strokeRect(i, 10, 10, 10);
        }
        for (let j = 10; j < canvas.height; j += 30) {
          ctx.strokeRect(10, j, 10, 10);
        }
        break;

      case "rainbow-stripes":
        let stripeColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
        for (let i = 0; i < stripeColors.length; i++) {
          ctx.fillStyle = stripeColors[i];
          ctx.fillRect(0, (canvas.height / stripeColors.length) * i, canvas.width, canvas.height / stripeColors.length);
        }
        break;

        case "graffiti-spray":
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "white";
          for (let i = 0; i < 100; i++) {
            let x = Math.floor(Math.random() * canvas.width);
            let y = Math.floor(Math.random() * canvas.height);
            ctx.fillRect(x, y, 1, 1);
          }
          break;
        
        case "film-overlay":
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < canvas.width; i += 5) {
            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
            ctx.fillRect(i, 0, 1, canvas.height);
          }
          break;
  
        case "comic-book-dots":
          for (let y = 0; y < canvas.height; y += 10) {
            for (let x = 0; x < canvas.width; x += 10) {
              ctx.fillStyle = "black";
              ctx.beginPath();
              ctx.arc(x, y, 3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          break;
  
        case "blueprint":
          ctx.fillStyle = "#003366";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "white";
          for (let x = 0; x < canvas.width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }
          for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }
          break;
      default:
        break;
    }

    switch (decoration) {
      // Sparkles and Glow ✨
      case "tiny-sparkles":
        for (let i = 0; i < 10; i++) {
          ctx.fillStyle = "yellow";
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case "fireflies":
        ctx.fillStyle = "lime";
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case "twinkling-stars":
        ctx.fillStyle = "white";
        for (let i = 0; i < 15; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case "outer-glow":
        ctx.shadowBlur = 20;
        ctx.shadowColor = "cyan";
        ctx.fillStyle = "cyan";
        ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
        ctx.shadowBlur = 0; // Reset
        break;
    
      case "pulsating-lights":
        ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
        for (let i = 0; i < 10; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 5 + Math.random() * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
    
      case "rainbow-glow":
        let rainbowGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        rainbowGradient.addColorStop(0, "red");
        rainbowGradient.addColorStop(0.2, "orange");
        rainbowGradient.addColorStop(0.4, "yellow");
        rainbowGradient.addColorStop(0.6, "green");
        rainbowGradient.addColorStop(0.8, "blue");
        rainbowGradient.addColorStop(1, "purple");
        ctx.fillStyle = rainbowGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;
    
      case "electric-sparks":
        ctx.strokeStyle = "yellow";
        for (let i = 0; i < 10; i++) {
          let x = Math.random() * canvas.width;
          let y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.random() * 10 - 5, y + Math.random() * 10 - 5);
          ctx.stroke();
        }
        break;
    
      case "fire-bottom":
        ctx.fillStyle = "red";
        ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
        ctx.fillStyle = "orange";
        ctx.fillRect(0, canvas.height - 15, canvas.width, 5);
        break;
    
      case "fairy-dust":
        ctx.fillStyle = "pink";
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
    
      case "scattered-diamonds":
        ctx.fillStyle = "lightblue";
        for (let i = 0; i < 10; i++) {
          ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 4);
        }
        break;
            // Special Effects 🎭
            case "ghostly-aura":
              let ghostlyGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 10, canvas.width / 2, canvas.height / 2, 50);
              ghostlyGradient.addColorStop(0, "white");
              ghostlyGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
              ghostlyGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
              ctx.fillStyle = ghostlyGradient;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              break;
      
            case "shadow-clone":
              ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
              ctx.shadowBlur = 10;
              ctx.shadowOffsetX = 5;
              ctx.shadowOffsetY = 5;
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.shadowBlur = 0; // Reset shadow
              break;
      
            case "motion-blur":
              ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
              ctx.shadowBlur = 10;
              ctx.shadowOffsetX = 5;
              ctx.shadowOffsetY = 5;
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.shadowBlur = 0; // Reset shadow
              break;
      
            case "speech-bubble":
              ctx.fillStyle = "white";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.fillStyle = "black";
              ctx.beginPath();
              ctx.moveTo(10, canvas.height - 10);
              ctx.lineTo(canvas.width - 10, canvas.height - 10);
              ctx.lineTo(canvas.width - 10, canvas.height);
              ctx.lineTo(10, canvas.height);
              ctx.closePath();
              ctx.fill();
              break;
      
            case "fog-overlay":
              let fogGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
              fogGradient.addColorStop(0, "rgba(255,255,255,0.3)");
              fogGradient.addColorStop(1, "rgba(255,255,255,0.1)");
              ctx.fillStyle = fogGradient;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              break;
      
            case "glass-reflection":
              let reflectionGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
              reflectionGradient.addColorStop(0, "rgba(255,255,255,0.4)");
              reflectionGradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
              reflectionGradient.addColorStop(1, "rgba(255,255,255,0)");
              ctx.fillStyle = reflectionGradient;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              break;
      
            case "lens-flare":
              let flareGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 10, canvas.width / 2, canvas.height / 2, 100);
              flareGradient.addColorStop(0, "rgba(255,255,255,1)");
              flareGradient.addColorStop(0.5, "rgba(255,255,0,0.5)");
              flareGradient.addColorStop(1, "rgba(255,0,0,0)");
              ctx.fillStyle = flareGradient;
              ctx.beginPath();
              ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
              ctx.fill();
              break;
      }

    ctx.fillText(inputText, x, y);

  }, [inputText, frame, decoration, fontSize, fontFamily, fontWeight, fontColor, outlineColor, outlineThickness, textAlign, textPosition, textOutline, shadowBlur, gradientStart, gradientEnd]);

  const fontFamilies = [
    'cursive',
    'Arial, sans-serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Verdana, sans-serif',
    'Courier New, monospace',
    'Impact, sans-serif',
    'Trebuchet MS, sans-serif',
    'Palatino Linotype, Book Antiqua, Palatino, serif',
    'Lucida Console, Monaco, monospace',
    'Helvetica, sans-serif',
    'Comic Sans MS, cursive',
    'Garamond, serif',
    'Courier, monospace',
    'Arial Black, sans-serif',
    'Bookman Old Style, Bookman, serif',
    'Cambria, serif',
    'Constantia, serif',
    'Gill Sans, Gill Sans MT, Calibri, sans-serif',
    'Geneva, Tahoma, Verdana, sans-serif',
    'Century Gothic, sans-serif',
    'MS Sans Serif, Geneva, sans-serif',
    'MS Serif, New York, sans-serif',
    'Lucida Grande, sans-serif',
    'Optima, sans-serif',
    'Lucida Sans, sans-serif',
    'Arial Narrow, sans-serif',
    'Franklin Gothic Medium, sans-serif',
    'Arial Rounded MT Bold, sans-serif',
    'Rockwell, serif',
    'Tahoma, Geneva, sans-serif',
    'Elephant, sans-serif',
    'DejaVu Sans, sans-serif',
    'DejaVu Serif, serif',
    'DejaVu Sans Mono, monospace',
    'Lobster, cursive',
    'Pacifico, cursive',
    'Dancing Script, cursive',
    'Raleway, sans-serif',
    'Montserrat, sans-serif',
    'Oswald, sans-serif',
    'Roboto, sans-serif',
    'Nunito, sans-serif',
    'Poppins, sans-serif',
    'Open Sans, sans-serif',
    'Roboto Condensed, sans-serif',
    'Playfair Display, serif',
    'Merriweather, serif',
    'Alegreya, serif',
  ];

  const filterEffects = [
    'none',
    'grayscale(100%)',
    'sepia(100%)',
    'invert(100%)',
    'brightness(150%)',
    'contrast(200%)',
    'hue-rotate(90deg)',
    'saturate(200%)',
    'opacity(80%)',
    'drop-shadow(4px 4px 4px #555)',
    'brightness(50%) contrast(200%)',
    'sepia(50%) saturate(150%)',
    'hue-rotate(180deg) brightness(130%)',
    'grayscale(50%) contrast(150%)',
    'blur(10px)',
    'brightness(200%) contrast(150%)',
    'hue-rotate(45deg)',
    'saturate(50%)',
    'opacity(50%)',
    'drop-shadow(8px 8px 8px #888)',
    'brightness(70%) contrast(120%)',
    'sepia(30%) saturate(120%)',
    'hue-rotate(270deg) brightness(120%)',
    'grayscale(80%) contrast(120%)',
    'blur(3px)',
    'brightness(130%) contrast(180%)',
    'hue-rotate(135deg)',
    'saturate(80%)',
    'drop-shadow(6px 6px 6px #666)',
    'brightness(120%) contrast(150%) hue-rotate(60deg) saturate(120%)',
    'drop-shadow(10px 10px 10px #777) invert(100%)',
    'blur(8px) brightness(180%) contrast(200%) sepia(20%)',
    'hue-rotate(200deg) saturate(150%) opacity(70%)',
    'blur(15px) brightness(80%) contrast(120%) sepia(50%)',
    'brightness(160%) contrast(180%) hue-rotate(270deg) saturate(80%)',
    'drop-shadow(12px 12px 12px #999) invert(80%) blur(6px)',
    'grayscale(25%) contrast(130%)',
    'sepia(80%) brightness(110%)',
    'invert(80%) saturate(120%)',
    'blur(7px) brightness(170%)',
    'contrast(180%) hue-rotate(120deg)',
    'saturate(170%) opacity(90%)',
    'drop-shadow(5px 5px 5px #444)',
    'brightness(60%) contrast(160%)',
    'sepia(40%) saturate(130%)',
    'hue-rotate(240deg) brightness(140%)',
    'grayscale(60%) contrast(140%)',
    'blur(12px) brightness(220%)',
    'brightness(40%) contrast(180%) hue-rotate(90deg) saturate(90%)',
    'drop-shadow(7px 7px 7px #777) opacity(60%)',
    'brightness(80%) contrast(130%) saturate(70%)',
    'hue-rotate(315deg)',
    'saturate(30%) opacity(40%)',
    'drop-shadow(9px 9px 9px #aaa) invert(50%)',
    'brightness(90%) contrast(110%) hue-rotate(30deg)',
    'sepia(20%) saturate(100%) opacity(50%)',
    'blur(18px) brightness(100%) contrast(160%) sepia(60%)',
    'brightness(140%) contrast(160%) hue-rotate(180deg) saturate(100%)',
    'drop-shadow(15px 15px 15px #bbb) invert(70%) blur(9px)',
    'hue-rotate(90deg) saturate(60%) opacity(30%)',
    'grayscale(10%) contrast(120%)',
    'sepia(70%) brightness(105%)',
    'invert(60%) saturate(110%)',
    'blur(6px) brightness(160%)',
    'contrast(170%) hue-rotate(150deg)',
    'saturate(160%) opacity(85%)',
    'drop-shadow(3px 3px 3px #333)',
    'brightness(70%) contrast(150%)',
    'sepia(50%) saturate(125%)',
    'hue-rotate(210deg) brightness(130%)',
    'grayscale(70%) contrast(130%)',
    'blur(15px) brightness(200%)',
    'brightness(50%) contrast(170%) hue-rotate(75deg) saturate(110%)',
    'drop-shadow(6px 6px 6px #666) opacity(50%)',
    'brightness(90%) contrast(120%) saturate(65%)',
    'hue-rotate(270deg) opacity(20%)',
    'saturate(25%) opacity(35%)',
    'drop-shadow(10px 10px 10px #999) invert(40%)',
    'brightness(80%) contrast(100%) hue-rotate(45deg)',
    'sepia(30%) saturate(90%) opacity(40%)',
    'blur(12px) brightness(85%) contrast(140%) sepia(40%)',
    'brightness(120%) contrast(140%) hue-rotate(240deg) saturate(90%)',
    'drop-shadow(13px 13px 13px #aaa) invert(60%) blur(8px)',
    'hue-rotate(120deg) saturate(50%) opacity(25%)'
  ];

  const handleConvert = async () => {
    if (textRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(textRef.current);
        download(dataUrl, 'sticker.png', 'image/png');
      } catch (error) {
        console.error('Error converting to image:', error);
      }
    }
  };

  return (
    <div>
      <Card className="stylish-card">
        <CardHeader className="stylish-card-header">
          <h4 className="stylish-h4">Sticker generator</h4>
        </CardHeader>
        <CardBody className="stylish-card-body">
          <Image
            alt="Card background"
            className="stylish-card-image"
            src="cover-card.png"
            width={300}
            loading="lazy"
          />
        </CardBody>
      </Card>
      <textarea
        className="stylish-textarea"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text"
      />
      <span style={{ margin: '0 15px' }}></span>
      <div>
        <label>
          Font Size:
          <input
            type="range"
            min="10"
            max="50"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Font Color:
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Font Weight:
          <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
            <option value="revert">Revert</option>
            <option value="unset">Unset</option>
            <option value="inherit">Inherit</option>
            {/* Add more font weight options as needed */}
          </select>
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Font Style:
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            {fontFamilies.map((family, index) => (
              <option key={index} value={family}>
                {family}
              </option>
            ))}
          </select>
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Text Align:
          <select value={textAlign} onChange={(e) => setTextAlign(e.target.value)}>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
          </select>
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Text Position:
          <select value={textPosition} onChange={(e) => setTextPosition(e.target.value)}>
            <option value="top-left">Top Left</option>
            <option value="top-center">Top Center</option>
            <option value="top-right">Top Right</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Text Shadow:
          <input
            type="text"
            value={textShadow}
            onChange={(e) => setTextShadow(e.target.value)}
          />
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Text Outline:
          <select value={textOutline} onChange={(e) => setTextOutline(e.target.value)}>
            <option value="none">None</option>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="glow">Glowing</option>
            <option value="shadow">Shadow</option>
            <option value="gradient">Gradient</option>
          </select>
          <input type="color" value={outlineColor} onChange={(e) => setOutlineColor(e.target.value)} />
          <input type="range" min="1" max="20" value={outlineThickness} onChange={(e) => setOutlineThickness(e.target.value)} />
          {textOutline === "glow" || textOutline === "shadow" ? (
            <input type="range" min="1" max="50" value={shadowBlur} onChange={(e) => setShadowBlur(e.target.value)} />
          ) : null}
          {textOutline === "gradient" ? (
            <>
              <input type="color" value={gradientStart} onChange={(e) => setGradientStart(e.target.value)} />
              <input type="color" value={gradientEnd} onChange={(e) => setGradientEnd(e.target.value)} />
            </>
          ) : null}
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Background Color:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Background Image URL:
          <input
            type="text"
            value={backgroundImage}
            onChange={(e) => setBackgroundImage(e.target.value)}
          />
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>Select Frame:</label>
        <select value={frame} onChange={(e) => setFrame(e.target.value)}>
          <option value="">None</option>
          <optgroup label="Premium Frames">
            <option value="gold-frame">Gold Frame</option>
            <option value="silver-frame">Silver Frame</option>
            <option value="vintage-frame">Vintage Frame</option>
            <option value="electric-frame">Electric Frame</option>
            <option value="svg-frame">SVG Frame</option>
            <option value="neon-frame">Neon Frame</option>
            <option value="plasma-frame">Plasma Frame</option>
            <option value="quantum-frame">Quantum Frame</option>
            <option value="synthwave-frame">Synthwave Frame</option>
            <option value="circuit-frame">Circuit Frame</option>
          </optgroup>
        </select>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Filters:
          <select
            value={filterEffect}
            onChange={(e) => setFilterEffect(e.target.value)}
          >
            {filterEffects.map((effect, index) => (
              <option key={index} value={effect}>
                {effect}
              </option>
            ))}
          </select>
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <strong className="preview-label">Live Preview:</strong>
        {/* Styled Output */}
        <canvas
          ref={textRef}
          width={500}
          height={300}
          style={{
            fontSize: `${fontSize}px`,
            color: fontColor,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            textAlign: textAlign,
            textShadow: textShadow,
            textOutline: textOutline,
            filter: filterEffect,
            backgroundColor: backgroundColor,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            marginTop: "5px",
            padding: "10px",
            display: "inline-block"
          }}
        >
          {inputText || "Your Text Here"}
        </canvas>
      </div>
      <button onClick={handleConvert} className="stylish-download">Download</button>
    </div>
  );
};

export default StyledOutput;