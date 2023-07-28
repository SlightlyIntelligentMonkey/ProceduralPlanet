import * as THREE from 'three'
import vertShader from 'shaders/texture.vert'
import fragShader from 'shaders/textureMap.frag'
import Map from 'views/Map.js'

class TextureMap extends Map {

  constructor() {
    super();
    this.setup();
    super.setup();
  }

  setup() {
    this.mats = [];

    for (let i = 0; i < 6; i++) {
      this.mats[i] = new THREE.ShaderMaterial({
        uniforms: {
          colorMap: {type: "t", value: new THREE.Texture()},
          xIndexMap: { type: "t", value: new THREE.Texture() },
          yIndexMap: { type: "t", value: new THREE.Texture() },
          temperatureMap: { type: "t", value: new THREE.Texture() },
          iceCutoff: { type: "f", value: 0.2 }
        },
        vertexShader: vertShader,
        fragmentShader: fragShader,
        transparent: true,
        depthWrite: false
      });
    }
  }

  render(props) {
    // props.resolution
    // props.heightMaps[]
    // props.moistureMaps[]
    // props.biomeMap

    let resolution = props.resolution;

    for (let i = 0; i < 6; i++) {

      this.mats[i].uniforms.colorMap.value = props.colorMap;
      this.mats[i].uniforms.xIndexMap.value = props.xIndexMap[i];
      this.mats[i].uniforms.yIndexMap.value = props.yIndexMap[i];
      this.mats[i].uniforms.temperatureMap.value = props.temperatureMaps[i];
      this.mats[i].uniforms.iceCutoff = props.iceCutoff;  //this is somehow not passed to the shader
      this.mats[i].needsUpdate = true;
    }

    super.render(props);
  }

}

export default TextureMap;
