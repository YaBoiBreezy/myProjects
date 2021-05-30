package comp2402a3;
// Thanks to Pat Morin and ods for the skeleton of this file.

import java.lang.reflect.Array;
import java.lang.IllegalStateException;
import java.util.Arrays;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Random;


/**
 * Implements the List interface as a skiplist so that all the
 * standard operations take O(log n) time
 * 
 * @author morin
 * @author sharp
 *
 * @param <T>
 */
public class SkiplistList<T> implements MyList<T> {
	class Node {
		T x;
		Node[] next;
		int[] length;
		@SuppressWarnings("unchecked")
		public Node(T ix, int h) {
			x = ix;
			next = (Node[])Array.newInstance(Node.class, h+1);
			length = new int[h+1];
		}
		public int height() {
			return next.length - 1;
		}
	}
	
	/**
	 * This node sits on the left side of the skiplist
	 */
	protected Node sentinel;
	
	/**
	 * The maximum height of any element
	 */
	int h;
	
	/**
	 * The number of elements stored in the skiplist
	 */
	int n;
	
	/**
	 * A source of random numbers
	 */
	Random rand;
	
	public SkiplistList() {
		n = 0;
		sentinel = new Node(null, 32);
		h = 0;
		rand = new Random(0);
	}
	
	/**
	 * Find the node that precedes list index i in the skiplist.
	 * 
	 * @param i - the value to search for                                   //changed x to i
	 * @return the predecessor of the node at index i or the final
	 * node if i exceeds size() - 1.
	 */
	protected Node findPred(int i) {
		Node u = sentinel;
		int r = h;
		int j = -1;   // index of the current node in list 0
		while (r >= 0) {
			while (u.next[r] != null && j + u.length[r] < i) {
				j += u.length[r];
				u = u.next[r];
			}
			r--;
		}
		return u;
	}

	public T get(int i) {
		if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
		return findPred(i).next[0].x;
	}

	public T set(int i, T x) {
		if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
		Node u = findPred(i).next[0];
		T y = u.x;
		u.x = x;
		return y;
	}

  public void reverse() {
   /* n=numElements
    findPred=node before node at pos i
    get(i)=node at pos i
    set(index, new value);
    add(index,newNode);
    remove(int i);*/
   T holder;
   Node first=findPred(1);
   Node last=findPred(n);
   for(int x=0;x<n/2;x++){
        holder=first.x;
        first.x=last.x;
        last.x=holder;
        first=first.next[0];
        last=findPred(size()-x-1);
   }

   //if this is too slow, just copy everything into a new list somehow
      //deleting nodes as you go
  }

  public MyList<T> chop( int i ) {
    SkiplistList<T> other = new SkiplistList<T>();
    //Iterator<T> it = this.iterator();
    Node old=findPred(i);
    Node spot=old.next[0];
    int oldSize=size();

    for(int x=i;x<oldSize;x++){
        other.add(other.size(),spot.x);
        spot=spot.next[0];
        remove(i);
    }

   // remove all after i from this

    return other;
  }


  /**
   * Insert a new node into the skiplist
   * @param i the index of the new node
   * @param w the node to insert
   * @return the node u that precedes v in the skiplist
   */
  protected Node add(int i, Node w) {
    Node u = sentinel;
    int k = w.height();
    int r = h;
    int j = -1; // index of u
    while (r >= 0) {
      while (u.next[r] != null && j+u.length[r] < i) {
        j += u.length[r];
        u = u.next[r];
      }
      u.length[r]++; // accounts for new node in list 0
      if (r <= k) {
        w.next[r] = u.next[r];
        u.next[r] = w;
        w.length[r] = u.length[r] - (i - j);
        u.length[r] = i - j;
      }
      r--;
    }
    n++;
    return u;
  }

  /**
   * Simulate repeatedly tossing a coin until it comes up tails.
   * Note, this code will never generate a height greater than 32
   * @return the number of coin tosses - 1
   */
  protected int pickHeight() {
    int z = rand.nextInt();
    int k = 0;
    int m = 1;
    while ((z & m) != 0) {
      k++;
      m <<= 1;
    }
    return k;
  }

  public void add(int i, T x) {
    if (i < 0 || i > n) throw new IndexOutOfBoundsException();
    Node w = new Node(x, pickHeight());
    if (w.height() > h) 
      h = w.height();
    add(i, w);
  }

  public T remove(int i) {
    if (i < 0 || i > n-1) throw new IndexOutOfBoundsException();
    T x = null;
    Node u = sentinel;
    int r = h;
    int j = -1; // index of node u
    while (r >= 0) {
      while (u.next[r] != null && j+u.length[r] < i) {
        j += u.length[r];
        u = u.next[r];
      }
      u.length[r]--;  // for the node we are removing
      if (j + u.length[r] + 1 == i && u.next[r] != null) {
        x = u.next[r].x;
        u.length[r] += u.next[r].length[r];
        u.next[r] = u.next[r].next[r];
        if (u == sentinel && u.next[r] == null)
          h--;
      }
      r--;
    }
    n--;
    return x;
  }

  public Iterator<T> iterator() {
    class SkiplistIterator implements Iterator<T> {
      Node u;
      int i;
      boolean removable;
      public SkiplistIterator() {
        u = sentinel;
        i = -1;
        removable = false;
      }
      public boolean hasNext() {
        return u.next[0] != null;
      }
      public T next() {
        if (u.next[0] == null)
          throw new NoSuchElementException();
        u = u.next[0];
        i++;
        removable = true;
        return u.x;
      }
      public void remove() {
        if (!removable)
          throw new IllegalStateException();
        SkiplistList.this.remove(i);
        i--;
        removable = false;
      }
    }
    return new SkiplistIterator();
  }

  public void clear() {
    n = 0;
    h = 0;
    Arrays.fill(sentinel.length, 0);
    Arrays.fill(sentinel.next, null);
  }

  public int size() {
    return n;
  }

  public String toString() {
    StringBuilder retStr = new StringBuilder();
    retStr.append("[");
    Node u = sentinel.next[0];
    while( u != null ) {
      retStr.append(u.x);
      u = u.next[0];
      if( u != null ) {
        retStr.append(", ");
      }
    }
    retStr.append("]");
    return retStr.toString();
  }
    public MyList<T> shuffle(MyList<T> other ) { MyList<T> merged = new SkiplistList<T>();return merged; }
    public void shrink() {}
}
