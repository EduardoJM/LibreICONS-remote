# LibreICONS-remote

This is an small tool to load and use the **LibreICONS** svg's from the original **LibreICONS** repository in the GitHub.

## Usage

The usage of this toolkit is very simple. The first step is to include the **CSS** and the **JavaScritp** of this tool:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/EduardoJM/LibreICONS-remote@master/css/libre.css" />
</head>
<body>

    <script src="https://cdn.jsdelivr.net/gh/EduardoJM/LibreICONS-remote@master/js/libre.js"></script>
</body>
</html>
```

And, now, use the **i.libre** html tag to add the icon.

```html
<i class="libre" data-icon="{ICON NAME}"></i>
```

An usage example is, to add the google brand icon in the page:

```html
<i class="libre" data-icon="brand-google"></i>
```
