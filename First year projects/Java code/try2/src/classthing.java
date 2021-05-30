import java.util.Scanner;
public class classthing {
    public static void main(String[]args){
        System.out.println("Hello World!");
        Scanner in;
        in=new Scanner(System.in);
        System.out.print("Enter a number of miles: ");
        float miles = in.nextFloat();
        float kms = miles*1.6f; //f says float not double
        System.out.println(miles+" miles is equal to "+kms+" kilometers");
    }
}
