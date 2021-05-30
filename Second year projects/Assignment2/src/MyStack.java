/**
 * The MyStack<T> interface is a simple interface that allows a class
 * to implement the functionality of a modified Stack<T> interface, as
 * specified in part 4 of assignment 2.
 *
 * @author sharp
 *
 * @param <T>
 * @see Stack<T>
 */

public interface MyStack<T> { 

  /**
   * @return the number of elements in this MyStack when consecutive
   * duplicate pairs have been removed
   */
  public int size();

  /**
   * Add the element x to the MyStack sequence
   *
   * @param x
   */
  public void push(T x);

  /**
   * Remove the most recent non-duplicate twin element x from the 
   * MyStack
   *
   * @return the element x removed from the myStack
   */
  public T pop();

}
