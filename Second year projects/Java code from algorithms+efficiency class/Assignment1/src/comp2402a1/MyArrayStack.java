package comp2402a1;

import java.util.AbstractList;
import java.util.Collection;

/**
 * This class implements the MyList interface as a single array a.
 * Elements are stored at positions a[0],...,a[size()-1].  
 * Doubling/halving is used to resize the array a when necessary. 
 * @author morin
 * @author sharp
 *
 * @param <T> the type of objects stored in the List
 */
public class MyArrayStack<T> implements MyList<T> { 
	
	/**
	 * The array used to store elements
	 */
	T[] a;
	
	/**
	 * The number of elements stored
	 */
	int n;
	
	/**
	 * Resize the internal array
	 */
	protected void resize() {
		@SuppressWarnings("unchecked")
		T[] b = (T[])new Object[Math.max(n*2, 1)];
		for (int i = 0; i < n; i++) {
			b[i] = a[i];
		}
		a = b;
	}

	/**
	 * Constructor
	 */
	@SuppressWarnings("unchecked")
	public MyArrayStack() {
		a = (T[])new Object[1];
		n = 0;
	}

	/**
	 * Constructor
   *
   * @param cap
	 */
	@SuppressWarnings("unchecked")
	public MyArrayStack(int cap) {
		a = (T[])new Object[cap];
		n = 0;
	}
	
	public int size() {
		return n;
	}

	public T get(int i) {
		if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
		return a[i];
	}
	
	public T set(int i, T x) {
		if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
		T y = a[i];
		a[i] = x;
		return y;
	}
	
	public void add(int i, T x) {
		if (i < 0 || i > n) throw new IndexOutOfBoundsException();
		if (n + 1 > a.length) resize();
		for (int j = n; j > i; j--) 
			a[j] = a[j-1];
		a[i] = x;
		n++;
	}
	
	public T remove(int i) {
		if (i < 0 || i > n - 1) throw new IndexOutOfBoundsException();
		T x = a[i];
		for (int j = i; j < n-1; j++) 
			a[j] = a[j+1];
		n--;
		if (a.length >= 3*n) resize();
		return x;
	}

  public String toString() {
    String s = a.toString();
    // This is the default behaviour of toString.
    // TODO: Override this with more useful behaviour for debugging.
    return s;
  }

  public MyList<T> shuffle(MyList<T> other) {
	  MyList<T> hello = new MyArrayStack<T>();
	  for(int x=0;x<Math.min(this.size(),other.size());x++){
	  	hello.add(2*x,this.get(x));
		  hello.add((2*x)+1,other.get(x));
	  }
	  if(this.size()<other.size()){
			for(int x=this.size();x<other.size();x++){
				hello.add(hello.size(),other.get(x));
			}
	  }
	  else if(this.size()>other.size()){
		  for(int x=other.size();x<this.size();x++){
			  hello.add(hello.size(),this.get(x));
		  }
	  }
    return hello;	//maybe have to do "return this;"
  }

	public MyList<MyList<T>> countOff(int n) {
    MyList<MyList<T>> l = new MyArrayStack<MyList<T>>();
    if(n>=1){
		for(int x=0;x<n;x++){
			l.add(l.size(),new MyArrayStack());
		}
		for(int x=0;x<this.size();x++){
			l.get(x%n).add(l.get(x%n).size(),this.get(x));
		}
	}
    return l; 
  }

  public void reverse() {
		T holder;
    for(int x=0;x<this.size()/2;x++){
    	holder=this.set(this.size()-x-1,this.get(x));
    	this.set(x,holder);
	}
  }
}
