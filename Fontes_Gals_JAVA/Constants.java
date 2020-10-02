public interface Constants extends ScannerConstants {
    int EPSILON = 0;
    int DOLLAR = 1;

    int t_id = 2; // IDENTIFICADOR
    // Palavras reservadas
    int t_c_int = 3;
    int t_c_float = 4;
    int t_c_str = 5;
    // Palavras reservadas fim
    // Special Cases
    int t_and = 6;
    int t_or = 7;
    int t_not = 8;
    int t_if = 9;
    int t_elif = 10;
    int t_else = 11;
    int t_for = 12;
    int t_in = 13;
    int t_range = 14;
    int t_while = 15;
    int t_end = 16;
    int t_false = 17;
    int t_true = 18;
    int t_input = 19;
    // Special Cases fim
    // Palavras reservadas
    int t_int = 20;
    int t_float = 21;
    int t_str = 22;
    // Palavras reservadas fim
    int t_print = 23; // Special Case
    // Símbolos Especiais
    int t_TOKEN_24 = 24; // "("
    int t_TOKEN_25 = 25; // ")"
    int t_TOKEN_26 = 26; // "=="
    int t_TOKEN_27 = 27; // "!="
    int t_TOKEN_28 = 28; // "<"
    int t_TOKEN_29 = 29; // "<="
    int t_TOKEN_30 = 30; // ">"
    int t_TOKEN_31 = 31; // ">="
    int t_TOKEN_32 = 32; // "+"
    int t_TOKEN_33 = 33; // "-"
    int t_TOKEN_34 = 34; // "*"
    int t_TOKEN_35 = 35; // "/"
    int t_TOKEN_36 = 36; // "//"
    int t_TOKEN_37 = 37; // "%"
    int t_TOKEN_38 = 38; // ","
    int t_TOKEN_39 = 39; // ":"
    int t_TOKEN_40 = 40; // "="
    int t_TOKEN_41 = 41; // "+="
    int t_TOKEN_42 = 42; // "-="
    // Símbolos Especiais fim
}