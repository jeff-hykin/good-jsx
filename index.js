require("good-dom").global()

const exclusivelySvgElements = new Set(["svg", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "tspan", "unknown", "use", "view",])
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
            const output = isConstructor(key) ? new key({...properties, children}) : key({...properties, children: children})
            // allow async components
            if (output instanceof Promise) {
                const elementPromise = output
                const placeholder = elementPromise.placeholder || document.createElement("div")
                setTimeout(async () => {
                    placeholder.replaceWith(await elementPromise)
                }, 0)
                return placeholder
            } else {
                return output
            }
        }
        // create either an html element or an svg element
        const element = exclusivelySvgElements.has(key) ? document.createElementNS('http://www.w3.org/2000/svg', key) : document.createElement(key)
        if (properties instanceof Object) {
            for (const [key, value] of Object.entries(properties)) {
                try {
                    element.setAttribute(key, value)
                } catch (error) {
                }
                element[key] = value
            }
        }
        return element.add(...children)
    },
}