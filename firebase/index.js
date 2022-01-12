import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDI0_Yx3j7txSYZ0AvrC843iVu7dKWg8Hs",
  authDomain: "memories-2-8bfcc.firebaseapp.com",
  projectId: "memories-2-8bfcc",
  storageBucket: "memories-2-8bfcc.appspot.com",
  messagingSenderId: "97195949393",
  appId: "1:97195949393:web:66ce3a3247f282ef686770"
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

