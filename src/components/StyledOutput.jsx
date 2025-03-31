import React, { useState, useRef, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import { Card, CardHeader, CardBody, Image } from "@heroui/react";

const StyledOutput = () => {
  const [inputText, setInputText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState('#333');
  const [padding, setPadding] = useState('10px');
  const [textShadow, setTextShadow] = useState('2px 2px 4px rgba(0, 0, 0, 0.3)');
  const [fontFamily, setFontFamily] = useState('cursive');

  const fontFamilies = [
    'cursive',
    'Arial, sans-serif',
    'fantasy',
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
  
  const [fontWeight, setFontWeight] = useState('normal');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [filterEffect, setFilterEffect] = useState('none');

  const filterEffects = [
    'none',
    'grayscale(100%)',
    'sepia(100%)',
    'invert(100%)',
    'blur(5px)',
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
  
  const [textTransform, setTextTransform] = useState('none');
  const [boxSizing, setBoxSizing] = useState('content-box');

  const boxSizingOptions = [
    'content-box',
    'border-box',
    'padding-box',
    'inherit',
    'initial',
    'unset',
    'border-box padding-box',
    'border-box content-box',
    'content-box padding-box',
    'content-box border-box',
    'padding-box border-box',
    'padding-box content-box',
  ];
  
  const [boxShadow, setBoxShadow] = useState('2px 2px 8px rgba(0, 0, 0, 0.3)');
  const [textOutline, setTextOutline] = useState('none');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundGradient, setBackgroundGradient] = useState('linear-gradient(to right, #ff7e5f, #feb47b)');

  const textRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    handleStyleChange();
  }, [fontSize, fontColor, textShadow, fontFamily, fontWeight, backgroundColor, backgroundGradient, filterEffect, textTransform, boxSizing, boxShadow, textOutline, backgroundImage]);

  const handleStyleChange = () => {
    if (textRef.current && previewRef.current) {
      textRef.current.style.fontSize = `${fontSize}px`;
      textRef.current.style.color = fontColor;
      textRef.current.style.textShadow = textShadow;
      textRef.current.style.fontFamily = fontFamily;
      textRef.current.style.fontWeight = fontWeight;
      textRef.current.style.backgroundColor = backgroundColor;

      textRef.current.style.padding = padding;

      textRef.current.style.boxShadow = boxShadow;

      if (backgroundImage) {
        textRef.current.style.backgroundImage = `url(${backgroundImage})`;
      } else {
        textRef.current.style.backgroundImage = backgroundGradient;
      }

      textRef.current.style.filter = filterEffect;
      textRef.current.style.textTransform = textTransform;
      textRef.current.style.boxSizing = boxSizing;

      // Update the live preview
      const clonedNode = textRef.current.cloneNode(true);
      previewRef.current.innerHTML = '';
      previewRef.current.appendChild(clonedNode);
    }
  };

  const handleConvert = async () => {
    if (textRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(textRef.current);
        download(dataUrl, 'styled-text.png', 'image/png');
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
            width={270}
          />
        </CardBody>
      </Card>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your text"
      />
      <div
        ref={textRef}
        style={{
          fontSize: `${fontSize}px`,
          color: fontColor,
          textShadow,
          fontFamily,
          fontWeight,
          backgroundColor,
          padding: '10px',
          margin: '10px 0',
          display: 'inline-block',
        }}
      >
        {inputText}
      </div>
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
          Font Family:
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
          Text Outline:
          <input
            type="text"
            value={textOutline}
            onChange={(e) => setTextOutline(e.target.value)}
          />
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Text Transform:
          <select
            value={textTransform}
            onChange={(e) => setTextTransform(e.target.value)}
          >
            <option value="none">None</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Box Sizing:
          <select
            value={boxSizing}
            onChange={(e) => setBoxSizing(e.target.value)}
          >
            {boxSizingOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Box Shadow:
          <input
            type="text"
            value={boxShadow}
            onChange={(e) => setBoxShadow(e.target.value)}
          />
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Filter Effect:
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
        <label>
          Padding:
          <input
            type="text"
            value={padding}
            onChange={(e) => setPadding(e.target.value)}
          />
        </label>
      </div>
      <span style={{ display: 'block', marginBottom: '10px' }}></span>
      <div>
        <label>
          Background Gradient:
          <input
            type="text"
            value={backgroundGradient}
            onChange={(e) => setBackgroundGradient(e.target.value)}
          />
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
        <strong>Live Preview:</strong>
        <div ref={previewRef} style={{ marginTop: '10px' }}></div>
      </div>
      <button onClick={handleConvert}>Download</button>
    </div>
  );
};

export default StyledOutput;