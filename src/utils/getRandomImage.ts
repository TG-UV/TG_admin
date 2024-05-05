function getImage(urls: string[]): string {
  const index: number = Math.floor(Math.random() * urls.length);
  return urls[index];
}

const lightImagesUrls: string[] = [
  'https://images.unsplash.com/photo-1515256722043-0f2b082ddadc?q=80&w=1451&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=1374&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520052205864-92d242b3a76b?q=80&w=1469&auto=format&fit=crop',
];

const darkImagesUrls: string[] = [
  'https://images.unsplash.com/photo-1492573637402-25691cd9eac2?q=80&w=1470&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560324212-d10118dbd8cc?q=80&w=1527&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1546964372-c96876b9dc95?q=80&w=1471&auto=format&fit=crop',
];

function getRandomImage(mode: string): string {
  if (mode === 'light') {
    return getImage(lightImagesUrls);
  } else {
    return getImage(darkImagesUrls);
  }
}

export default getRandomImage;
