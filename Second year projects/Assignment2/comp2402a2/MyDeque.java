/**
 * The MyDeque<T> interface is a simple interface that allows a class
 * to implement the functionality of a modified Deque<T> interface, as
 * specified in part 5 of assignment 2.
 *
 * @author sharp
 *
 * @param <T>
 * @see Deque<T>
 */
public interface MyDeque<T> { 

  /**
   * @return the number of elements in this MyDeque when consecutive
   * duplicate pairs have been removed
   */
  public int size();

  /**
   * Add the element x as the first in the sequence 
   *
   * @param x
   */
  public void addFirst(T x);

  /**
   * Add the element x as the last of the sequence
   *
   * @param x
   */
  public void addLast(T x);

  /**
   * Remove the closest-to-the-last non-duplicate twin element x 
   * from the MyDeque
   *
   * @return the element x removed from the MyDeque
   */
  public T removeLast();

  /**
   * Remove the closest-to-the-first non-duplicate twin element x 
   * from the MyDeque
   *
   * @return the element x removed from the MyDeque
   */
  public T removeFirst();
  public void checkResize();
}
