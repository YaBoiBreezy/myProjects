package comp2402a3;
// Thanks to Pat Morin for the skeleton of this file.

import java.util.ListIterator;
import java.util.Random;

/**
 * An implementation of the List interface as a doubly-linked circular list. A
 * dummy node is used to simplify the code.
 * 
 * @author morin
 * @author sharp
 * 
 * @param <T>
 *            the type of elements stored in the list
 */
public class DLList<T> implements MyList<T> {
	class Node {
		T x;
		Node prev, next;
	}
	
	/**
	 * Number of nodes in the list
	 */
	int n;

	/**
	 * The dummy node. We use the convention that dummy.next = first and
	 * dummy.prev = last
	 */
	protected Node dummy;

	public DLList() {
		dummy = new Node();
		dummy.next = dummy;
		dummy.prev = dummy;
		n = 0;
	}

	/**
	 * Add a new node containing x before the node p
	 * 
	 * @param w
	 *            the node to insert the new node before
	 * @param x
	 *            the value to store in the new node
	 * @return the newly created and inserted node
	 */
	protected Node addBefore(Node w, T x) {
		Node u = new Node();
		u.x = x;
		u.prev = w.prev;
		u.next = w;
		u.next.prev = u;
		u.prev.next = u;
		n++;
		return u;
	}


	/**
	 * Remove the node p from the list
	 * 
	 * @param w
	 *            the node to remove
	 */
	protected void remove(Node w) {
		w.prev.next = w.next;
		w.next.prev = w.prev;
		n--;
	}

	/**
	 * Get the i'th node in the list
	 * 
	 * @param i
	 *            the index of the node to get
	 * @return the node with index i
	 */
	protected Node getNode(int i) {
		Node p = null;
		if (i < n / 2) {
			p = dummy.next;
			for (int j = 0; j < i; j++)
				p = p.next;
		} else {
			p = dummy;
			for (int j = n; j > i; j--)
				p = p.prev;
		}
		return p;
	}

	public int size() {
		return n;
	}
	public Node getNode(){return dummy.next;}

	public boolean add(T x) {
		addBefore(dummy, x);
		return true;
	}

	public T remove(int i) {
		if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
		Node w = getNode(i);
		remove(w);
		return w.x;
	}

	public void add(int i, T x) {
		if (i < 0 || i > n) throw new IndexOutOfBoundsException();
		addBefore(getNode(i), x);
	}

	public T get(int i) {
		if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
		return getNode(i).x;
	}

	public T set(int i, T x) {
		if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
		Node u = getNode(i);
		T y = u.x;
		u.x = x;
		return y;
	}

	public void clear() {
		dummy.next = dummy;
		dummy.prev = dummy;
		n = 0;
	}

	public void addNodeAfter(Node w, T x) {
		Node u = new Node();
		u.x = x;
		w.next=u;
		u.prev=w;
		n++;
	}

  public MyList<T> shuffle(MyList<T> otherBad ) {
	  DLList<T> other = (DLList<T>)otherBad;
	  DLList<T> merged = new DLList<T>();

	  //int limit=Math.min(size(),other.size());
	  int pos=0;
	  int size1=size();
	  int size2=other.size();
	  int limit;if(size1>size2){limit=size2;}else{limit=size1;}
	  merged.n=size1+size2;

	  Node thisPos=dummy.next;
	  Node otherPos = other.dummy.next;
	  Node currPos=merged.dummy;

	  Node mergedThis;
	  Node mergedOther=merged.dummy;

	  for(;pos<limit;pos++){
		  mergedThis = new Node();
		  mergedThis.x = thisPos.x;
		  mergedOther.next=mergedThis;
		  mergedThis.prev=mergedOther;
		  thisPos=thisPos.next;

		  mergedOther = new Node();
		  mergedOther.x = otherPos.x;
		  mergedThis.next=mergedOther;
		  mergedOther.prev=mergedThis;
		  otherPos=otherPos.next;
	  }
	  currPos=mergedOther;

	  if(size1!=size2){
		  if(size1>size2){
			  for(;pos<size1;pos++){
				  Node u = new Node();
				  u.x = thisPos.x;
				  currPos.next=u;
				  u.prev=currPos;
				  currPos=currPos.next;
				  thisPos=thisPos.next;
			  }
		  }
		  else{
			  for(;pos<size2;pos++){
				  Node v = new Node();
				  v.x = otherPos.x;
				  currPos.next=v;
				  v.prev=currPos;
				  currPos=currPos.next;
				  otherPos=otherPos.next;
			  }
		  }
	  }
	  merged.dummy.prev=currPos;
	  currPos.next=merged.dummy;
	  return merged;
  }

