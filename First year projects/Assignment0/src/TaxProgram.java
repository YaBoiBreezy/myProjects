import java.util.Scanner;

public class TaxProgram {
    public static void main(String args[]) {
        double  income, fedTax, provTax, totalTax;
        int     dependents;

        Scanner input = new Scanner(System.in);

        System.out.print("Please enter your taxable income: ");
        income = input.nextDouble();

        System.out.print("Please enter your number of dependents: ");
        dependents = input.nextInt();

        fedTax = 0.0;
        provTax = 0.0;

        if (income<=29590){
            fedTax=0.17*income;
        }
        else if (income<=59179.99){
            fedTax=29590*0.17+0.26*(income-29590);
        }
        else{
            fedTax=29590*0.17+0.26*29590+0.29*(income-59180);
        }

        provTax=0.425*fedTax-160.5-328*dependents;
        if (provTax<0){
            provTax=0;
        }
        totalTax=fedTax+provTax;
        System.out.println();
        System.out.println("Here is your tax breakdown:");
        System.out.println();
        System.out.println(String.format("%-15s%s%1.2f", "Income: ", "$", income));
        System.out.println(String.format("%-15s%d", "Dependents: ", dependents));
        System.out.println("-------------------");
        System.out.println(String.format("%-15s%s%1.2f","Federal tax:", "$", fedTax));
        System.out.println(String.format("%-15s%s%1.2f","Provincial tax:", "$", provTax));
        System.out.println("===================");
        System.out.println(String.format("%-15s%s%1.2f","Total tax:", "$", totalTax));
    }
}