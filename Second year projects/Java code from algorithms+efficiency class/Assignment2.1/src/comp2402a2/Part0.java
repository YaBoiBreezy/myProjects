package comp2402a2;
// Thanks to Pat Morin for the base of this file!

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;
import java.util.ArrayList;
import java.util.Iterator;

public class Part0 {

  /**
   * Read x lines one at a time from r.  After reading x lines, output
   * the lines to w.  
   * @param x the number of lines to read in
   * @param r the reader to read from
   * @param w the writer to write to
   * @throws IOException
   */
  public static void doIt(int x, BufferedReader r, PrintWriter w) 
      throws IOException {
      List<String> l = new ArrayList<>();

      // This is just a template, if that is helpful for you
      // This just reads in the first x lines from r
      // then prints those lines out in the order they were read.
      for (int i=0; i < x; i++) {
        String line = r.readLine();
        if( line != null ) {
          l.add(line);
        } else {
          break;
        }
      }

      for (String text : l) {
        w.println(text);
      }
  }

  /**
   * The driver.  Open a BufferedReader and a PrintWriter, either from System.in
   * and System.out or from filenames specified on the command line, then cl doIt on the first argument.
   * @param args
   */
  public static void main(String[] args) {
    try {
      BufferedReader r;
      PrintWriter w;
      int x;
      if (args.length == 0) {
        x = 3;
        r = new BufferedReader(new InputStreamReader(System.in));
        w = new PrintWriter(System.out);
      } else if( args.length == 1) {
        x = Integer.parseInt(args[0]); 
        r = new BufferedReader(new InputStreamReader(System.in));
        w = new PrintWriter(System.out);
      } else if (args.length == 2) {
        x = Integer.parseInt(args[0]); 
        r = new BufferedReader(new FileReader(args[1]));
        w = new PrintWriter(System.out);				
      } else {
        x = Integer.parseInt(args[0]); 
        r = new BufferedReader(new FileReader(args[1]));
        w = new PrintWriter(new FileWriter(args[2]));
      }
      long start = System.nanoTime();
      doIt(x, r, w);
      w.flush();
      long stop = System.nanoTime();
      System.out.println("Execution time: " + 1e-9 * (stop-start));
    } catch (IOException e) {
      System.err.println(e);
      System.exit(-1);
    }
  }
}
