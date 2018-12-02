// expand the HTML element ability
Object.defineProperties(window.HTMLElement.prototype, {
    // allow setting of all styles directly
    style: {
        set: function (styles) {
            Object.assign(this.style, styles);
        }
    },
    // allow setting of children directly
    children: {
        set: function(newChilden) {
            // remove all children
            while (this.firstChild) {
                this.removeChild(this.firstChild);
            }
            // add new child nodes
            for (let each of newChilden) {
                this.add(each)
            }
        },
        get: function() {
            return this.childNodes
        }
    },
    class: {
        set : function(newClass) {
            this.className = newClass
        },
        get : function() {
            return this.className
        }
    }
});
// add()
window.HTMLElement.prototype.add = function (...inputs) {
    for (let each of inputs) {
        if (typeof each == 'string') {
            this.appendChild(new Text(each))
        } else if (each instanceof Function) {
            this.add(each())
        } else if (each instanceof Array) {
            this.add(...each)
        } else {
            this.appendChild(each)
        }
    }
    return this
}
// addClass()
window.HTMLElement.prototype.addClass = function (...inputs) {
    return this.classList.add(...inputs)
}
// for (let eachChild of elemCollection)
window.HTMLCollection.prototype[Symbol.iterator] = function* () {
    let index = 0
    let len = this.length
    while (index < len) {
        yield this[index++]
    }
}
// for (let eachChild of elem)
window.HTMLElement.prototype[Symbol.iterator] = function* () {
    let index = 0
    let len = this.childNodes.length
    while (index < len) {
        yield this.childNodes[index++]
    }
}
// create a middleware system if it doesnt exist
if (!window.jsxChain) {
    window.jsxChain = []
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
        return Object.assign(document.createElement(name), properties).add(...children)
    },
}