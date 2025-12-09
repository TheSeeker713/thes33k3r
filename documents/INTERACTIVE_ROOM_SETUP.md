# Interactive Room Component - Image Setup Guide

## Required Image

For the `/brothel` page to work, you need to add a background image:

**Location:** `public/rooms/brothel-room.jpg`

### Image Requirements:
- **Dimensions:** 1920x1080 or higher (16:9 aspect ratio recommended)
- **Format:** JPG, PNG, or WebP
- **Theme:** Dark, neo-western, abandoned brothel interior
- **Mood:** Dusty, atmospheric, dimly lit

### Suggested Elements in Image:
1. A mirror (around 75% from left, 35% from top)
2. A bottle or object on a surface (around 30% from left, 65% from top)
3. A painting on the wall (centered, upper area)
4. A safe or locked container (right side, lower area)
5. A window (left side, upper-middle area)

### Quick Setup Options:

#### Option 1: Use AI Image Generation
Generate an image with this prompt:
```
Dark abandoned brothel room interior, neo-western aesthetic, dusty atmosphere, 
old mirror on wall, whiskey bottle on table, painting above bed, safe in corner, 
window with desert view, moody lighting, cinematic, high detail, 1920x1080
```

#### Option 2: Use a Placeholder
Create the directory and add any atmospheric interior image:
```powershell
mkdir public\rooms
# Then add your image as brothel-room.jpg
```

#### Option 3: Use a Dark Gradient (Temporary)
If you just want to test the functionality, create a simple dark image or use a solid color background by modifying the component to accept a backgroundColor prop.

## Adding More Rooms

To create additional rooms:

1. Add new images to `public/rooms/`
2. Create new pages: `src/app/[room-name]/page.tsx`
3. Copy the brothel page structure
4. Adjust interactable coordinates to match your new image
5. Customize the interactions

### Example Room Structure:
```
public/rooms/
├── brothel-room.jpg
├── saloon-room.jpg
├── sheriff-office.jpg
└── desert-shack.jpg
```

## Testing Interactable Positions

To fine-tune the x/y coordinates of interactables:

1. Open the page in browser
2. Right-click > Inspect Element
3. Use browser DevTools to check element positions
4. Adjust x/y percentages in the page.tsx file
5. Refresh to see changes

The coordinate system:
- `x: 0` = far left edge
- `x: 50` = horizontal center
- `x: 100` = far right edge
- `y: 0` = top edge
- `y: 50` = vertical center
- `y: 100` = bottom edge

## Current Status

✅ Component created: `src/components/InteractiveRoom.tsx`
✅ Example page created: `src/app/brothel/page.tsx`
✅ CSS animations added to `globals.css`
⚠️ **ACTION REQUIRED:** Add image to `public/rooms/brothel-room.jpg`

Once the image is added, visit: `http://localhost:3000/brothel`
