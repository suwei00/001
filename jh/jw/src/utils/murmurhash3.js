export function murmurhash3_32_gc(key, seed) {
  let remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i

  remainder = key.length & 3 // key.length % 4
  bytes = key.length - remainder
  h1 = seed
  c1 = 0xCC9E2D51
  c2 = 0x1B873593
  i = 0

  while (i < bytes) {
    k1
        = ((key.charCodeAt(i) & 0xFF))
        | ((key.charCodeAt(++i) & 0xFF) << 8)
        | ((key.charCodeAt(++i) & 0xFF) << 16)
        | ((key.charCodeAt(++i) & 0xFF) << 24)
    ++i

    k1 = ((((k1 & 0xFFFF) * c1) + ((((k1 >>> 16) * c1) & 0xFFFF) << 16))) & 0xFFFFFFFF
    k1 = (k1 << 15) | (k1 >>> 17)
    k1 = ((((k1 & 0xFFFF) * c2) + ((((k1 >>> 16) * c2) & 0xFFFF) << 16))) & 0xFFFFFFFF

    h1 ^= k1
    h1 = (h1 << 13) | (h1 >>> 19)
    h1b = ((((h1 & 0xFFFF) * 5) + ((((h1 >>> 16) * 5) & 0xFFFF) << 16))) & 0xFFFFFFFF
    h1 = (((h1b & 0xFFFF) + 0x6B64) + ((((h1b >>> 16) + 0xE654) & 0xFFFF) << 16))
  }

  k1 = 0

  switch (remainder) {
    case 3: k1 ^= (key.charCodeAt(i + 2) & 0xFF) << 16
    case 2: k1 ^= (key.charCodeAt(i + 1) & 0xFF) << 8
    case 1: k1 ^= (key.charCodeAt(i) & 0xFF)

      k1 = (((k1 & 0xFFFF) * c1) + ((((k1 >>> 16) * c1) & 0xFFFF) << 16)) & 0xFFFFFFFF
      k1 = (k1 << 15) | (k1 >>> 17)
      k1 = (((k1 & 0xFFFF) * c2) + ((((k1 >>> 16) * c2) & 0xFFFF) << 16)) & 0xFFFFFFFF
      h1 ^= k1
  }

  h1 ^= key.length

  h1 ^= h1 >>> 16
  h1 = (((h1 & 0xFFFF) * 0x85EBCA6B) + ((((h1 >>> 16) * 0x85EBCA6B) & 0xFFFF) << 16)) & 0xFFFFFFFF
  h1 ^= h1 >>> 13
  h1 = ((((h1 & 0xFFFF) * 0xC2B2AE35) + ((((h1 >>> 16) * 0xC2B2AE35) & 0xFFFF) << 16))) & 0xFFFFFFFF
  h1 ^= h1 >>> 16

  return h1 >>> 0
}

