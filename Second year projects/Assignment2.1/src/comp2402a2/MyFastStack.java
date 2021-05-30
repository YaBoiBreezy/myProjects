package comp2402a2;

import java.util.ArrayList;

/**
 * This class implements the MyStack interface.
 * @author sharp
 *
 * @param <T> the type of objects stored in the MyStack
 */
public class MyFastStack<T> implements MyStack<T> {
	int size=0;
	ArrayList<T> stack=new ArrayList<T>();
	public MyFastStack() {}

	public int size() {
		return size;
	}

	public void push(T x) {
		if (size > 0 && stack.get(size - 1).equals(x)) {
			stack.remove(size - 1);
			size--;
		} else {
			stack.add(x);
			size++;
		}
	}

	public T pop() {
		if(size==0){
			return null;
		}
		else{
			T holder=stack.get(size-1);
			stack.remove(size-1);
			size--;
			return holder;
		}
	}
}
