import THREE from 'three'
import gui from 'helpers/app/gui'
import MeshLine from 'helpers/graphics/MeshLine.js'
import Maf from 'helpers/maths/maf'

const LENGTH = 8

export default class Seaweed extends THREE.Mesh {
    constructor(world) {

        let geometry = new THREE.Geometry()
        let i = LENGTH

        while (i--) {
            let y = 1 - i / LENGTH
            let ratio = Math.pow(y, 2)
            let v = new THREE.Vector3(0, ratio * 10, 0)

            geometry.vertices.push(v)
        }
        console.log(geometry);

        let line = new THREE.MeshLine()
        line.setGeometry( geometry, function( p ) { return 1 * Maf.parabola( p, 1 ) } )
        console.log(line.geometry);
        let material = new THREE.MeshLineMaterial({

        })

        super(line.geometry, material)
        this.line = line
        console.log(this.line.geometry)

    }

    wave(frame) {
        for(let i = 0; i < this.line.geometry.vertices.length - 2; i++) {
            this.vertice = this.line.geometry.vertices[i]
            this.distance = new THREE.Vector2(this.vertice.x, this.vertice.y).sub(new THREE.Vector2(0, 0))
            this.vertice.z = Math.sin(this.distance.length() / 10 + (frame / 2)) * 10
        }
        this.plane.geometry.verticesNeedUpdate = true
    }

    update(frame) {
        // this.wave(frame)
    }
}