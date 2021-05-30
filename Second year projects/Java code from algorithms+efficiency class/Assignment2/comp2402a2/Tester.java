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

    Random rand = new Random();
    for( int i = 0; i < n; i++ ) {
      int x = rand.nextInt(3*n/2);
      if( rand.nextBoolean() ) {
        System.out.println( "addFirst(" + x + ")");
        md.addFirst(x);
      } else {
        System.out.println( "addLast(" + x + ")");
        md.addLast(x);
      }
      System.out.println( md );
    }

    while( md.size() > 0 ) {
      System.out.println( "size() = " + md.size() );
      if( rand.nextBoolean() ) {
        System.out.println( "removeFirst() = " + md.removeFirst());
      } else {
        System.out.println( "removeLast() = " + md.removeLast());
      }
    }

    System.out.println( "Done Test myDeque------");
  }

  public static void main(String[] args) {
    myStackTest(10);
    myDequeTest(10);
  }
}
