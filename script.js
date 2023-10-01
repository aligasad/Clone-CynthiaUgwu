const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    tl.to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    tl.from("#herofooter", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -.5,
        ease: Expo.easeInOut
    })
}

// jab mouse move ho to hum log skew kar paaye aur maximum skew and minimum skew define kar paaye, jab mouse move ho to chapta ki value badhe, aur jab mouse chalna band ho jaaye to chapta hata lo
var timeout;
function circleChiptaKro(){
    // define default scale value
    var xscale=1;
    var yscale=1;

    var xprev =0;
    var yprev =0;
    window.addEventListener("mousemove", function(dets){

        clearTimeout(timeout);
        var xdiff=dets.clientX -xprev;
        var ydiff=dets.clientY -yprev;
        xscale=gsap.utils.clamp(.8, 1.2,xdiff);
        yscale=gsap.utils.clamp(.8, 1.2,ydiff);
        xprev = dets.clientX;
        yprev = dets.clientY;

        MouseFollower(xscale, yscale);
        timeout = setTimeout(function(){
            document.querySelector("#mincircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 70);
    });
}

function MouseFollower(xscale , yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#mincircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
} 
circleChiptaKro();
MouseFollower();    
firstPageAnim();


// teeno element ko select kro, uske baad teeno par ek mousemove lagao, jab mouse move 
// ho to ye pata kro ki mouse kha par hai, jiska matlab hai mouse ki x and y position pata 
// kro, ab mouse ki x & y position ke badle us image ko show kro and us image ko move kro, 
// move karte waqt rotate kro & jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: .5,
        });
    });


    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot*0.8),
        });
    });
});    // it gives us a nodelist of elem jispe hm forEach() method laga sakte hai
