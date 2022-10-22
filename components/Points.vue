<script setup lang="ts">

const { gsap, ScrollTrigger } = useGSAP()
const props = defineProps({start:Boolean, points:String})

onMounted(async () => {

});

function animatePoints() {
  let tl = gsap.timeline()
  tl.to(".points-container", {opacity:1, duration:0.2})
  tl.to(".score",{scale:1.2, delay:0.5,rotation:360, transformOrigin:"50% 50%",opacity:1,ease: "elastic.out(1, 0.3)", duration:1});
  tl.to(".points", {scale:1.1, opacity:1,y:'43%', delay:0.5,duration:1.3, ease: "elastic.out(1, 0.3)"}, "<")
  tl.to(".score", {scale:1, opacity:0,delay:4, rotation:-360, ease: "elastic.out(1, 0.3)"}, "<")
  tl.to(".points-container", {opacity:0, zIndex:-1,delay:0.5, duration:1}, "<")
}

const start = useState("start", () => undefined);
start.value = props.start;

if(props.start) {
  animatePoints();
}
</script>
<template>
  <div class="points-container"><div class="points">points</div>
    <div class="score ma-auto">{{$props.points}}</div></div>
</template>