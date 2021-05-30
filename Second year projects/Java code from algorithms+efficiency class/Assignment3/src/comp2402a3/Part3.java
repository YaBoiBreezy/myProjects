package comp2402a3;
// Thanks to Pat Morin for the skeleton of this file!


import java.io.BufferedReader;
import java.io.FileReader;
import java.util.*;
import java.lang.Object;
import java.lang.String;
import java.util.AbstractMap;
import java.util.HashSet;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;


/**
 *
 * @author morin
 * @author sharp
 * 
 */
public class Part3 {            //handle empty string (pritn unless first)

	/**
	 * @param r the reader to read from
	 * @param w the writer to write to
	 * @throws IOException
	 */
	public static void doIt(BufferedReader r, PrintWriter w) throws IOException {
        TreeMap tm = new TreeMap();

        for(String line = r.readLine(); line != null; line = r.readLine()){
            String key=String.valueOf(tm.higherKey(line));
            //System.out.println(line+"  "+key);
            if((key!=null && key.startsWith(line)) || tm.containsKey(line)){
               w.println(line);
                //System.out.println("NEW THING");
            }
            else{
                tm.put(line,null);
            }
        }

       // tm.lowerKey("hi");

     //           subMap(K fromKey, K toKey)
    //    Returns a view of the portion of this map whose keys range from fromKey, inclusive, to toKey, exclusive.





	    /*HashSet<String> items = new HashSet<String>();
        String subLine;
        boolean found;
        for(String line = r.readLine(); line != null; line = r.readLine()){
            subLine=line;
            found=false;
            for(int x=0;x<line.length();x++){
                if (items.contains(subLine)){
                    w.println(line);
                    found=true;
                }
                subLine=subLine.substring(1);
            }
            if (!found){
                items.add(line);
            }
        }*/
	}

  /**
   * The driver.  Open a BufferedReader and a PrintWriter, either from System.in
   * and System.out or from filenames specified on the command line, then call doIt.
   * @param args
   */
  public static void main(String[] args) {
    try {
      BufferedReader r;
      PrintWriter w;
      if (args.length == 0) {
        r = new BufferedReader(new InputStreamReader(System.in));
        w = new PrintWriter(System.out);
      } else if (args.length == 1) {
        r = new BufferedReader(new FileReader(args[0]));
        w = new PrintWriter(System.out);				
      } else {
        r = new BufferedReader(new FileReader(args[0]));
        w = new PrintWriter(new FileWriter(args[1]));
      }
      long start = System.nanoTime();
      doIt(r, w);
      w.flush();
      long stop = System.nanoTime();
      System.out.println("Execution time: " + 1e-9 * (stop-start));
    } catch (IOException e) {
      System.err.println(e);
      System.exit(-1);
    }
  }
}
