/**
 * This class implements the MyStack interface.
 * @author sharp
 *
 * @param <T> the type of objects stored in the MyStack
 */
import java.util.ArrayList;

public class MyFastStack<T> implements MyStack<T> { 
	int size;
	ArrayList<T> stack;
	public MyFastStack() {
		size=0;
	}

	public int size() {
    	return size;
	}

	
	public void push(T x) {
		if(stack.get(size-1)==x){
			stack.remove(size-1);
			size--;
		}
		else{
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
