#!/usr/bin/env python3
"""
Create PDF from screenshots in documents/screenshots/
Uses PIL for image handling and basic PDF creation
"""

import os
from pathlib import Path

try:
    from PIL import Image
    print("PIL/Pillow available")
except ImportError:
    print("ERROR: PIL/Pillow not available")
    exit(1)

# Try reportlab first (best quality)
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.pdfgen import canvas
    USE_REPORTLAB = True
    print("Using reportlab for PDF generation")
except ImportError:
    USE_REPORTLAB = False
    print("reportlab not available, trying img2pdf")
    try:
        import img2pdf
        USE_IMG2PDF = True
        print("Using img2pdf for PDF generation")
    except ImportError:
        USE_IMG2PDF = False
        print("ERROR: No PDF generation library available")
        print("Install one of: pip install reportlab OR pip install img2pdf")
        exit(1)

screenshots_dir = Path("documents/screenshots")
output_pdf = Path("documents/S33K3R_Screenshots.pdf")

# Get all PNG files sorted by name
image_files = sorted(screenshots_dir.glob("*.png"))

if not image_files:
    print(f"No PNG files found in {screenshots_dir}")
    exit(1)

print(f"Found {len(image_files)} screenshots")

if USE_REPORTLAB:
    # Use reportlab
    c = canvas.Canvas(str(output_pdf), pagesize=letter)
    
    for i, img_path in enumerate(image_files, 1):
        print(f"Processing {i}/{len(image_files)}: {img_path.name}")
        
        # Open image to get dimensions
        img = Image.open(img_path)
        width, height = img.size
        
        # Set page size to match image
        c.setPageSize((width, height))
        
        # Draw image at full size
        c.drawImage(str(img_path), 0, 0, width=width, height=height)
        
        # Next page
        c.showPage()
    
    c.save()
    print(f"\n✓ PDF created: {output_pdf}")
    print(f"  Pages: {len(image_files)}")

elif USE_IMG2PDF:
    # Use img2pdf
    with open(output_pdf, "wb") as f:
        f.write(img2pdf.convert([str(img) for img in image_files]))
    
    print(f"\n✓ PDF created: {output_pdf}")
    print(f"  Pages: {len(image_files)}")

print(f"  Size: {output_pdf.stat().st_size / 1024 / 1024:.2f} MB")
