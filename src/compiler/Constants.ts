import { ScannerConstants } from "./ScannerConstants";

export class Constants extends ScannerConstants {
    static EPSILON = 0;
    static DOLLAR = 1;

    static t_id = 2; // IDENTIFICADOR
    // Palavras reservadas
    static t_c_int = 3;
    static t_c_float = 4;
    static t_c_str = 5;
    // Palavras reservadas fim
    // Special Cases
    static t_and = 6;
    static t_or = 7;
    static t_not = 8;
    static t_if = 9;
    static t_elif = 10;
    static t_else = 11;
    static t_for = 12;
    static t_in = 13;
    static t_range = 14;
    static t_while = 15;
    static t_end = 16;
    static t_false = 17;
    static t_true = 18;
    static t_input = 19;
    // Special Cases fim
    // Palavras reservadas
    static t_int = 20;
    static t_float = 21;
    static t_str = 22;
    // Palavras reservadas fim
    static t_print = 23; // Special Case
    // Símbolos Especiais
    static t_TOKEN_24 = 24; // "("
    static t_TOKEN_25 = 25; // ")"
    static t_TOKEN_26 = 26; // "=="
    static t_TOKEN_27 = 27; // "!="
    static t_TOKEN_28 = 28; // "<"
    static t_TOKEN_29 = 29; // "<="
    static t_TOKEN_30 = 30; // ">"
    static t_TOKEN_31 = 31; // ">="
    static t_TOKEN_32 = 32; // "+"
    static t_TOKEN_33 = 33; // "-"
    static t_TOKEN_34 = 34; // "*"
    static t_TOKEN_35 = 35; // "/"
    static t_TOKEN_36 = 36; // "//"
    static t_TOKEN_37 = 37; // "%"
    static t_TOKEN_38 = 38; // ","
    static t_TOKEN_39 = 39; // ":"
    static t_TOKEN_40 = 40; // "="
    static t_TOKEN_41 = 41; // "+="
    static t_TOKEN_42 = 42; // "-="
    // Símbolos Especiais fim

}