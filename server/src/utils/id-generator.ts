import { v4 as uuidv4 } from "uuid";

// Generate a unique id
// Generate a unique id for registration process
export const generateId = () => uuidv4();

// Generate a key for redis cached data according to process type
export const generateRedisKey = (type: string, processId: string): string => {
  let key = `-${processId}`;
  let prefix = "RV";
  switch (type) {
    case "register-verification":
      prefix = "RV";
      break;
    case "forget-password":
      prefix = "FP";
      break;
  }
  return `${prefix}${key}`;
};
