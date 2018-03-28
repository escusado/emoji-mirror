# Emoji Mirror
A `pixi.js` based grid to render low-res webcam images using emojis instead of
pixel tiles.

![Emoji Mirror](https://media.giphy.com/media/5tdd338KRo0q0183NX/giphy.gif)

## [DEMO](https://emoji-mirror.herokuapp.com/)

The project was born in the [HackerGarage](https://www.facebook.com/hackergarage/)'s 7th birthday Hacker of the Year Hackathon,
in which the objective was to build something useless.

This project uses:
- https://github.com/javierbyte/points/
- https://www.npmjs.com/package/nearest-color/
- https://gka.github.io/chroma.js/
- https://reactjs.org/
- https://webpack.js.org/
- https://www.pixijs.com/
- https://sass-lang.com/
- https://nodejs.org/

Interested in the inner workings? go ahead...

## How to Run
- clone or download this repo
- `npm install` (auto webpack build happens)
- unzip `emojis/emojis.zip` (if auto unzip fails)
- `node server.js`
- point your browser to: `http://localhost:8080`

# Problem
Draw a grid of emojis representing the colors obtained from the webcam.

## Background
There are a lot of "Mosaic" renderers out there, mainly for poster or still images
creation:

- https://github.com/codebox/mosaic
- https://github.com/keijiro/PhotoMosaic
- https://github.com/gustavomazzoni/photo-mosaic

I wanted to pass a webcam still image to obtain a video stream rendered with emojis
instead of pixels.

## Constraints
- It should run in the browser
- It should resemblance the original input (as in it has to kinda look like it)

## Assumptions
- The user will grant webcam access on its browser

## Solution Proposal
The problem can be divided into 3 different sub problems
- Obtain a list of Emojis and its most representative color.
- Obtain a low-res webcam image stream, and inspect each pixel color.
- Render the webcam stream but instead of drawing each pixel draw an emoji that is closer to the original pixel color.

I'm creating a web-app that uses `React` as the app framework, this will render
a `pixi.js` `<canvas/>` to draw each emoji grid frame. The grid should be fed
a color grid that represents the webcam stream.

### 1) Get the Emojis
The idea is to first create the emoji list, for the convenience of this project
I've added a pre-made `emojis/emojis.zip` file that contains the list of apple
standard emoji list.

With these I use the `emojis/build_list.js` script it uses `ImageMagick` to extract
the most dominant color of each `emoji.png` file it finds in the folder, then I
copy/paste the console output to manually create the `list.json` file you find there.

(You can use your own tile sets if you provide square png images and create the list
for them.)

The list is a simple `json` file that indexes an image path using the color as key:
```
{
  ...,
  "#D8A68C":"chicken_1f414.png",
  ...
}
```
The output for this subproblem, should be the complete `list.json` and the emojis
png files inside the `emojis/` folder.

Later I load the `list.json` file as the `window.Emojis` global variable inside
`client/index.jsx`.

### 2) Get the webcam colors grid
For this we use the browsers webcam API, this is a simple `React` component
`client/components/Camera.jsx` which:
- Render a `<canvas/>` node called `backCanvasEl`
- Render a `<video/>` node called `videoEl`
- On mount ask the browser for webcam stream and attach the stream to the `videoEl`
- On `requestAnimationFrame` event we run the `updateFrame` method
- `updateFrame` takes the `videoEl` stream and renders it into the `backCanvas`
- then asks for `getImageData` onto the `backCanvas` and outputs an array of pixel coordinates and colors
```
[
  ...,
  {
    x: 9,
    y: 3.
    color:{
      r: 255,
      g: 255,
      b: 255
    }
  }
  ...,
]
```
- this array uses the `Mediator` to emit an `camera-update` event with the array as its data.

### 3) Render the mirror
With the `window.Emojis` list available and the camera webcam stream already as a
color grid available as the `camera-update` event I created the `client/components/Mirror.jsx` which:
- On mount binds to the `camera-update` event handled by `handleCameraUpdate`
- Creates the `pixi.js` `App` takes the `renderer` and adds it to the DOM
- Extracts the `window.Emojis` color list to use the `nearest-color` lib
- Uses a `pixi.js` loader to preload all the emojis png files
- On `handleCameraUpdate`
- We first clean the previous emoji frame
- Using the webcam pixel,color array we walk through it and run the `getEmoji`
method.
- `getEmoji` will extract the pixel color
- Blend the pixel color with the current tint shade
- Find the closer color from the `window.Emoji` color index using the `nearest-color`
- With the closer color we find the png texture already loaded by the pre loader
- Draw a tile of color using a `pixi.js` `Graphics`
- Create a new `pixi.js` `Sprite` based on the emoji resource and draw it over the tile
- Use the pre calculated tile size to draw both of them
- Do this for every pixel and compile a new emoji grid frame
- Pass that to the `pixi.js` `App` renderer to be drawn
- Repeat each `camera-update`

After experimentation I decided to add a color transition between frames, this
helps to rotate the emojis that are shown on the grid and to draw them over a
tile of the color it represents, this helps making the image look better.

## Notes
- `config.json` sets the low-res resolution

## Further Improvements
- Automate tile set creation
- Exclude emojis with lots of whitespace
