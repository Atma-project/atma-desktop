import THREE from 'three'
import gui from 'helpers/app/gui'

const M_2_PI = Math.PI * 2

export default class BubbleSystem extends THREE.Points {
    constructor(options) {

        let bufferGeometry = new THREE.BufferGeometry()
        let positions      = new Float32Array(options.nbParticles * 3)
        let offsets        = new Float32Array(options.nbParticles)
        let alphas         = new Float32Array(options.nbParticles)

        for(let i = 0, i3 = 0; i < options.nbParticles; i++, i3 += 3) {
            positions[i3]     = (Math.random() * 2 - 1) * options.systemRadius
            positions[i3 + 1] = (Math.random() * 2 - 1) * 0.3
            positions[i3 + 2] = (Math.random() * 2 - 1) * options.systemRadius

            offsets[i] = Math.random() * M_2_PI

        }

        bufferGeometry.addAttribute('initial', new THREE.BufferAttribute(positions, 3))
        bufferGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
        bufferGeometry.addAttribute('offset', new THREE.BufferAttribute(offsets, 1))
        bufferGeometry.attributes.position.needsUpdate = true

        let uniforms = {
            frame: {
                type: 'f',
                value: 0
            },
            time: {
                type: 'f',
                value: 2.0
            },
            size: {
                type: 'f',
                value: options.size
            },
            texture: {
                type: 't',
                value:  new THREE.TextureLoader().load(options.litTexturePath)
            },
            color: {
                type: 'c',
                value: new THREE.Color
            },
            speedCoef: {
                type: 'f',
                value: 10.0
            },
            radius: {
                type: 'f',
                value: 10.0
            },
            speed: {
                type: 'f',
                value: 0.0
            }
        }

        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: require('./bubble.vert'),
            fragmentShader: require('./bubble.frag'),
            map: THREE.ImageUtils.loadTexture(options.litTexturePath),
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })

        //call the constructor
        super(bufferGeometry, material)

        this.start = Date.now()

        this.castShadow = true
        this.reciveShadow = true
        this.dynamic = true

        this.options = options

        this.initGUI(gui)

        // !crappy!
        document.querySelector('.close-button').addEventListener('click', function(){
            setTimeout(function(){
                this.moveBubble()
            }.bind(this), 26000)
        }.bind(this))
        // to remove later

    }

    moveBubble() {
      this.material.uniforms.speed.value = 0.01
    }

    initGUI(gui) {
        let bubble = gui.addFolder('Bulles' + this.options.index)
        //bubble.open()

        bubble.add(this.material.uniforms.speedCoef, 'value', 0, 100).name('speed')
        bubble.add(this.material.uniforms.radius, 'value', 0, 100).name('radius')
        bubble.add(this.options, 'size', 1, 500)
        bubble.addColor(this.options, 'color')
        bubble.add(this.material.uniforms.speed, 'value', -0.1, 0.1).step(0.01).name('vitesse')
    }

    update(frame) {
        this.position.z += this.material.uniforms.speed.value
        this.material.uniforms.frame.value = frame
        this.material.uniforms.size.value = this.options.size
        this.material.uniforms.color.value = new THREE.Color(this.options.color)
    }
}
