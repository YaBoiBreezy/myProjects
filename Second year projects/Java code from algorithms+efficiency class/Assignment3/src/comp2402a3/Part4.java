package comp2402a3;
// Thanks to Pat Morin for the skeleton of this file!

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentSkipListSet;
public class Part4 {
	
	/**
	 * Your code goes here - see Part0 for an example
	 * @param r the reader to read from
	 * @param w the writer to write to
	 * @throws IOException
	 */
	public static void doIt(BufferedReader r, PrintWriter w) 
      throws IOException {
        TreeMap list = new TreeMap();

        for(String line = r.readLine(); line != null; line = r.readLine()){
            String key=String.valueOf(list.higherKey(line));
            if((key!=null && key.startsWith(line)) || list.containsKey(line)){
                w.println(line);
            }
            else{
                for(int x=line.length()-1;x>=0;x--){
                    key=String.valueOf(list.higherKey(line));
                    if((key==null || !key.startsWith(line))){// && !list.contains(line)
                        list.put(line,null);
                    }
                    line=line.substring(1,line.length());
                }
            }
        }




	    /*ConcurrentSkipListSet<String> list = new ConcurrentSkipListSet<String>();

        for(String line = r.readLine(); line != null; line = r.readLine()){
            String key=list.higher(line);
            if((key!=null && key.startsWith(line)) || list.contains(line)){
                w.println(line);
            }
            else{
                for(int x=line.length()-1;x>=0;x--){
                    key=list.higher(line);
                    if((key==null || !key.startsWith(line))){// && !list.contains(line)
                        list.add(line);
                        System.out.println(line);
                    }
                    line=line.substring(1,line.length());
                }
            }
        }*/

        /*ConcurrentSkipListSet<String> list = new ConcurrentSkipListSet<String>();

        for(String line = r.readLine(); line != null; line = r.readLine()){
            String key=list.higher(line);
            //System.out.println(line+"  "+key);
            if((key!=null && key.startsWith(line)) || list.contains(line)){
                w.println(line);
                //System.out.println("NEW THING");
            }
            else{
                for(int x=line.length()-1;x>=0;x--){
                    list.add(line);
                    line=line.substring(1,line.length());
                }
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
