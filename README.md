# Sound.js
Short and simple audio handler for javascript, includes visualizations

This object has a library in which to put sounds, a que and visualizations. 

Usage: 
  Adding a file to the library: Sound.lib.add('path/to/file.mp3', 'soundName');
    If no sound name is given, it will be numerical.
  Adding a sound to the que: Sound.que.add('soundName');
  
Visualizer: 
  The visualizer is a little more complex, i'm still thinking about how i'm gonna make this easier to use and yet still keep the 
  flexibility. With that said, i'll be describing basic usage.
  
  To start a visualization, you must first create an analyzer for the sound in your library
    Sound.visualizer.createAnalyser('soundName', Sound.visualizer.createOutput);
  You might notice, in the same line output is created. This is the flexibility i was talking about that i want to keep.
  
  Now the visualization needs a width and a height. For the default visualizations i have assumed a width of 1024, since i have 
  1024 datapoints, and a height of 255, since that's the maximum value of a datapoint. It was the easiest mathematically, i will 
  add more later which can be scaled. 
    Sound.lib.items['soundName'].visualizer.width = 1024;
    Sound.lib.items['soundName'].visualizer.height = 255;
    
  Next we say what animation to use when visualizing the sound, so far, only bar and line, more to come.
    Sound.lib.items['soundName'].visualizer.visualization = Sound.visualizer.lib.line;
  
  Now we insert the visualizer into the document. I'm inserting it into the body, but it can be any HTML DOM node.
    Sound.lib.items['soundName'].visualizer.appendTo(document.body);
  
  Time to start rendering:
    Sound.lib.items['soundName'].visualizer.render();
    
  And finally, play the actual sound:
    Sound.lib.items['soundName'].play(); 
    
  
