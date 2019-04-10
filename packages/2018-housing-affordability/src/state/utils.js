// Adapted from the django implementation:
// https://docs.djangoproject.com/en/2.0/_modules/django/utils/text/#slugify
export const slugify = str =>
  str
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, "-");

export const spaceEncode = str =>
  str
    .replace(/[^\w\s-+]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "+");

export const HOST = "http://service.civicpdx.org/housing-affordability";

export const echo = a => a;
