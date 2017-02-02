Router by Molik Miah.

How to use
----------

1. the `index.html` needs a container where the template for each route will be loaded into
for example `<div id='myApp'></div>`. the id NEEDS TO BE `myApp`

2. you need to include `router.js` file in your `index.html` BEFORE your app specific js file

3. you need to start the router in your `app.js` via `appRouter.init();` you can optionally set the watcher
delay for your route change, default is 200ms. For example if you do `appRouter.init(3000);` the router will only
check for a route change after 3 seconds which means a user will click on a Link and have to wait upto 3 seconds
before the change is recognised.

4. it's wise to add the following namespace for the route `var router = appRouter;` this way you can access
its public methods which are:
    - appRouter.navigate() example use `<button onclick="router.navigate('');">Home</button>`

    