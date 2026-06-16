import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";

dayjs.extend(customParseFormat);

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

export function isValidID(id) {
  // 1
  const numId = Number(id);
  return Number.isInteger(numId) && numId > 0;
}

export function isValidStatus(status) {
  return (
    status === "todo" ||
    status === "in_progress" ||
    status === "done" ||
    !status
  );
}

export function isValidPriority(priority) {
  return priority === "low" || priority === "medium" || priority === "high";
}

export function isValidDueDate(date) {
  return (
    dayjs(date, "YYYY-MM-DD", true).isValid() &&
    !dayjs(date).isBefore(dayjs(), "day")
  );
}

export function isEmpty(value) {
  // Reject null and undefined
  if (value == null) return true;

  // Reject empty strings like "" , '' , ``
  if (typeof value === "string") {
    return value.trim() === "";
  }

  // Reject empty arrays []
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  // Reject empty objects
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  return false;
}
