class DraggableWindow {
    constructor(size, position = { x: 0, y: 0 }, title, id) {
        this.position = position;
        this._window = this._createWindow(size.x, size.y, title, id);
        this._spawned = false;
        this.spawn();
        this.id = id;
        this.visible = true;
    }

    get element() {
        return document.getElementById(this.id).getElementsByClassName("inner-content")[0];
    }


    getPosition() {
        var win = document.getElementById(this.id); return {
            x: win.style.left,
            y: win.style.top
        }
    }

    getSize() {
        var win = document.getElementById(this.id);

        return {
            width: parseInt(win.style.width.split("px")[0]),
            height: parseInt(win.style.height.split("px")[0])
        }
    }

    setPosition(x, y) {
        var win = document.getElementById(this.id);
        win.style.left = x + "px";
        win.style.top = y + "px";
    }

    setSize(width, height) {
        var win = document.getElementById(this.id);
        // if ends with number, it's pixels, else just set equal to whatever user entered
        // check if string is numeric js
        if (isNan(width.toString()[width.toString().length - 1])) {
            win.style.width = width + "px";
        } else {
            win.style.width = width
        }

        if (isNan(height.toString()[height.toString().length - 1])) {
            win.style.height = height + "px";
        }
        else {
            win.style.height = height
        }



    }
    minimize(state) {
        var win = document.getElementById(this.id);
        if (state) {
            // change visibility
            win.style.visibility = "hidden";
            this.visible = false;
        } else {
            win.style.visibility = "visible";
            this.visible = true;
        }
    }



    close(){
        // destroy the window and free the object
        // minimize
        this.minimize(true);

    }



    spawn() {
        if (!this._spawned) {
            this._window.appendTo("body");
            this._spawned = true;
                        
        }
    }

    _createWindow(width, height, title, id) {
        var window = $("<div class='window'></div>");
        var top = $("<div class='window top'></div>");
        // handle mouse down event for top
        top.mousedown(function (e) {
            // set top zindex 4
            // get all windows, set z index to 0
            var windows = document.getElementsByClassName("window");
            for (var i = 0; i < windows.length; i++) {
                windows[i].style.zIndex = 0;
            }
            window.css("z-index", 1);
        })

        var text = $("<span class='text-top'>" + title + "</span>");
        var ul = $("<ul></ul>");
        var minimize = $("<button class='minimize'>--</button>");
        var close = $("<button class='close'>X</button>");
        // handle minimize button click

        var innerContent = $("<div class='inner-content'></div>");

        ul.append(minimize);
        ul.append(close);
        top.append(text);
        top.append(ul);
        window.append(top);
        window.append(innerContent);
        window.width(width);
        window.height(height);
        window.attr("id", id);

        // set position
        window.css("left", this.position.x);
        window.css("top", this.position.y);

        // make draggable
        window.draggable({
            handle: ".window.top",
            containment: "client",
            scroll: false
        });
        
        return window;
    }
}
