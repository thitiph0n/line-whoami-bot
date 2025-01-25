export const createHmacSHA256 = async (
  key: string,
  data: string
): Promise<string> => {
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(key);
  const dataBuffer = encoder.encode(data);

  // Import the key for HMAC operations
  const cryptoKey = await crypto.subtle.importKey(
    "raw", // Key format
    keyBuffer, // Key data
    { name: "HMAC", hash: { name: "SHA-256" } }, // Algorithm
    false, // Whether the key is extractable
    ["sign"] // Key usage
  );

  // Generate the HMAC signature
  const signature = await crypto.subtle.sign(
    "HMAC", // Algorithm
    cryptoKey, // Key
    dataBuffer // Data to sign
  );

  // Convert the signature to a base64 string
  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureBase64 = btoa(String.fromCharCode.apply(null, signatureArray));
  return signatureBase64;
};
