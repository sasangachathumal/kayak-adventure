'use client';

export async function watermarkImage(
  file: File,
): Promise<{ blob: Blob; width: number; height: number }> {
  // Ensure custom web fonts (like Permanent Marker) are loaded
  if (typeof document !== 'undefined' && document.fonts) {
    await document.fonts.ready.catch(() => {});
  }

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  // 1. Draw original photo onto canvas
  ctx.drawImage(bitmap, 0, 0);

  // 2. Load the navbar logo icon
  const logoImg = new Image();
  logoImg.crossOrigin = 'anonymous';
  logoImg.src = '/logo-with-no-text.svg';

  await new Promise<void>((resolve) => {
    if (logoImg.complete && logoImg.naturalWidth > 0) {
      resolve();
    } else {
      logoImg.onload = () => resolve();
      logoImg.onerror = () => resolve(); // fallback if failed
    }
  });

  // 3. Proportional sizing based on image dimensions
  const minDim = Math.min(bitmap.width, bitmap.height);
  const baseUnit = Math.max(18, Math.round(minDim * 0.042));
  
  // Badge size and inner icon size (ensuring ~22% clear padding around the icon)
  const badgeDiameter = Math.round(baseUnit * 2.6);
  const badgeRadius = Math.round(badgeDiameter / 2);
  const iconRenderSize = Math.round(badgeDiameter * 0.58);

  const bottomSpacing = Math.round(baseUnit * 1.6);
  const iconTextGap = Math.round(baseUnit * 0.6);

  // Wordmark typography & vertical spacing
  const primaryFontSize = Math.round(badgeDiameter * 0.55);
  const secondaryFontSize = Math.round(primaryFontSize * 0.28);
  const textVerticalSpacing = Math.round(primaryFontSize * 0.35); // Generous gap between KAYAK and ADVENTURE
  const adventureText = 'A D V E N T U R E';

  ctx.save();

  // Measure text to compute exact horizontal center
  ctx.font = `400 ${primaryFontSize}px "Permanent Marker", cursive, sans-serif`;
  const kayakWidth = ctx.measureText('KAYAK').width;

  ctx.font = `700 ${secondaryFontSize}px Inter, system-ui, sans-serif`;
  const adventureWidth = ctx.measureText(adventureText).width;

  const textBlockWidth = Math.max(kayakWidth, adventureWidth);
  const totalWatermarkWidth = badgeDiameter + iconTextGap + textBlockWidth;
  const totalTextHeight = primaryFontSize + textVerticalSpacing + secondaryFontSize;
  const watermarkHeight = Math.max(badgeDiameter, totalTextHeight);

  // Center horizontally on the X-axis, place at the bottom with spacing on Y-axis
  const startX = Math.round((bitmap.width - totalWatermarkWidth) / 2);
  const startY = Math.round(bitmap.height - bottomSpacing - watermarkHeight);

  const badgeCenterX = startX + badgeRadius;
  const badgeCenterY = startY + Math.round(watermarkHeight / 2);

  // Draw White Background Circle with real padding around the icon
  ctx.beginPath();
  ctx.arc(badgeCenterX, badgeCenterY, badgeRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = Math.max(6, Math.round(baseUnit * 0.3));
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  ctx.fill();

  // Draw Logo Icon centered inside the white badge with ample padding
  if (logoImg.complete && logoImg.naturalWidth > 0) {
    const iconDrawX = Math.round(badgeCenterX - iconRenderSize / 2);
    const iconDrawY = Math.round(badgeCenterY - iconRenderSize / 2);
    ctx.drawImage(logoImg, iconDrawX, iconDrawY, iconRenderSize, iconRenderSize);
  }

  // Text block starting position
  const textStartX = startX + badgeDiameter + iconTextGap;
  const textStartY = startY + Math.round((watermarkHeight - totalTextHeight) / 2);

  // Shadow styling for the wordmark text
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = Math.max(6, Math.round(baseUnit * 0.35));
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;

  // 2. Draw "KAYAK" in Permanent Marker font (matching Navbar)
  ctx.globalAlpha = 0.98;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `400 ${primaryFontSize}px "Permanent Marker", cursive, sans-serif`;
  ctx.fillText('KAYAK', textStartX, textStartY);

  // 3. Draw "A D V E N T U R E" with clear vertical spacing below "KAYAK"
  const adventureY = textStartY + primaryFontSize + textVerticalSpacing;
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${secondaryFontSize}px Inter, system-ui, sans-serif`;
  ctx.fillText(adventureText, textStartX, adventureY);

  ctx.restore();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) {
          resolve(b);
        } else {
          reject(new Error('Canvas blob failed'));
        }
      },
      'image/webp',
      0.92,
    );
  });

  return { blob, width: bitmap.width, height: bitmap.height };
}
