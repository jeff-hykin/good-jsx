# Good-jsx
A DOM manipulation tool for jsx

# What should I use this for?
Writing significantly more readable, maintainable, and condensed code. For example:
<br>Without good-dom:
```html
<!-- HTML and vanilla javascript -->
<body style="width: 100vw; display:flex; flex-direction: column; align-items: center">
    Hello There
    <div id="blahDiv"></div>
    <input id="blahInput" placeholder="type something"/>
</body>
<script type="text/javascript">
    // get the input box
    var blahInput = document.getElementById("blahInput")
    blahInput.oninput = function(eventObject) {
        // get the value
        var inputBoxContent = eventObject.target.value
        // put the value in a div
        var blahDiv = document.getElementById("blahDiv")
        blahDiv.innerText = inputBoxContent
    }
</script>
```

<br>Equivlent output with good-dom:
```html
<body>
<script type="text/javascript">
    document.body = <body style={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: "center"}}>
        Hello There
        {blahDiv= <div>Im an inner box</div>}
        {blahInput= <input placeholder="type something" oninput={eventObject=>blahDiv=eventObject.target.value} />}
    </body>
</script>
</body>
```


# Does it support custom elements?
Yes! In fact theres a middleware system for adding any custom element handlers you want, including something like react's version of jsx. An explaintion of how to add middleware will be added here in the future.