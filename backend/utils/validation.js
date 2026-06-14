export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  return passwordRegex.test(password);
}

export function isValidLength(value, maxLength) {
  return value.length <= maxLength;
}

export function isValidURL(url) {
  try {
    const parsed = new URL(url);
    if (["http:", "https:"].includes(parsed.protocol)) return true;
  } catch (error) {
    return false;
  }
}

export function hasValidImageExtension(url) {
  const imageExtensions = /\.(jpg|jpeg|png|webp)$/i;

  if (imageExtensions.test(url)) return true;
  return false;
}
