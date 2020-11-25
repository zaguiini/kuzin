import { ParserConstants } from './ParserConstants'
import { ScannerConstants } from './ScannerConstants'

export const Constants = {
  ...ScannerConstants,
  ...ParserConstants,
  EPSILON: 0,
  DOLLAR: 1,
  t_id: 2,
  t_c_int: 3,
  t_c_float: 4,
  t_c_str: 5,
  t_int: 6,
  t_float: 7,
  t_str: 8,
  t_and: 9,
  t_or: 10,
  t_not: 11,
  t_if: 12,
  t_elif: 13,
  t_else: 14,
  t_while: 15,
  t_end: 16,
  t_false: 17,
  t_true: 18,
  t_input: 19,
  t_print: 20,
  t_TOKEN_21: 21, //"("
  t_TOKEN_22: 22, //")"
  t_TOKEN_23: 23, //"=="
  t_TOKEN_24: 24, //"!="
  t_TOKEN_25: 25, //"<"
  t_TOKEN_26: 26, //"<="
  t_TOKEN_27: 27, //">"
  t_TOKEN_28: 28, //">="
  t_TOKEN_29: 29, //"+"
  t_TOKEN_30: 30, //"-"
  t_TOKEN_31: 31, //"*"
  t_TOKEN_32: 32, //"/"
  t_TOKEN_33: 33, //"//"
  t_TOKEN_34: 34, //"%"
  t_TOKEN_35: 35, //","
  t_TOKEN_36: 36, //":"
  t_TOKEN_37: 37, //"="
  t_TOKEN_38: 38, //"+="
  t_TOKEN_39: 39, //"-="
}
