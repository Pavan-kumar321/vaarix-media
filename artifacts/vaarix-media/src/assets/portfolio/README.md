# Portfolio assets

Drop your case-study videos and poster images in this folder. The portfolio
section on the site picks them up automatically — no code changes needed.

## Naming convention

Name each file like this:

```
{slug}--{category}.{ext}
```

- **slug** — becomes the project title (kebab-case → Title Case).
  e.g. `burger-joint` → "Burger Joint"
- **category** — optional, becomes the small label shown on hover
  (kebab-case → Title Case). e.g. `food-photography` → "Food Photography".
  If you leave it out, the label defaults to "Case Study".

To pair a poster image with a video, give them the **exact same name**
(everything except the extension):

```
burger-joint--food-photography.mp4   (video, plays on hover)
burger-joint--food-photography.jpg   (poster, shown by default)
```

You can also upload an image on its own with no matching video — it will
just be shown as a static image with no hover playback.

## Supported formats

- Images: `.jpg`, `.jpeg`, `.png`, `.webp`
- Videos: `.mp4`, `.webm`


## Ordering

Items are sorted alphabetically by filename. Prefix with numbers if you want
a specific order, e.g. `01-burger-joint--food-photography.mp4`,
`02-lumina-roasters--brand-identity.jpg`.

## Example

```
src/assets/portfolio/
├── 01-burger-joint--food-photography.mp4
├── 01-burger-joint--food-photography.jpg
├── 02-lumina-roasters--brand-identity.jpg
├── 03-noir-bar--social-media.webm
└── 03-noir-bar--social-media.webp
```

Until you add your own files here, the site shows placeholder images.