  public MyList<T> chop( int i ) {
	DLList<T> other = new DLList<T>();
	if(i>=n){
		return other;
	}

	Node holder=null;

	if(i%2==0) {
		if (i < n / 2) {
			holder = dummy.next;
			for (int j = 0; j < i/2; j++)
				holder = holder.next.next;
		} else {
			holder = dummy;
			for (int j = n; j > i/2; j--)
				holder = holder.prev.prev;
			holder=holder.prev;
		}
	}
	else{
		if (i < n / 2) {
			holder = dummy.next;
			for (int j = 0; j < i/2; j++)
				holder = holder.next.next;
			holder=holder.next;
		} else {
			holder = dummy;
			for (int j = n; j > i/2; j--)
				holder = holder.prev.prev;
		}
	}

    other.dummy.next=holder;
    other.dummy.prev=dummy.prev;
    dummy.prev=holder.prev;

    dummy.prev.next=dummy;
    other.dummy.next.prev=other.dummy;
    other.dummy.prev.next=other.dummy;

    other.n=size()-i;
    n=i;

    return other;
  }

  public void shrink() {
	  /*Node currNode=dummy.next;
	  Node currNode2=dummy.next.next;
	  while(true){
	  	if(currNode2==dummy){return;}
	  	if(currNode.x.equals(currNode2.x)){
	  		currNode2=currNode2.next;
			currNode2.prev=currNode2.prev.prev.prev;
			currNode2.prev.next=currNode2;
			n-=2;
		}
	  	currNode=currNode2.next;

	  	if(currNode==dummy){return;}
	  	if(currNode.x.equals(currNode2.x)){
	  		  currNode=currNode.next;
			  currNode.prev=currNode.prev.prev.prev;
			  currNode.prev.next=currNode;
			  n-=2;
	  	}
	  	currNode2=currNode.next;
	  }*/

		Node currNode=dummy.next.next;
    while(currNode!=dummy){
		if(currNode.prev!=dummy && currNode.prev.x.equals(currNode.x)){
			currNode=currNode.next;
			currNode.prev=currNode.prev.prev.prev;
			currNode.prev.next=currNode;
			n-=2;
		}
		else{
			currNode=currNode.next;
		}
	}
  }

  public void reverse() {
    // YOU DO NOT HAVE TO IMPLEMENT THIS IN THIS ASSIGNMENT.
    // (You have to implement it in the SkiplistList class, however.)
    // The server will not test this method.
  }

  public String toString() {
    StringBuilder retStr = new StringBuilder();
    retStr.append("[");
    Node u = dummy.next;
    while( u != dummy ) {
      retStr.append(u.x);
      u = u.next;
      if( u != dummy ) {
        retStr.append(", ");
      }
    }
    retStr.append("]");
    return retStr.toString();
  }

	class Iterator implements ListIterator<T> {
		/**
		 * The list we are iterating over
		 */
		DLList<T> l;

		/**
		 * The node whose value is returned by next()
		 */
		Node p;

		/**
		 * The last node whose value was returned by next() or previous()
		 */
		Node last;

		/**
		 * The index of p
		 */
		int i;

		Iterator(DLList<T> il, int ii) {
			l = il;
			i = ii;
			p = l.getNode(i);
		}

		public boolean hasNext() {
			return p != dummy;
		}

		public T next() {
			T x = p.x;
			last = p;
			p = p.next;
			i++;
			return x;
		}

		public int nextIndex() {
			return i;
		}

		public boolean hasPrevious() {
			return p.prev != dummy;
		}

		public T previous() {
			p = p.prev;
			last = p;
			i--;
			return p.x;
		}

		public int previousIndex() {
			return i - 1;
		}

		public void add(T x) {
			DLList.this.addBefore(p, x);
		}

		public void set(T x) {
			last.x = x;
		}

		public void remove() {
			if (p == last) {
				p = p.next;
			}
			DLList.this.remove(last);
		}

	}
}
