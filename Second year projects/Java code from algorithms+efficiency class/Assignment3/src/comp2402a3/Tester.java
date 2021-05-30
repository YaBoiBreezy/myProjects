package comp2402a3;

import java.util.Iterator;
import java.util.Random;

public class Tester {

  public static void testShuffle(int n1, int n2) {
    System.out.println( "Test DLLIst Shuffle------");
    DLList<Integer> l = new DLList<Integer>();

    for( int i = 0; i < n1; i++ ) {
      l.add(i, l.size());
    }
    MyList<Integer> other = new DLList<Integer>();

    for( int i = 0; i < n2; i++ ) {
      other.add(i, other.size());
    }

    System.out.printf("List 1: %s\n", l);
    System.out.printf("List 2: %s \n", other );
    MyList<Integer> newL = l.shuffle( other );
    System.out.printf("Shuffle: %s\n", newL );
    System.out.println( "Done Test DLLIst Shuffle------");
  }

  public static void testShrink(int n) {
    System.out.println( "Test DLLIst Shrink------");
    Random rand = new java.util.Random();
    DLList<Integer> l = new DLList<>();
    for( int i=0; i < 3*n; i++ ) {
      l.add(rand.nextInt(n)/2);
    }
    System.out.printf( "Contents before shrink: %s\n", l);
    l.shrink();
    System.out.printf( "Contents after shrink: %s\n", l );

    System.out.println( "Done Test DLLIst Shrink------");
  }

  public static void testDLListChop(int n1, int n2) {
    System.out.println( "Test DLList Chop------");
    DLList<Integer> l = new DLList<Integer>();

    if( n2 > n1 ) {
      n1 = n2;
    }

    for( int i = 0; i < n1; i++ ) {
      l.add(i, l.size());
    }

    System.out.printf( "Before chop(%d): %s\n", n2, l );
    MyList<Integer> newL = l.chop( n2 );
    System.out.printf( "After chop(%d): %s, %s\n", n2, l, newL );
    System.out.println( "Done Test DLList Chop------");
  }

  public static void testReverse(int n) {
    System.out.println( "Test Skiplist Reverse------");
    SkiplistList<Integer> l = new SkiplistList<Integer>();

    for( int i = 0; i < n; i++ ) {
      l.add(i, l.size());
    }
    System.out.printf( "Before reverse: %s\n", l );
    System.out.printf( "size()=%d\n", l.size() );
    for( int i=0; i < l.size(); i++ ) {
      System.out.printf( "get(%d)=%d\n", i, l.get(i) );
    }
    l.reverse();
    System.out.printf( "After reverse: %s\n", l);
    System.out.printf( "size()=%d\n", l.size() );
    for( int i=0; i < l.size(); i++ ) {
      System.out.printf( "get(%d)=%d\n", i, l.get(i) );
    }
    System.out.println( "Done Test Skiplist Reverse------");
  }

  public static void testSkiplistChop(int n1, int n2) {
    System.out.println( "Test Skiplist Chop------");
    SkiplistList<Integer> l = new SkiplistList<Integer>();

    if( n2 > n1 ) {
      n1 = n2;
    }

    for( int i = 0; i < n1; i++ ) {
      l.add(i, l.size());
    }

    System.out.printf( "Before chop(%d): %s\n", n2, l );
    System.out.printf( "size()=%d\n", l.size() );
    for( int i=0; i < l.size(); i++ ) {
      System.out.printf( "get(%d)=%d\n", i, l.get(i) );
    }
    MyList<Integer> newL = l.chop( n2 );
    System.out.printf( "After chop(%d): %s, %s\n", n2, l, newL );
    System.out.printf( "size()=%d\n", l.size() );
    for( int i=0; i < l.size(); i++ ) {
      System.out.printf( "get(%d)=%d\n", i, l.get(i) );
    }
    System.out.println( "Done Test Skiplist Chop------");
  }


  public static void main(String[] args) {
    // TODO: Add your own tests! These are not exhaustive at _all_.
    // Try different numbers, big numbers, small numbers... but
    // also try different types, different orderings, etc.
    // Try to anticipate where your code is weak, and see if you can
    // test those weaknesses and maybe get rid of them.
    testShuffle(10,10);
    testShuffle(10, 5);
    testShuffle(5, 10);

     testShrink(4);/*
    testShrink(7);

    testDLListChop(10, 8);
    testDLListChop(10, 2);

    testReverse(10);
    testReverse(9);

    testSkiplistChop(10, 5);
    testSkiplistChop(10, 10);
    testSkiplistChop(10, 1);
    testSkiplistChop(10, 0);*/

  }
}
