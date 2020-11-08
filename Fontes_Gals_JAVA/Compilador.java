import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Compilador {
    public static String lerArquivo() {
        StringBuilder data = new StringBuilder();
        try {
            File myObj = new File(
                    "F:/Google Drive/FURB/FURB/4 - Semestre/Compiladores/kuzin/Fontes_Gals_JAVA/programa.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                data.append(myReader.nextLine());
                data.append("\n");
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

        return data.toString();
    }

    public static void main(String[] args) {
        ArrayList<Token> tokens = new ArrayList<>();
        String codigoFonte = Compilador.lerArquivo();

        Lexico lexico = new Lexico(codigoFonte);

        try {
            Token token = lexico.nextToken();

            while (token != null) {
                String parcial = codigoFonte.substring(0, token.getPosition());
                int linhaAtual = (parcial.length() - parcial.replace("\n", "").length()) + 1;

                token.setLine(linhaAtual);
                tokens.add(token);

                token = lexico.nextToken();
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        System.out.printf("%-7s %-20s %-10s\n", "linha", "classe", "lexema");

        for (Token token : tokens) {
            System.out.printf("%-7s %-20s %-10s\n", token.getLine(), token.getClasse(), token.getLexeme());
        }
    }
}
