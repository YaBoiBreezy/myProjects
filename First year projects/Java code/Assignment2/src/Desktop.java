public class Desktop extends Computer{
    private String profile;

    public Desktop(double price, int stockQuantity, double cpuSpeed, int ram, boolean ssd, int storage, String profile){
        super(cpuSpeed, ram, ssd, storage, price, stockQuantity);
        this.profile=profile;
    }
    public String toString(){
        if (Getssd()){
            return "Compact Desktop PC with "+GetcpuSpeed()+"ghz CPU, "+Getram()+"GB RAM, "+Getstorage()+"GB SSD drive. ("+Getprice()+" dollars each, "+GetstockQuantity()+" in stock, "+GetsoldQuantity()+" sold)";
        }
        return "Compact Desktop PC with "+GetcpuSpeed()+"ghz CPU, "+Getram()+"GB RAM, "+Getstorage()+"GB HDD drive. ("+Getprice()+" dollars each, "+GetstockQuantity()+" in stock, "+GetsoldQuantity()+" sold)";
    }
}