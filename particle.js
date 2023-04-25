import { tsParticles } from "https://cdn.jsdelivr.net/npm/tsparticles-engine@2.9.3/+esm";

async function loadParticles(options) {
    await loadFireflyPreset(tsParticles);
  
    await tsParticles.load("tsparticles", {
        preset: "firefly",
        background: {
            opacity: 0 
        },
        particles: {
            color: {
                value: {
                    r: 205,
                    g:117,
                    b:39,
                },
            },
            shadow: {
                blur: 4,
                color: {
                    value: {
                        r:227,
                        g:119,
                        b:25,
                    }
                    
                },
                enable: true
            },
        },
        });

}
  
