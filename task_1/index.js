import { encoded, translations } from "./data.js";

// console.log("Let's rock")
// console.log(encoded, translations)

const listNoNeedChange = ["groupId", "service", "formatSize", "ca"];
const listOfUniqueId = new Set();

function task1(encoded, translations) {
  const decoded = [];

  encoded.forEach((el) => {
    const decodedEl = {};
    
    Object.keys(el).forEach((key) => {
      if (listNoNeedChange.includes(key)) {
        decodedEl[key] = el[key];
      } else {
        if (key.match(/id$/i) && el[key] !== null) {
            listOfUniqueId.add(el[key]);
          if (translations[el[key]]) {
            decodedEl[key] = translations[el[key]];
          } else {
            decodedEl[key] = el[key];
          }
        } else {
          decodedEl[key] = el[key];
        }
      }
    });

    decoded.push(decodedEl);
  });

  return decoded
}

const decoded = task1(encoded, translations);

console.log(decoded,listOfUniqueId);
