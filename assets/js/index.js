// Navigation bar scroll state
const navEl = document.getElementById('nav');
window.addEventListener('scroll', ()=>{
    navEl.classList.toggle('scrolled', window.scrollY > 20);
});

// Tilt parallax on image card + cards
const stageWrap = document.getElementById('rightStage');
const tiltCard = document.getElementById('tiltCard');

stageWrap.addEventListener('mousemove', (e)=>{
    const r = stageWrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltCard.style.transform = `rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(10px)`;
    targetRotX = y * 0.4;
    targetRotY = x * 0.6;
});

stageWrap.addEventListener('mouseleave', ()=>{
    tiltCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
    targetRotX = 0;
    targetRotY = 0;
});


// Three.js
let targetRotX = 0, targetRotY = 0;

const canvas = document.getElementById('stage');
const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.set(0,0,5.4);

function sizeStage(){
    const s = stageWrap.getBoundingClientRect();
    renderer.setSize(s.width, s.height, false);
    camera.aspect = s.width / s.height;
    camera.updateProjectionMatrix();
}
sizeStage();
window.addEventListener('resize', sizeStage);

// Noise-displaced core
const geo = new THREE.IcosahedronGeometry(1.65, 5);

const noiseGLSL = `
vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}
`;

const mat = new THREE.ShaderMaterial({
    uniforms:{
        uTime:{ value:0 },
        uColorA:{ value:new THREE.Color(0x4c1d95) },
        uColorB:{ value:new THREE.Color(0xc084fc) },
        uColorC:{ value:new THREE.Color(0x8b5cf6) },
    },
    vertexShader: `
        varying vec3 vNormal;
        varying float vNoise;
        uniform float uTime;
        ${noiseGLSL}
        void main(){
            vNormal = normal;
            float n = snoise(position * 1.1 + uTime * 0.25);
            vNoise = n;
            vec3 pos = position + normal * (n * 0.28);
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
        }
    `,
    fragmentShader: `
        varying vec3 vNormal;
        varying float vNoise;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        void main(){
            float fresnel = pow(1.0 - abs(vNormal.z), 2.2);
            vec3 base = mix(uColorA, uColorC, smoothstep(-0.6, 0.6, vNoise));
            vec3 rim = mix(base, uColorB, fresnel);
            vec3 col = rim + fresnel * 0.5;
            gl_FragColor = vec4(col, 1.0);
        }
    `,
});

const blob = new THREE.Mesh(geo, mat);
scene.add(blob);

// Outer wireframe shell
const shellGeo = new THREE.IcosahedronGeometry(2.05, 1);
const shellMat = new THREE.MeshBasicMaterial({ color:0xc084fc, wireframe:true, transparent:true, opacity:0.12 });
const shell = new THREE.Mesh(shellGeo, shellMat);
scene.add(shell);

// Ambient particles
const particleCount = 60;
const particleGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for(let i=0;i<particleCount;i++){
    const r = 3 + Math.random()*1.5;
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos((Math.random()*2)-1);
    positions[i*3] = r * Math.sin(phi)*Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi)*Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMat = new THREE.PointsMaterial({ color:0xc084fc, size:0.035, transparent:true, opacity:0.5 });
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

const clock = new THREE.Clock();
let curRotX = 0, curRotY = 0;

let isCanvasVisible = true;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        isCanvasVisible = entry.isIntersecting;
    });
}, { threshold: 0.1 });

observer.observe(canvas);

function animate(){
    requestAnimationFrame(animate);
    if (!isCanvasVisible) return;

    const t = clock.getElapsedTime();

    mat.uniforms.uTime.value = t;

    curRotX += (targetRotX - curRotX) * 0.06;
    curRotY += (targetRotY - curRotY) * 0.06;

    blob.rotation.y = t * 0.18 + curRotY;
    blob.rotation.x = curRotX;

    shell.rotation.y = -t * 0.09;
    shell.rotation.x = t * 0.05;

    particles.rotation.y = t * 0.03;

    renderer.render(scene, camera);
}
animate();

// Hamburger menu 
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

function openMenu(){

    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu(){
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

menuBtn.onclick = openMenu;
closeBtn.onclick = closeMenu;
overlay.onclick = closeMenu;

document.querySelectorAll(".mobile-menu a").forEach(link=>{

    link.onclick = closeMenu;

});


// Typewriter animation 
const words = [
    "Dhanush C K",
    "Software Developer",
    "Web Developer",
    "Tech Enthusiast",
    "Software Engineer",
    "Video Editor",
];

const typingText = document.querySelector(".typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){

        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if(charIndex === currentWord.length){

            deleting = true;
            if(wordIndex == 0) {
                setTimeout(typeEffect, 3000);
                return;
            }
            setTimeout(typeEffect, 2300);
            return;
        }

    }else{

        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if(charIndex === 0){

            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

    }

    const speed = deleting ? 60 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();