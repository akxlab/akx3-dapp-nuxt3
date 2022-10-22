import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { ScrollSmoother } from "gsap/ScrollSmoother";
//import { SplitText } from "gsap/SplitText";
import {defineNuxtPlugin} from "#app";

export default defineNuxtPlugin((NuxtApp) => {
    /*------------------------------
    Register plugins
    ------------------------------*/
    gsap.registerPlugin(ScrollTrigger);

    return {
        provide: {
            gsap,
            ScrollTrigger,
           // ScrollSmoother,
           // SplitText,
        },
    };
});