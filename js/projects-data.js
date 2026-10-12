/*
  projects-data.js
  ------------------------------------------------------------
  One entry per project. Both the homepage "Work" section and
  the category gallery pages read from this same list — add a
  project here once and it can appear in both places.

  Fields:
    slug                required, unique, lowercase-hyphenated (used for future linking)
    title                required
    category             required — must exactly match one of:
                          "3D Event Design", "3D Hardsurface Modelling",
                          "Motion Graphics", "Content Creation"
    thumbnail             path to one image, e.g. "images/arch-thumb.jpg" — shown in grids.
                          Leave as null to fall back to a placeholder look until you add a real image.
    images                array of extra image paths — shown in the slideshow when a
                          card is clicked. Leave as [] if none yet.
    video                 an embed URL only (YouTube/Vimeo "embed" link), or null.
                          When present, it shows as the first slide in the slideshow.
    brief                 a few sentences shown next to the slideshow.
    featured              true/false — featured projects are the ones that can show
                          on the homepage "Work" section (a handful across categories).
    placeholderGradient  used automatically when thumbnail/images are empty, so the
                          grid still looks intentional before real photos are added.
                          Safe to delete once a real thumbnail is set.

  Consultation is NOT included here on purpose — it has no visual portfolio and is
  hardcoded directly on the homepage instead, since it rarely changes.

  Adding a project: use add-project-helper.html to generate one of these blocks,
  paste it into the PROJECTS array below, then copy the actual image files into
  your /images folder using the filenames shown.
*/

const PROJECTS = [

{
  slug: "swift-festival-2024",
  title: "Swift Festival 2024",
  category: "3D Event Design",
  thumbnail: "images/3d-event-design-gallery/2024-swiftfestival-01.webp",
  images: [
      "images/3d-event-design-gallery/2024-swiftfestival-01.webp",
      "images/3d-event-design-gallery/2024-swiftfestival-02.webp",
      "images/3d-event-design-gallery/2024-swiftfestival-03.webp"
  ],
  video: null,
  brief: "Overall venue, environment and stage design for Swift Festival 2024 @ Sentul Depot, Setapak",
  featured: true,
  placeholderGradient: null
},

	{
  slug: "auto-bavaria-2024",
  title: "Auto Bavaria 2024",
  category: "3D Event Design",
  thumbnail: "images/3d-event-design-gallery/2024-autobavaria-08.webp",
  images: [
      "images/3d-event-design-gallery/2024-autobavaria-02.webp",
      "images/3d-event-design-gallery/2024-autobavaria-03.webp",
      "images/3d-event-design-gallery/2024-autobavaria-04.webp",
      "images/3d-event-design-gallery/2024-autobavaria-05.webp",
      "images/3d-event-design-gallery/2024-autobavaria-06.webp",
      "images/3d-event-design-gallery/2024-autobavaria-07.webp",
      "images/3d-event-design-gallery/2024-autobavaria-08.webp",
      "images/3d-event-design-gallery/2024-autobavaria-09.webp"
  ],
  video: null,
  brief: "Visualization of venue setup @ Auto Bavaria 2024",
  featured: true,
  placeholderGradient: null
},

{
  slug: "a320-throttle",
  title: "A320 Throttle",
  category: "3D Hardsurface Modelling",
  thumbnail: "images/3d-hardsurface-gallery/2023-a320throttle-04.webp",
  images: [
      "images/3d-hardsurface-gallery/2023-a320throttle-01.webp",
      "images/3d-hardsurface-gallery/2023-a320throttle-02.webp",
      "images/3d-hardsurface-gallery/2023-a320throttle-03.webp"
  ],
  video: null,
  brief: "A main interactive part from an educational VR pilot training video game.",
  featured: true,
  placeholderGradient: null
},

];
