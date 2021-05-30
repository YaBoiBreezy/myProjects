package comp2402a3;
// Thanks to Pat Morin for this file!

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.HashSet;

public class Part2 {
  public static String getBiggest(String[] list,int x){
    String biggest=list[0];
    for(int y=1;y<x;y++){
      if(list[y].compareTo(biggest)>0){
        biggest=list[y];
      }
    }
    return biggest;
  }
	/**
	 * Your code goes here - see Part0 for an example
   * @param x the number of lines to read in
	 * @param r the reader to read from
	 * @param w the writer to write to
	 * @throws IOException
	 */

	public static void doIt(int x, BufferedReader r, PrintWriter w)
            throws IOException {if(x==0){for(String line = r.readLine(); line != null; line = r.readLine()){w.println(line);}return;}
      String []list=new String [x];
      int numInputs=0;
      String line;

      for(;numInputs<x-1;numInputs++){
        line=r.readLine();
        if(line==null){return;}
        list[numInputs%x]=line;
      }
        //supposed to use sorted set.... maybe 2 data types together.
      String biggest=list[0];
      for(int y=1;y<x-1;y++){
        if(list[y].compareTo(biggest)>0){
          biggest=list[y];
        }
      }

      for(line = r.readLine(); line != null; line = r.readLine()){
          if(biggest.equals(list[numInputs%x])){
            list[numInputs%x]=line;
            biggest=getBiggest(list,x);
          }
          else{
            list[numInputs%x]=line;
          }

          if(line.compareTo(biggest)>=0){
            w.println(line);
            biggest=line;
          }
          numInputs++;
      }
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
