# Project demos

The current project catalog has local demos for Iris, Boosted, Graf, UMLazy, and
Wardrobe Copilot. Each uses its explicit `demoVideo` field in the content
registry. Unrelated historical files in `public/demos` are left untouched and
are not automatically assigned to current projects by filename similarity.

Iris uses the user-supplied `Iris-Enterprise-Demo.mp4`, copied unchanged to
`public/demos/iris-enterprise-demo.mp4`. Its poster is the separately supplied
Iris brand image. Versioned descriptive asset paths avoid stale cached media.

Wardrobe Copilot's MP4 is the actual video from its
[repository README](https://github.com/devenshah2018/wardrobe-copilot#demo),
copied locally after the thumbnail exploration. Its contents are unchanged.

The Demo button uses the existing Radix dialog primitives. The video mounts only
when the dialog opens, autoplays muted inline, and provides native seek, pause,
volume, and full-screen controls. Current matched clips contain no audio track.
A play action is available if autoplay is blocked, and a video download is
offered if the media fails to load. Videos never open in another tab.

Closing through the close button, Escape, or the backdrop immediately pauses
playback. Unmounting clears the source and releases the media stream. Radix
traps keyboard focus, locks background scrolling, and restores focus to the
trigger. The player respects reduced motion and fits narrow or landscape mobile
viewports. No new video library or initial video downloads are added.

To add another demo, place its MP4 in `public/demos` and set the corresponding
project's `demoVideo` to `/demos/<filename>.mp4`. Confirm that the video belongs
to that project and check both desktop and mobile playback.
