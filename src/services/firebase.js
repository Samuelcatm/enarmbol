// src/services/firebase.js
// → Proxy limpio que VideosPage ya conoce
export {
  db,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from '@/firebase';
