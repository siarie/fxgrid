# fxgrid

A simple CSS grid system based on flexbox.

fxgrid only include basic grid functionality. That's mean there is no
offset, alignment, and reordering features like [other][bootstrap]
[flexbox][flexboxgrid] [system][bulma] do.

[bootstrap]: https://getbootstrap.com/docs/5.1/layout/columns/
[flexboxgrid]: https://flexboxgrid.com
[bulma]: https://bulma.io/documentation/columns


# Install

Installation method available:

* [Download the latest release]()
* Install via npm `npm i fxgrid` or use yarn `yarn add fxgrid`
* Via CDN using [unpkg](https://unpkg.com/fxgrid@latest)

# Example Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>fxgrid start!</title>
    <link rel="stylesheet" href="https://unpkg.com/fxgrid@latest">
  </head>
  <body>
    <div class="row">
         <div class="col" md="4"></div>
    </div>
  </body>
</html>
```
