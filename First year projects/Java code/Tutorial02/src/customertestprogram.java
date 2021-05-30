public class customertestprogram {
    public static void main(String[]args){
        customer c;
        c=new customer("BOB",76,8.5f);
        System.out.println(c.computeFee());
        System.out.println(c.name+c.age+c.money);
    }
}
