

import { v4 } from 'uuid';
/**
 * 임시 변환 코드
 * @param number 
 * @returns 
 */
export function nanoId(number?) {
  return v4();
}


/**
 * 2023.08.16
 * Node 16 버전에서 crypto undefined Error 발견하여 임시 주석
 */
// export function nanoId(t = 21) {
//   crypto
//     .getRandomValues(new Uint8Array(t))
//     .reduce(
//       (t, e) =>
//         (t +=
//           (e &= 63) < 36
//             ? e.toString(36)
//             : e < 62
//             ? (e - 26).toString(36).toUpperCase()
//             : e > 62
//             ? '-'
//             : '_'),
//       '',
//     );
// }
