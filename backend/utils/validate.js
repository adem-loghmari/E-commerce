const isNonEmptyString = (v, max = 200) =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max;

const isEmail = (v) =>
  typeof v === "string" && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const isPositiveInt = (v) => Number.isInteger(v) && v > 0;

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = { isNonEmptyString, isEmail, isPositiveInt, escapeRegex };
