import THREE from 'three'
import gui from 'helpers/app/gui'

const M_PI = Math.PI
const M_2_PI = 2 * M_PI

const RADIUS = 0.7
const WIDTH = 50
const HEIGHT = 50

export default class Soul2Aura extends THREE.Object3D {
    constructor(world, debug) {
        super()

        this.colorOptions = {
            topColor: '#e9e58c',
            bottomColor: '#3bc7de'
        }

        //set the geometry and its vertices
        this.geometry  = new THREE.SphereGeometry(RADIUS, WIDTH, HEIGHT)

        this.uniforms = {
            amplitude: {
                type: 'f',
                value: 0.1
            },
            speed: {
                type: 'f',
                value: 20.0
            },
            noiseSmoothing: {
                type: 'f',
                value: 0.5
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
            },
            alphaCut: {
                type: 'f',
                value: 0.1
            },
            alphaApplied: {
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

        ///make Mesh
        this.aura = new THREE.Mesh(this.geometry, this.material)
        this.add(this.aura)
        this.material.uniforms.noiseSmoothing.needsUpdate = true
        this.material.uniforms.speed.needsUpdate = true

        this.castShadow = true
        this.reciveShadow = true
        this.dynamic = true

        //init GUI
        this.initGUI(gui)
    }

    initGUI(gui) {
        let aura = gui.addFolder('Aura')
        aura.add(this.aura.material.uniforms.noiseSmoothing, 'value', 0, 1).name('nSmoothing').step(0.01)
        aura.add(this.aura.material.uniforms.speed, 'value', 0, 30).name('speed').step(0.1)
        aura.add(this.aura.material.uniforms.amplitude, 'value', 0, 2).name('amplitude').step(0.01)
        aura.add(this.aura.material.uniforms.alphaCut, 'value', 0, 1).name('alphaCut')
        aura.add(this.aura.material.uniforms.alphaApplied, 'value', 0, 1).name('alphaApplied')
        aura.addColor(this.colorOptions, 'topColor')
        aura.addColor(this.colorOptions, 'bottomColor')
    }

    update(frame) {
        this.material.uniforms.frame.value = frame

        this.material.uniforms.topColor.value = new THREE.Color(this.colorOptions.topColor)
        this.material.uniforms.bottomColor.value = new THREE.Color(this.colorOptions.bottomColor)
    }
}
