import THREE from 'three'
import gui from 'helpers/app/gui'
import Seaweed from './seaweed'

const NB_SEAWEEDS = 500

export default class SeaweedSystem extends THREE.Object3D {
    constructor() {
        super()

        this.seaweeds = []

        for ( let i = 0; i < NB_SEAWEEDS; i ++ ) {
            let seaweed = new Seaweed()

            seaweed.position.y = 0
            seaweed.position.x = Math.random() * (5 - -5) + -5
            seaweed.position.z = Math.random() * (20 - -20) + -20

            seaweed.scale.y = Math.random() + 1

            // seaweed.castShadow = true

            this.seaweeds.push(seaweed)

            this.add(seaweed)
        }
    }

    update(frame) {
        for(let i = 0; i < NB_SEAWEEDS; i++) {
            this.seaweeds[i].update(frame)
        }
    }
}
