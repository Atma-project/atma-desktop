import THREE from 'three'
import gui from 'helpers/app/gui'

const M_PI = Math.PI
const M_2_PI = 2 * M_PI

const RADIUS = 5
const WIDTH = 25
const HEIGHT = 25

export default class Soul2Core extends THREE.Object3D {
    constructor(world, debug) {
        super()

        this.colorOptions = {
            topColor: '#e9e58c',
            bottomColor: '#3bc7de'
        }

        //set the geometry and its vertices
        this.geometry  = new THREE.SphereGeometry(RADIUS, WIDTH, HEIGHT)
        this.geometry.scale(0.01, 0.01, 0.01)

        this.uniforms = {
            amplitude: {
                type: 'f',
                value: 2.0
            },
            speed: {
                type: 'f',
                value: 10.0
            },
            noiseSmoothing: {
                type: 'f',
                value: 20.0
            },
            frame: {
                type: 'f',
                value: 0.0
            },
            bottomColor: {
                type: 'c',
                value: new THREE.Color(this.colorOptions.bottomColor)
            },
            topColor: {
                type: 'c',
                value: new THREE.Color(this.colorOptions.topColor)
            },
            speedCoef: {
                type: 'f',
                value: 40.0
            },
            offset: {
                type: 'f',
                value: 33.0
            },
            exponent: {
                type: 'f',
                value: 0.6
            }
        }

        //set the material
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: require('./vertices.vert'),
            fragmentShader: require('./fragments.frag'),
            transparent: true
        })

        this.material.uniforms.bottomColor.needsUpdate = true
        this.material.uniforms.topColor.needsUpdate = true
        this.geometry.computeVertexNormals()

        //make Mesh
        this.core = new THREE.Mesh(this.geometry, this.material)
        this.add(this.core)
        this.material.uniforms.noiseSmoothing.needsUpdate = true
        this.material.uniforms.speed.needsUpdate = true

        this.castShadow = true
        this.reciveShadow = true
        this.dynamic = true

        //init GUI
        this.initGUI(gui)
    }

    initGUI(gui) {
        let core = gui.addFolder('Core')
        core.add(this.core.material.uniforms.noiseSmoothing, 'value', 0, 20).name('nSmoothing')
        core.add(this.core.material.uniforms.speed, 'value', 0, 55).name('speed')
        core.add(this.core.material.uniforms.amplitude, 'value', 0, 150).name('amplitude')
        core.add(this.core.material.uniforms.offset, 'value', 0, 100).name('offset')
        core.addColor(this.colorOptions, 'topColor')
        core.addColor(this.colorOptions, 'bottomColor')
    }

    update(frame) {
        this.material.uniforms.frame.value = frame

        this.material.uniforms.topColor.value = new THREE.Color(this.colorOptions.topColor)
        this.material.uniforms.bottomColor.value = new THREE.Color(this.colorOptions.bottomColor)
    }
}
