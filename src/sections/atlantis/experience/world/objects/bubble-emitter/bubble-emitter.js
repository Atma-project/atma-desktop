import THREE from 'three'
import gui from 'helpers/app/gui'

import SPE from 'shader-particle-engine'

export default class BubbleEmitter extends THREE.Object3D {
    constructor(camera) {
        super()
        this.gui = gui
        this.camera = camera

        this.speed = 0.0

        this.emitter
        this.particleGroup
        this.clock = new THREE.Clock()

        this.init()
        this.initGUI()
    }

    init() {

        this.particleGroup = new SPE.Group({
            texture: {
                value: THREE.ImageUtils.loadTexture('./assets/images/textures/bubble.png')
            }
        })

        // this.emitter = new SPE.Emitter({
        //     maxAge: {
        //         value: this.parameters.age,
        //         spread: 1
        //     },
        //
        //     position: {
        //         value: new THREE.Vector3(0, 0, 0),
        //         spread: new THREE.Vector3( 0, 0, 0 )
        //     },
        //
        //     acceleration: {
        //         value: new THREE.Vector3( 0, 3.0, 0 ),
        //         spread: new THREE.Vector3( 1.5, 1.5, 1.5 ),
        //         randomise: true
        //     },
        //
        //     velocity: {
        //         value: new THREE.Vector3(0, 5.0, 0),
        //         spread: new THREE.Vector3(1.0, 0.75, 1.0)
        //     },
        //
        //     color: {
        //         value: [ new THREE.Color( '#435eb0' ), new THREE.Color( '#3648a7' ), new THREE.Color( '#606fc7' ) ],
        //         spread: [ new THREE.Color( '#202020' ), new THREE.Color( '#ea6e32' ), new THREE.Color( '#e8b0bc' ) ]
        //     },
        //
        //     size: {
        //         value: [ 0, 1, 0 ],
        //         spread: [ 0, 3, 0 ],
        //         randomise: true
        //     },
        //
        //     particleCount: this.parameters.particleCount
        // })

        for ( let i = 0; i < 20; i ++ ) {
            this.one = 'this.emitter'
            this.two = [i]
            this.name = this.one.concat(this.two)
            this.posX = Math.random() * (50 - -50) + -50
            this.posZ = Math.random() * (0 - 150)

            this.name = new SPE.Emitter({
                maxAge: {
                    value: (Math.random() * 2),
                    spread: 1
                },

                position: {
                    value: new THREE.Vector3(this.posX, 0, this.posZ),
                    spread: new THREE.Vector3(this.posX, 0, this.posZ)
                },

                acceleration: {
                    value: new THREE.Vector3( 0, 3.0, 0 ),
                    spread: new THREE.Vector3( 1.5, 1.5, 1.5 ),
                    randomise: true
                },

                velocity: {
                    value: new THREE.Vector3(0, 5.0, 0),
                    spread: new THREE.Vector3(1.0, 0.75, 1.0)
                },

                color: {
                    value: [ new THREE.Color( '#435eb0' ), new THREE.Color( '#3648a7' ), new THREE.Color( '#606fc7' ) ],
                    spread: [ new THREE.Color( '#202020' ), new THREE.Color( '#ea6e32' ), new THREE.Color( '#e8b0bc' ) ]
                },

                size: {
                    value: [ 0, 1, 0 ],
                    spread: [ 0, 3, 0 ],
                    randomise: true
                },

                particleCount: 20
            })
            this.particleGroup.addEmitter( this.name )
            this.add( this.particleGroup.mesh )
        }
    }

    initGUI() {

    }

    update(frame) {
        this.particleGroup.tick(this.clock.getDelta())
        this.particleGroup.mesh.position.z += this.speed
    }
}