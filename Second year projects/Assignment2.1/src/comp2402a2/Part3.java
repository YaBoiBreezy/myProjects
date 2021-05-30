package comp2402a2;
// Thanks to Pat Morin for this file!

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;
import java.util.ArrayList;

public class Part3 {
	
	/**
	 * Your code goes here - see Part0 for an example
   * @param x the number of lines to read in
	 * @param r the reader to read from
	 * @param w the writer to write to
	 * @throws IOException
	 */
	public static void doIt(int x, BufferedReader r, PrintWriter w) 
      throws IOException {
		String []list=new String [x+1];
		int numInputs=0;
		while(true){
			list[numInputs%(x+1)]=r.readLine();
			if(list[numInputs%(x+1)]==null){
				break;
			}
			numInputs++;
		}
		if(numInputs>x){
			for(int y=numInputs-1;y>numInputs-x-1;y--) {
				w.println(list[y%(x+1)]);
			}
		}
		else{
			for(int y=numInputs-1;y>=0;y--){
				w.println(list[y]);
			}
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
