require("good-dom").global()

// create a JSX middleware system if it doesnt exist
if (!window.jsxChain) {
    window.jsxChain = []
}

let isConstructor = (obj) => {
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

// add it to JSX
window.React = {
    createElement: (name, properties, ...children) => {
        // run middleware
        for (let eachMiddleWare of window.jsxChain) {
            let element = eachMiddleWare(name, properties, ...children)
            if (element) {
                return element
            }
        }
        if (name instanceof Function) {
            if (isConstructor(name)) {
                return new name;
            } else {
                return name({...properties, children: children})
            }
        }
        return Object.assign(document.createElement(name), properties).add(...children)
    },
}