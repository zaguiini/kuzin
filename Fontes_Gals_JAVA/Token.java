public class Token {
    private int id;
    private String lexeme;
    private int position;
    public int line;

    public Token(int id, String lexeme, int position) {
        this.id = id;
        this.lexeme = lexeme;
        this.position = position;
    }

    public final int getId() {
        return id;
    }

    public final String getLexeme() {
        return lexeme;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line = line;
    }

    public final int getPosition() {
        return position;
    }

    public String toString() {
        return id + " ( " + lexeme + " ) @ " + position;
    };

    public String getClasse() {
        for (int i = 0; i < ScannerConstants.SPECIAL_CASES_VALUES.length; i++) {
            int valor = ScannerConstants.SPECIAL_CASES_VALUES[i];

            // return Integer.toString(id);

            if (valor == id) {
                return ScannerConstants.SPECIAL_CASES_KEYS[i];
            }

            switch (id) {
                case Constants.t_id:
                    return "identificador";
                case Constants.t_c_int:
                    return "palavra reservada";
                case Constants.t_c_float:
                    return "palavra reservada";
                case Constants.t_c_str:
                    return "palavra reservada";
                case Constants.t_int:
                    return "palavra reservada";
                case Constants.t_float:
                    return "palavra reservada";
                case Constants.t_str:
                    return "palavra reservada";
                case Constants.t_TOKEN_24:
                    return "simbolo especial";
                case Constants.t_TOKEN_25:
                    return "simbolo especial";
                case Constants.t_TOKEN_26:
                    return "simbolo especial";
                case Constants.t_TOKEN_27:
                    return "simbolo especial";
                case Constants.t_TOKEN_28:
                    return "simbolo especial";
                case Constants.t_TOKEN_29:
                    return "simbolo especial";
                case Constants.t_TOKEN_30:
                    return "simbolo especial";
                case Constants.t_TOKEN_31:
                    return "simbolo especial";
                case Constants.t_TOKEN_32:
                    return "simbolo especial";
                case Constants.t_TOKEN_33:
                    return "simbolo especial";
                case Constants.t_TOKEN_34:
                    return "simbolo especial";
                case Constants.t_TOKEN_35:
                    return "simbolo especial";
                case Constants.t_TOKEN_36:
                    return "simbolo especial";
                case Constants.t_TOKEN_37:
                    return "simbolo especial";
                case Constants.t_TOKEN_38:
                    return "simbolo especial";
                case Constants.t_TOKEN_39:
                    return "simbolo especial";
                case Constants.t_TOKEN_40:
                    return "simbolo especial";
                case Constants.t_TOKEN_41:
                    return "simbolo especial";
                case Constants.t_TOKEN_42:
                    return "simbolo especial";
            }

        }

        return "";
    }
}
