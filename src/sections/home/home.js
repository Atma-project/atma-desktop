import './home.scss'

import Vue from 'vue'
Vue.config.debug = true
import config from 'config'
import $ from 'chirashi-imports'

export default Vue.extend({
    template: require('./home.html'),

    data() {
        return {
        }
    },

    ready() {
        let animationEvent = this.wichAnimationEvent()
        animationEvent && document.querySelector('.home .logo').addEventListener(animationEvent, () => {
            TweenMax.to(this.$el, 1.0, {
                opacity: 0,
                onComplete: () => {
                    this.$route.router.go('/synchro')
                }
            })
        })
        let logo = $.find(this.$el, '.logo')[0]
        logo.classList.add('animate')
    },

    methods: {
        wichAnimationEvent() {
            let t
            let el = document.createElement('fakeElement')
            let animations = {
                'animation':'animationend',
                'OAnimation':'oAnimationend',
                'MozAnimation':'animationend',
                'WebkitAnimation':'webkitAnimationend'
            }

            for (t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t]
                }
            }
        }
    }
})
