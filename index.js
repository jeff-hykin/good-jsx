require("good-dom").global()

// const svgElementNames = Set(["a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","hatch","hatchpath","image","line","linearGradient","marker","mask","mesh","meshgradient","meshpatch","meshrow","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","script","set","stop","style","svg","switch","symbol","text","textPath","title","tspan","unknown","use","view"])
// create a JSX middleware system if it doesnt exist
if (!window.jsxChain) {
    window.jsxChain = []
}

let isConstructor = (obj) => {
    return !!obj.prototype && !!obj.prototype.constructor.name;
}

// add it to JSX
window.React = {
    createElement: (key, properties, ...children) => {
        // run middleware
        for (let eachMiddleWare of window.jsxChain) {
            const element = eachMiddleWare(key, properties, ...children)
            if (element) {
                return element
            }
        }
        if (key instanceof Function) {
            if (isConstructor(key)) {
                return new key({...properties, children})
            } else {
                return key({...properties, children: children})
            }
        }
        const element = document.createElement(key)
        if (properties instanceof Object) {
            for (const [key, value] of Object.entries(properties)) {
                try {
                    element.setAttribute(key, value)
                } catch (error) {
                    element[key] = value
                }
            }
        }
        return element.add(...children)
    },
}