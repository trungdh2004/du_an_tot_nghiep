import crypto from "crypto";
import slugify from "slugify";

export const generateSlugs = (value: string) => {
  const slug = `${slugify(value, {
    lower: true,
    replacement: "-",
    locale: "vn",
    trim: true,
    remove: /[*+~.()'"!:@]/g,
  })}-${crypto.randomBytes(5).toString("hex")}`;

  return slug;
};

// const slug = `${slugify(value, {
//   lower: true,
//   replacement: "-",
//   locale: "vn",
//   trim: true,
//   remove: /[*+~.()'"!:@]/g,
// })}-${Math.random().toString(36).substring(2, 9)}-${crypto
//   .randomBytes(10)
//   .toString("hex")}`;
