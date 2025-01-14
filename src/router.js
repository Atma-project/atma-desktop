import config from 'config'
import routes from 'routes'

import Vue from 'vue'
import VueRouter from 'vue-router'

import Sections from 'sections'
import forEach from 'lodash.foreach'

Vue.use(VueRouter)

const router = new VueRouter(config.router)

let map = {}

forEach (routes, (component, route) => {
    map[route] = {
        component: Sections[component.component]
    }
})

router.map(map)

export default router
