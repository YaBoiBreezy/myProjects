package comp2402a1;

import java.util.Comparator;
import java.util.Iterator;

/**
 * The MyList<T> interface is a simple interface that allows a class to implement
 * all the functionality of the (more complicated) List<T> interface. 
 *
 * @author sharp
 *
 * @param <T>
 * @see List<T>
 */
public interface MyList<T> {

	/**
	 * @return the number of elements in this MyList
	 */
	public int size();

	/**
	 * Get the element at index i of the MyList
	 *
	 * @param i
	 * @return the element at index i in this MyList
	 */
	public T get(int i);

	/**
	 * Set the element at index i to x to the MyList
	 *
	 * @param i
	 * @param x
	 * @return the value at index i prior to the call
	 */
	public T set(int i, T x);

	/**
	 * Add the element x at index i of the MyList
	 *
	 * @param i
	 * @param x
	 */
	public void add(int i, T x);

	/**
	 * Remove the element x from the MyList
	 *
	 * @param i
	 * @return the element x removed from position i
	 */
	public T remove(int i);

	/**
	 * Return the shuffle of this list with other, where the
   * shuffle alternates between one element of this list followed
   * by one element of the other list, until one list runs out, then
   * the other remaining elements go on the end.
	 *
	 * @param other
	 * @return the shuffled MyList 
	 */
	public MyList<T> shuffle(MyList<T> other);
  
	/**
   * Return a list of n lists formed by "counting off" this list
   * into n lists, where every n'th element goes into one list.
	 *
	 * @param other
	 * @return the shuffled MyList 
	 */
	public MyList<MyList<T>> countOff(int n);

	/**
   * Reverse this list. Note that this doesn't return anything, but
   * modifies the current list.
	 *
	 */
	public void reverse();

}
