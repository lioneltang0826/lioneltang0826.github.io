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
  thumbnail: "images/3d-event-design-gallery/2024-swiftfestival-01.png",
  images: [
	"images/3d-event-design-gallery/2024-swiftfestival-01.png",
      "images/3d-event-design-gallery/2024-swiftfestival-02.png",
      "images/3d-event-design-gallery/2024-swiftfestival-03.png",
      "images/3d-event-design-gallery/2024-swiftfestival-04.png",
      "images/3d-event-design-gallery/2024-swiftfestival-05.png",
      "images/3d-event-design-gallery/2024-swiftfestival-06.png",
      "images/3d-event-design-gallery/2024-swiftfestival-07.png",
      "images/3d-event-design-gallery/2024-swiftfestival-08.png"
  ],
  video: null,
  brief: "Overall venue, environment and stage design for Swift Festival 2024 @ Sentul Depot, Setapak",
  featured: true,
  placeholderGradient: null
},

];
