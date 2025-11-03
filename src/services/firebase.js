// src/services/firebase.js
// Proxy que re-exporta TODO desde '@/firebase' (tu config real)
export {
  db,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc
} from '@/firebase';