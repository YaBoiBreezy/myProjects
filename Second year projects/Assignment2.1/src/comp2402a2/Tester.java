package comp2402a2;

import java.util.Random;

public class Tester {

  public static void myStackTest(int n) {
    System.out.println( "Test myStack------");
    MyStack<Integer> ms = new MyFastStack<Integer>();


    Random rand = new Random();
    for( int i = 0; i < n; i++ ) {
      int x = rand.nextInt(3*n/2);
      System.out.println("push(" + x + ")");
      ms.push(x);
      System.out.println( ms );
    }
    while( ms.size() > 0 ) {
      System.out.println( "size() = " + ms.size() );
      System.out.println( "pop() = " + ms.pop() );
    }
    System.out.println( "Done Test myStack------");
  }

  public static void myDequeTest(int n) {
    System.out.println( "Test myDeque------");
    MyDeque<Integer> md = new MyFastDeque<Integer>();
    for(int x=0;x<1001;x++){
      md.addFirst(5);
    }
    System.out.println(md.size());
    md.ts();
    md.addFirst(5);md.ts();
    md.addLast(6);md.ts();
    md.addFirst(8);md.ts();
    md.addFirst(3);md.ts();
    md.removeLast();md.ts();
    md.removeLast();md.ts();
    md.removeLast();md.ts();
    md.removeLast();md.ts();
    //============================
    md.addFirst(5);md.ts();
    md.addLast(5);md.ts();
    md.addFirst(5);md.ts();
    md.addLast(6);md.ts();
    md.addFirst(5);md.ts();
    md.removeLast();md.ts();
    md.removeLast();md.ts();
    md.addFirst(null);md.ts();
    md.addFirst(5);md.ts();
    md.addFirst(null);md.ts();
    md.addFirst(null);md.ts();
    md.addLast(null);md.ts();
    System.out.println( "Done Test myDeque------");
  }

  public static void main(String[] args) {
    //myStackTest(10);
    myDequeTest(10);
  }
}
