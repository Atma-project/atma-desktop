module.exports = {

  //Wave
    "system1": {
        "name": "Wave",
        "index": 1,
        "elevation": 0.2,
        "noise_range": 0.8,
        "sombrero_amplitude": 0,
        "sombrero_frequency": 1,
        "speed": 1,
        "segments": 324,
        "wireframe_color": "#2480b3",
        "perlin_passes": 0,
        "wireframe": false,
        "floor_visible": false,
        "position": {
          "x": 1.0,
          "y": 4.0,
          "z": 24.0
        },
        "minIntensity": 0.1,
        "intensity": 3.0,
        "alpha": 1.0
    },

    // Floor
    "system2": {
        "name": "Floor",
        "index": 2,
        "elevation": 0.2,
        "noise_range": 0.8,
        "sombrero_amplitude": 0,
        "sombrero_frequency": 1,
        "speed": 1,
        "segments": 324,
        "wireframe_color": "#224acd",
        "perlin_passes": 0,
        "wireframe": false,
        "floor_visible": false,
        "position": {
          "x": 1.0,
          "y": 4.0,
          "z": -3.0
        },
        "minIntensity": 0.1,
        "intensity": 2.0,
        "alpha": 1.0
    },

    //Mountain
    "system3": {
        "name": "Moutain",
        "index": 3,
        "elevation": -3.4,
        "noise_range": 1.7,
        "sombrero_amplitude": 0,
        "sombrero_frequency": 1,
        "speed": 1,
        "segments": 324,
        "wireframe_color": "#224acd",
        "perlin_passes": 3.0,
        "wireframe": false,
        "floor_visible": false,
        "position": {
          "x": 0.0,
          "y": 10.0,
          "z": 0.0
        },
        "minIntensity": 0.1,
        "intensity": 1.5,
        "alpha": 1.0
    },

    //Fake wave
      "system4": {
          "name": "Fake wave",
          "index": 1,
          "elevation": 0.2,
          "noise_range": 0.8,
          "sombrero_amplitude": 0,
          "sombrero_frequency": 1,
          "speed": 1,
          "segments": 324,
          "wireframe_color": "#2480b3",
          "perlin_passes": 0,
          "wireframe": false,
          "floor_visible": false,
          "position": {
            "x": 1.0,
            "y": 4.0,
            "z": 24.0
          },
          "minIntensity": 0.1,
          "intensity": 3.0,
          "alpha": 1.0
      },

    //background mountains
      "system5": {
          "name": "bkg mountains",
          "index": 1,
          "elevation": 10.0,
          "noise_range": 0.8,
          "sombrero_amplitude": 0,
          "sombrero_frequency": 1,
          "speed": 0,
          "segments": 324,
          "wireframe_color": "#2480b3",
          "perlin_passes": 3.0,
          "wireframe": false,
          "floor_visible": false,
          "position": {
            "x": 1.0,
            "y": 4.0,
            "z": -30.0
          },
          "minIntensity": 0.1,
          "intensity": 3.0,
          "alpha": 1.0
      },
}
