public class Laptop extends Computer{
    private double screenSize;

    public Laptop(double price, int stockQuantity, double cpuSpeed, int ram, boolean ssd, int storage, double screenSize){
        super(cpuSpeed, ram, ssd, storage, price, stockQuantity);
        this.screenSize=screenSize;
    }
    public String toString(){
        if (Getssd()){
            return screenSize+" inch Laptop PC with "+GetcpuSpeed()+"ghz CPU, "+Getram()+"GB RAM, "+Getstorage()+"GB SSD drive. ("+Getprice()+" dollars each, "+GetstockQuantity()+" in stock, "+GetsoldQuantity()+" sold)";
        }
        return +GetcpuSpeed()+"ghz CPU, "+Getram()+"GB RAM, "+Getstorage()+"GB HDD drive. ("+Getprice()+" dollars each, "+GetstockQuantity()+" in stock, "+GetsoldQuantity()+" sold)";
    }
}