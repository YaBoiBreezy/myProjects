package comp2402a3;
// Thanks to Pat Morin for this file!

import java.util.HashSet; // Import the HashSet class

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import java.util.Iterator;
import java.util.concurrent.ConcurrentSkipListSet;

public class Part1 {
	
	/**
	 * Your code goes here - see Part0 for an example
   * @param x the number of lines to read in
	 * @param r the reader to read from
	 * @param w the writer to write to
	 * @throws IOException
	 */
	public static void doIt(int x, BufferedReader r, PrintWriter w)
            throws IOException {if (x==0){return;}
     ConcurrentSkipListSet<String> items = new ConcurrentSkipListSet<String>();

      String []list=new String [x];
      int numInputs=0;

      for(String line = r.readLine(); line != null; line = r.readLine()){
        if(!items.contains(line)){
          if(list[numInputs%x]!=null){items.remove(list[numInputs%x]);}
          list[numInputs%x]=line;
          items.add(line);
          numInputs++;
        }
      }

      /*String temp;
      for(int i=0; i < x; i++){
        for(int j=1; j < (x-i); j++){
          if(list[i].compareTo(list[j]) > 0){
            temp = list[j-1];
            list[j-1] = list[j];
            list[j] = temp;
          }
        }
      }*/

      /*x=Math.min(numInputs,x);
      items.iterator();
      for(int y=0;y<x;y++) {
        w.println(items.iterator().next());
      }*/

      Iterator<String> itr = items.iterator();

      while (itr.hasNext()) {
        w.println(itr.next());
      }




            /*HashSet<String> items = new HashSet<String>();
      String []list=new String [x];
      int numInputs=0;

      for(String line = r.readLine(); line != null; line = r.readLine()){
        if(!items.contains(line)){
          items.remove(list[numInputs%x]);
          list[numInputs%x]=line;
          items.add(line);
          numInputs++;
        }
      }

      String temp;
      for(int i=0; i < x; i++){
        for(int j=1; j < (x-i); j++){
          if(list[i].compareTo(list[j]) > 0){
            temp = list[j-1];
            list[j-1] = list[j];
            list[j] = temp;
          }
        }
      }

      x=Math.min(numInputs,x);
      for(int y=0;y<x;y++) {
        w.println(list[y]);
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
