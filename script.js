class Window {
    constructor(width, height, title, id) {
        this._window = this.createWindow(width, height, title, id);
        this._spawned = false;
        this.spawn();

    }

    spawn() {
        if (!this._spawned) {
            this._window.appendTo("body");
            this._spawned = true;
        }
    }

    createWindow(width, height, title, id) {
        var window = $("<div class='window'></div>");
        var top = $("<div class='window top'></div>");
        var text = $("<span class='text-top'>" + title + "</span>");
        var ul = $("<ul></ul>");
        var minimize = $("<button class='minimize'>--</button>");
        var close = $("<button class='close'>X</button>");
        ul.append(minimize);
        ul.append(close);
        top.append(text);
        top.append(ul);
        window.append(top);
        window.width(width);
        window.height(height);
        window.attr("id", id);

        // make draggable
        window.draggable({
            handle: ".window.top",
            containment: "client",
            scroll: false
        });
        
        return window;
    }
}

// Create a window
// Params: width, height, title, id
// let w = new Window(300, 300, "Hello", "window");
