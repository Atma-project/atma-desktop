import THREE from 'three'
import gui from 'helpers/app/gui'

import SPE from 'shader-particle-engine'

export default class Line extends THREE.Object3D {
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
                value: THREE.ImageUtils.loadTexture('./assets/images/textures/8.png')
            }
        })

        this.emitter = new SPE.Emitter({
            maxAge: {
                value: 2,
                spread: 4
            },

            position: {
                value: new THREE.Vector3(0, 0, 0),
                spread: new THREE.Vector3( 0.03, 6.0, 0.03 )
            },

            //inertie
            acceleration: {
                value: new THREE.Vector3( 0.0, 0.0, 0.0 ),
                spread: new THREE.Vector3( 0.03, 0.1, 0.03 ),
                randomise: true
            },

            //speed
            velocity: {
                value: new THREE.Vector3(0.0, 0.2, 0.0),
                // spread: new THREE.Vector3(-0.1, 0.2, 0.0)
            },

            color: {
                value: [ new THREE.Color( '#FFFFFF' ), new THREE.Color( '#FFFFFF' ), new THREE.Color( '#FFFFFF' ) ],
                spread: [ new THREE.Color( '#FFFFFF' ), new THREE.Color( '#FFFFFF' ), new THREE.Color( '#FFFFFF' ) ]
            },

            size: {
                value: [ 0, 1, 0 ],
                spread: [ 0, 4, 0 ],
                randomise: true
            },

            opacity: {
              value: [0.8, 0.2, 0.7],
              value: [1, 1, 1],
              randomise: true
            },

            wiggle: {
                value: Math.random() / 5
            },

            drag: {
                value: Math.random()
            },

            rotation: {
                axis: new THREE.Vector3(0, Math.random(), 0),
                angle: Math.random() * Math.PI,
                center: new THREE.Vector3(0, Math.random(), 0)
            },

            particleCount: 2000
        })

        // var material = new THREE.LineBasicMaterial({
        //     color: 0x0000ff
        // })
        // var line = new THREE.Line(geometry, material);
        // this.add(line)

        // console.log(this.particleGroup)
        var mouseX, mouseY, mouseVector = new THREE.Vector3();

        document.addEventListener( 'mousemove', function( e ) {
            mouseVector.set(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1,
                0.5
            );
            // this.emitter.acceleration.value = this.emitter.acceleration.value.set( mouseVector.x, 0, 0 );
            // this.emitter.position.value = this.emitter.position.value.set( mouseVector.x, 0, 0 );
            this.emitter.rotation.axis = this.emitter.rotation.axis.set( (mouseVector.x / 10), mouseVector.y, 0 );
            this.emitter.rotation.center = this.emitter.rotation.center.set( (mouseVector.x / 10), mouseVector.y, 0 );
        }.bind(this), false );

        console.log(this.emitter);
// ce
        this.particleGroup.addEmitter( this.emitter )
        this.add( this.particleGroup.mesh )

    }

    initGUI() {

    }

    update(frame) {
        this.particleGroup.tick(this.clock.getDelta())
    }
}