var Sound = {
  que: {
    items: [],

    add: function(name){
      if(Sound.lib.items[name]) return Sound.que.items.push(Sound.lib.items[name]) - 1;
    },

    remove: function(key){
      Sound.que.items.splice(key, 1);
    },

    clear: function(){
      Sound.que.items = [];
    },

    play: function(startTrack){
      var playing = startTrack -1  || 0;


      var playNext = function(key){
        if(Sound.que.items[key]){
          if(Sound.que.items[key].isLoaded){
            var trackLength = Math.floor(Sound.que.items[playing].duration * 1000);

            Sound.que.items[key].play();

            var play = setTimeout(function(){
              playing++
              playNext(key +1)
            }, trackLength)
          }
          else{
            Sound.que.items[key].addEventListener('canplaythrough', function(){
              playNext(key);
          })
        }

        }
      }

      playNext(playing);
    }
  },
  lib: {
    items: {},

    add: function(src, name){
      var obj = new Audio(src);
          obj.addEventListener('canplaythrough', function(){
            this.isLoaded = true;
          })
      if(!name){
        var key = 0;
        for(i in Sound.lib.items){
          key++;
        }
        name = key;
      }

      Sound.lib.items[name] = obj;
    },

    remove: function(name){
      if(typeof name == "string"){
        delete Sound.lib.items[name];
      }
    }
  },

  visualizer: {
    createOutput: function(name, callback){
      if(Sound.lib.items[name] && Sound.lib.items[name].analyser){
        var sound = Sound.lib.items[name];
            sound.visualizer = {
              init: function(){
                sound.visualizer.element = document.createElement('canvas');
                sound.visualizer.output = sound.visualizer.element.getContext('2d');
              },

              appendTo: function(element){
                element.appendChild(sound.visualizer.element);
              },

              visualization: function(){},

              render: function(){
                var dataPoints = sound.dataPoints;
                requestAnimationFrame(sound.visualizer.render);
                //console.log(sound)
                sound.visualizer.visualization(sound);
              },

              set width(val) {
                sound.visualizer.element.width = val;
              },
              get width(){
                return sound.visualizer.element.width;
              },

              set height(val) {
                sound.visualizer.element.height = val;
              },
              get height(){
                return sound.visualizer.element.height;
              },
            };
            sound.visualizer.init()
            if(callback) callback(name);
      }
    },

    createAnalyser: function(name, callback){
      if(Sound.lib.items[name]){
        var sound = Sound.lib.items[name];
            sound.analyser = {
              ctx: new AudioContext(),

              get dataPoints(){
                var frequencyData = new Uint8Array(sound.analyser.analyser.frequencyBinCount);
                sound.analyser.analyser.getByteFrequencyData(frequencyData);
                return frequencyData;
              }
            }
            sound.analyser.audioSrc = sound.analyser.ctx.createMediaElementSource(Sound.lib.items[name]);
            sound.analyser.analyser = sound.analyser.ctx.createAnalyser();

            sound.analyser.audioSrc.connect(sound.analyser.analyser);
            sound.analyser.audioSrc.connect(sound.analyser.ctx.destination);

            if(callback) callback(name);
      }
    },

    lib: {
      bars: function(sound){
        var visualizer = sound.visualizer;
        var datapoints = sound.analyser.dataPoints;

        var toHex = function(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };

        visualizer.output.fillStyle = "#000000";
        visualizer.output.fillRect(0,0, visualizer.width, visualizer.height);

        for(i in datapoints){
          visualizer.output.fillStyle = "#0000" + toHex(datapoints[i]);
          visualizer.output.fillRect(i, visualizer.height, 1, -datapoints[i] * 0.9)
        }
      },

      line: function(sound){
        var visualizer = sound.visualizer;
        var datapoints = sound.analyser.dataPoints;

        visualizer.output.fillStyle = "#000000";
        visualizer.output.fillRect(0,0, visualizer.width, visualizer.height);

        visualizer.output.strokeStyle = "#0000FF";
        visualizer.output.beginPath();
        visualizer.output.moveTo(0, 0);
        for(i in datapoints){
          visualizer.output.lineTo(i, visualizer.height - datapoints[i]*0.9);
        }

        visualizer.output.stroke();
      }
    },
  }
};
