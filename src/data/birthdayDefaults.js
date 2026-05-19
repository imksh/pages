export const birthdayFallbackPageData = {
  id: "default",
  recipientName: "Bestie",
  senderName: "Your Friend",
  relation: "someone special",
  occasion: "Birthday",
  theme: "midnight",
  tone: "Warm & heartfelt",
  message:
    "No matter how many birthdays come and go, I just hope you always stay happy, keep smiling and achieve everything you dream of ✨",
  extraNote:
    "Thank you for being such a beautiful part of life. Today is all about you.",
  date: "",
  time: "",
  location: "",
  music: "A soft celebration soundtrack",
  coverImage: "",
  images: [],
  isDefault: true,
};

export const normalizeBirthdayPageData = (data = {}) => {
  const rawImages = Array.isArray(data.images)
    ? data.images
    : Array.isArray(data.photos)
      ? data.photos
      : Array.isArray(data.photoUrls)
        ? data.photoUrls
        : [];

  const images = rawImages
    .map((image) => {
      if (typeof image === "string") {
        return image;
      }

      return (
        image?.url ||
        image?.src ||
        image?.path ||
        image?.imageUrl ||
        image?.preview ||
        ""
      );
    })
    .filter(Boolean);

  const recipientName =
    data.recipientName || data.name || birthdayFallbackPageData.recipientName;
  const senderName =
    data.senderName || data.sender || birthdayFallbackPageData.senderName;

  return {
    ...birthdayFallbackPageData,
    ...data,
    recipientName,
    name: recipientName,
    senderName,
    sender: senderName,
    relation: data.relation || birthdayFallbackPageData.relation,
    occasion: data.occasion || birthdayFallbackPageData.occasion,
    theme: data.theme || birthdayFallbackPageData.theme,
    tone: data.tone || birthdayFallbackPageData.tone,
    message: data.message || data.wish || birthdayFallbackPageData.message,
    extraNote:
      data.extraNote || data.note || birthdayFallbackPageData.extraNote,
    date: data.date || birthdayFallbackPageData.date,
    time: data.time || birthdayFallbackPageData.time,
    location: data.location || birthdayFallbackPageData.location,
    music: data.music || birthdayFallbackPageData.music,
    coverImage:
      data.coverImage ||
      data.avatarUrl ||
      images[0] ||
      birthdayFallbackPageData.coverImage,
    images,
    isDefault:
      Boolean(data.isDefault) || data.id === birthdayFallbackPageData.id,
  };
};
