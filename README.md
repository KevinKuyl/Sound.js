# Sound.js
Short and simple audio handler for javascript, includes visualizations

This object has a library in which to put sounds, a que and visualizations. 

Usage: 
  Adding a file to the library: 
```html
  <script>
    Sound.lib.add('path/to/file.mp3', 'soundName');
  </script>
```
  If no sound name is given, it will be numerical.
  Adding a sound to the que: 
```html
  <script>
  Sound.que.add('soundName');
  </script>
```
Visualizer: 
  The visualizer is a little more complex, i'm still thinking about how i'm gonna make this easier to use and yet still keep the flexibility. With that said, i'll be describing basic usage.
  
  To start a visualization, you must first create an analyzer for the sound in your library
```html
  <script>
    Sound.visualizer.createAnalyser('soundName', Sound.visualizer.createOutput);
  </script>
```
  You might notice, in the same line output is created. This is the flexibility i was talking about that i want to keep.
  
  Now the visualization needs a width and a height. For the default visualizations i have assumed a width of 1024, since i have 
  1024 datapoints, and a height of 255, since that's the maximum value of a datapoint. It was the easiest mathematically, i will 
  add more later which can be scaled. 
```html
  <script>
    Sound.lib.items['soundName'].visualizer.width = 1024;
    Sound.lib.items['soundName'].visualizer.height = 255;
  </script>
```

  Next we say what animation to use when visualizing the sound, so far, only bar and line, more to come.
```html
  <script>
    Sound.lib.items['soundName'].visualizer.visualization = Sound.visualizer.lib.line;
  </script>
```
  
  Now we insert the visualizer into the document. I'm inserting it into the body, but it can be any HTML DOM node.
```html
  <script>
    Sound.lib.items['soundName'].visualizer.appendTo(document.body);
  </script>
```
  
  Time to start rendering:
```html
  <script>
    Sound.lib.items['soundName'].visualizer.render();
  </script>
```
    
  And finally, play the actual sound:
```html
  <script>
    Sound.lib.items['soundName'].play();
  </script>
```
    
  
